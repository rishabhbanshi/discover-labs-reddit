"""
Reddit service layer - handles all Reddit-related business logic
"""
from typing import List, Dict, Optional
from collections import Counter
import asyncio
import aiohttp
import math


def determine_post_type(flair: Optional[str], title: str, selftext: str) -> str:
    """
    Determine post type based on flair, title, and content.
    Returns: POST, DISCUSSION, COMMENT, NEWS
    """
    if not flair:
        flair = ""
    
    text = f"{flair} {title}".lower()
    
    # Check for discussion indicators
    discussion_keywords = ['discussion', 'question', 'ask', 'help', 'advice', 'opinion']
    if any(keyword in text for keyword in discussion_keywords):
        return "DISCUSSION"
    
    # Check for news indicators
    news_keywords = ['news', 'announcement', 'release', 'breaking', 'official']
    if any(keyword in text for keyword in news_keywords):
        return "NEWS"
    
    # Check for comment/thread indicators
    comment_keywords = ['comment', 'thread', 'megathread']
    if any(keyword in text for keyword in comment_keywords):
        return "COMMENT"
    
    # Default to POST
    return "POST"


def score_audience_size(subscribers: int) -> float:
    """
    Log-scaled audience score (0–10)
    """
    if subscribers <= 0:
        return 0.0

    # log scale (max assumed 10M)
    score = (math.log10(subscribers) / math.log10(10_000_000)) * 10
    return round(min(score, 10), 1)


def score_mention_frequency(post_count: int, sample_size: int = 100) -> float:
    """
    How often brand appears in analyzed posts
    """
    freq = post_count / sample_size
    score = min(freq * 10, 10)
    return round(score, 1)


def score_content_quality(flair_dist: dict) -> float:
    """
    Measures discussion intent vs noise
    """
    if not flair_dist:
        return 0.0

    high_signal = ["Discussion", "Question", "Article"]
    low_signal = ["Meme", "Shitpost", "Off-topic"]

    high = sum(flair_dist.get(k, 0) for k in high_signal)
    low = sum(flair_dist.get(k, 0) for k in low_signal)
    total = sum(flair_dist.values())

    if total == 0:
        return 0.0

    quality_ratio = (high - low) / total
    normalized = (quality_ratio + 1) / 2   # convert -1..1 → 0..1
    return round(normalized * 10, 1)


def calculate_business_value_score(
    subscribers: int,
    post_count: int,
    flair_dist: dict
) -> dict:
    """
    Calculate comprehensive business value metrics for a subreddit.
    """
    audience = score_audience_size(subscribers)
    frequency = score_mention_frequency(post_count)
    quality = score_content_quality(flair_dist)

    # weights
    score = (
        audience * 0.35 +
        frequency * 0.30 +
        quality * 0.35
    )

    return {
        "audience_size": audience,
        "mention_frequency": frequency,
        "content_quality": quality,
        "business_value_score": round(score, 1)
    }


def determine_subreddit_category(name: str, description: str, title: str) -> str:
    """
    Determine subreddit category based on name, description, and title.
    """
    text = f"{name} {description} {title}".lower()
    
    categories = {
        'technology': ['technology', 'tech', 'software', 'hardware', 'gadget'],
        'ai': ['ai', 'artificial intelligence', 'machine learning', 'ml', 'chatgpt', 'openai'],
        'business': ['business', 'entrepreneur', 'startup', 'finance', 'marketing'],
        'gaming': ['gaming', 'games', 'gamer', 'esports'],
        'news': ['news', 'worldnews', 'politics'],
        'science': ['science', 'physics', 'biology', 'chemistry'],
        'entertainment': ['movies', 'television', 'music', 'entertainment'],
        'social': ['social', 'askreddit', 'discussion', 'community'],
        'crypto': ['crypto', 'bitcoin', 'blockchain', 'ethereum'],
    }
    
    for category, keywords in categories.items():
        if any(keyword in text for keyword in keywords):
            return category
    
    return 'general'


async def fetch_subreddit_info(subreddit_name: str) -> Optional[Dict]:
    """
    Fetch subreddit information from Reddit's public JSON API.
    
    Args:
        subreddit_name: Name of the subreddit
    
    Returns:
        Dictionary with subreddit info or None if failed
    """
    try:
        url = f"https://www.reddit.com/r/{subreddit_name}/about.json"
        headers = {'User-Agent': 'Mozilla/5.0 (compatible; RedditAnalyzer/1.0)'}
        
        async with aiohttp.ClientSession() as session:
            async with session.get(url, headers=headers, timeout=aiohttp.ClientTimeout(total=5)) as response:
                if response.status == 200:
                    data = await response.json()
                    subreddit_data = data.get('data', {})
                    
                    # Determine category from description and name
                    category = determine_subreddit_category(
                        subreddit_name,
                        subreddit_data.get('public_description', ''),
                        subreddit_data.get('title', '')
                    )
                    
                    return {
                        'name': subreddit_data.get('display_name', subreddit_name),
                        'description': subreddit_data.get('public_description', '')[:200],
                        'subscribers': subreddit_data.get('subscribers', 0),
                        'category': category,
                    }
    except Exception as e:
        print(f"❌ Error fetching subreddit info for r/{subreddit_name}: {e}")
    
    return None


