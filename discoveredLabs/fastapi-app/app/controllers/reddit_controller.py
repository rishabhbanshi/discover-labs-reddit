from typing import Dict, List
from app.models.reddit import (
    RedditDiscoveryRequest, 
    RedditDiscoveryResponse, 
    PostDetail,
    SubredditAnalytics
)
from app.utils.google_search_client import search_reddit_posts
from app.services.reddit_service import (
    enrich_posts_with_reddit_data,
    get_subreddit_analytics_with_posts
)


async def discover_company_posts(request: RedditDiscoveryRequest) -> RedditDiscoveryResponse:
    """
    Discover Reddit posts about a company based on name or description.
    Optimized with parallel processing for faster response times.
    
    Args:
        request: RedditDiscoveryRequest with company_name/description and limit
    
    Returns:
        RedditDiscoveryResponse with subreddit analytics containing nested posts
    """
    # Build search query
    query = request.company_name or request.description
    if not query:
        return RedditDiscoveryResponse(
            company_name="Unknown",
            post_count=0,
            subreddit_analytics=[]
        )
    
    print(f"🔍 Searching for: {query} (limit: {request.limit})")
    
    # Step 1: Fetch Reddit posts using Google Custom Search
    raw_posts = await search_reddit_posts(query, num_results=request.limit)
    
    if not raw_posts:
        return RedditDiscoveryResponse(
            company_name=query,
            post_count=0,
            subreddit_analytics=[]
        )
    
    # Step 2: Enrich posts with Reddit API data (PARALLEL)
    enriched_posts = await enrich_posts_with_reddit_data(raw_posts, max_concurrent=25)
    
    # Step 3: Get unique subreddits
    unique_subreddits = list(set(post.get('subreddit') for post in enriched_posts if post.get('subreddit')))
    
    # Step 4: Fetch subreddit analytics with nested posts (PARALLEL)
    subreddit_analytics_raw = await get_subreddit_analytics_with_posts(unique_subreddits, enriched_posts)
    
    # Step 5: Convert to response models
    subreddit_analytics = []
    total_post_count = 0
    
    for analytics in subreddit_analytics_raw:
        try:
            # Convert posts to PostDetail models
            post_details = []
            for post in analytics.get('posts', []):
                try:
                    post_detail = PostDetail(
                        title=post.get('title', ''),
                        snippet=post.get('snippet', ''),
                        url=post.get('url', ''),
                        subreddit=post.get('subreddit', ''),
                        post_id=post.get('post_id', ''),
                        type=post.get('type', 'POST'),
                        author=post.get('author'),
                        score=post.get('score'),
                        num_comments=post.get('num_comments'),
                        created_utc=post.get('created_utc'),
                        selftext=post.get('selftext'),
                        link_flair_text=post.get('link_flair_text')
                    )
                    post_details.append(post_detail)
                except Exception as e:
                    print(f"❌ Error converting post to PostDetail: {e}")
                    continue
            
            # Create subreddit analytics with nested posts
            subreddit_analytics_obj = SubredditAnalytics(
                subreddit_name=analytics.get('subreddit_name', ''),
                post_count=analytics.get('post_count', 0),
                subscribers=analytics.get('subscribers'),
                description=analytics.get('description'),
                category=analytics.get('category'),
                flair_distribution=analytics.get('flair_distribution', {}),
                audience_size=analytics.get('audience_size'),
                mention_frequency=analytics.get('mention_frequency'),
                content_quality=analytics.get('content_quality'),
                business_value_score=analytics.get('business_value_score'),
                posts=post_details
            )
            subreddit_analytics.append(subreddit_analytics_obj)
            total_post_count += len(post_details)
            
        except Exception as e:
            print(f"❌ Error converting subreddit analytics: {e}")
            continue
    
    # Sort by business value score (highest first)
    subreddit_analytics.sort(key=lambda x: x.business_value_score or 0, reverse=True)
    
    # Return only top 20 subreddits
    top_subreddits = subreddit_analytics[:20]
    
    # Recalculate post count for top 20
    top_post_count = sum(subreddit.post_count for subreddit in top_subreddits)
    
    print(f"✅ Completed! Returning top {len(top_subreddits)} subreddits with {top_post_count} posts (out of {len(subreddit_analytics)} total subreddits)")
    
    # Build response
    response = RedditDiscoveryResponse(
        company_name=query,
        post_count=top_post_count,
        subreddit_analytics=top_subreddits
    )
    
    return response