async def enrich_posts_with_reddit_data(posts: List[Dict], max_concurrent: int = 20) -> List[Dict]:
    """
    Enrich posts with essential data from Reddit's JSON API using parallel requests.
    
    Args:
        posts: List of posts with URLs
        max_concurrent: Maximum concurrent requests (default 20)
    
    Returns:
        Enriched posts with essential metadata and post type
    """
    if not posts:
        return []
    
    semaphore = asyncio.Semaphore(max_concurrent)
    
    async def enrich_single_post(session: aiohttp.ClientSession, post: Dict) -> Dict:
        """Enrich a single post with rate limiting."""
        async with semaphore:
            url = post.get('url', '')
            if not url:
                return post
            
            try:
                json_url = url.rstrip('/') + '.json'
                headers = {'User-Agent': 'Mozilla/5.0 (compatible; RedditAnalyzer/1.0)'}
                
                async with session.get(json_url, headers=headers, timeout=aiohttp.ClientTimeout(total=10)) as response:
                    if response.status == 200:
                        data = await response.json()
                        
                        if data and len(data) > 0:
                            post_data = data[0]['data']['children'][0]['data']
                            
                            post['author'] = post_data.get('author', 'unknown')
                            post['score'] = post_data.get('score', 0)
                            post['num_comments'] = post_data.get('num_comments', 0)
                            post['created_utc'] = post_data.get('created_utc', 0)
                            selftext = post_data.get('selftext', '')[:500]
                            post['selftext'] = selftext
                            flair = post_data.get('link_flair_text', '')
                            post['link_flair_text'] = flair
                            
                            # Determine post type
                            post['type'] = determine_post_type(
                                flair,
                                post.get('title', ''),
                                selftext
                            )
            except asyncio.TimeoutError:
                print(f"⏱ Timeout enriching: {post.get('post_id', 'unknown')}")
            except Exception as e:
                print(f"❌ Failed to enrich post {post.get('post_id', 'unknown')}: {e}")
            
            # Set default type if not set
            if 'type' not in post:
                post['type'] = determine_post_type(
                    post.get('link_flair_text'),
                    post.get('title', ''),
                    ''
                )
            
            return post
    
    # Create connector with connection pooling
    connector = aiohttp.TCPConnector(limit=max_concurrent, limit_per_host=10)
    
    async with aiohttp.ClientSession(connector=connector) as session:
        tasks = [enrich_single_post(session, post) for post in posts]
        enriched_posts = await asyncio.gather(*tasks, return_exceptions=True)
        
        # Filter out exceptions
        valid_posts = [p for p in enriched_posts if isinstance(p, dict)]
        print(f"✓ Enriched {len(valid_posts)}/{len(posts)} posts")
        
        return valid_posts


async def get_subreddit_analytics_with_posts(subreddit_names: List[str], posts: List[Dict]) -> List[Dict]:
    """
    Fetch analytics for multiple subreddits in parallel and group posts by subreddit.
    
    Args:
        subreddit_names: List of unique subreddit names
        posts: All posts to group by subreddit
    
    Returns:
        List of subreddit analytics dictionaries with nested posts
    """
    # Group posts by subreddit
    subreddit_posts = {}
    for post in posts:
        subreddit = post.get('subreddit')
        if subreddit:
            if subreddit not in subreddit_posts:
                subreddit_posts[subreddit] = []
            subreddit_posts[subreddit].append(post)
    
    # Fetch subreddit info in parallel
    tasks = [fetch_subreddit_info(name) for name in subreddit_names]
    subreddit_infos = await asyncio.gather(*tasks, return_exceptions=True)
    
    analytics = []
    for i, subreddit_name in enumerate(subreddit_names):
        posts_in_sub = subreddit_posts.get(subreddit_name, [])
        
        # Calculate flair distribution
        flair_counter = Counter()
        for post in posts_in_sub:
            flair = post.get('link_flair_text')
            if flair:
                flair_counter[flair] += 1
            else:
                flair_counter['No Flair'] += 1
        
        # Get subreddit info
        info = subreddit_infos[i] if isinstance(subreddit_infos[i], dict) else {}
        
        # Calculate business value scores
        subscribers = info.get('subscribers', 0) or 0
        post_count = len(posts_in_sub)
        flair_dist = dict(flair_counter)
        
        scores = calculate_business_value_score(subscribers, post_count, flair_dist)
        
        analytics.append({
            'subreddit_name': subreddit_name,
            'post_count': post_count,
            'subscribers': info.get('subscribers'),
            'description': info.get('description'),
            'category': info.get('category'),
            'flair_distribution': flair_dist,
            'audience_size': scores['audience_size'],
            'mention_frequency': scores['mention_frequency'],
            'content_quality': scores['content_quality'],
            'business_value_score': scores['business_value_score'],
            'posts': posts_in_sub  # Nested posts
        })
    
    print(f"✓ Fetched analytics for {len(analytics)} subreddits with posts")
    return analytics

