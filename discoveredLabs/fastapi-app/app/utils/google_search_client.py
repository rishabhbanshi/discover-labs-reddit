"""
Google Custom Search API client for Reddit post discovery
"""
from googleapiclient.discovery import build
from typing import List, Dict, Optional
from app.config import settings
import re



def get_google_search_service():
    """
    Initialize Google Custom Search API service.
    """
    print(f"Google API Key: {settings.google_api_key}")
    print(f"Google CSE ID: {settings.google_cse_id}")
    if not settings.google_api_key or not settings.google_cse_id:
        print("Warning: Google API credentials not configured")
        return None
    
    try:
        service = build("customsearch", "v1", developerKey=settings.google_api_key)
        return service
    except Exception as e:
        print(f"Error initializing Google Search API: {e}")
        return None


async def search_reddit_posts(query: str, num_results: int = 10) -> List[Dict]:
    """
    Search Reddit posts using Google Custom Search API with batching.
    Automatically cumulates results from multiple batches.
    
    Args:
        query: Company/search term
        num_results: Number of results to return (max 100 with free API)
    
    Returns:
        List of search results with comprehensive Reddit post information
    """
    service = get_google_search_service()
    
    if not service:
        print("Google Search API not configured, returning empty results")
        return []
    
    all_results = []
    batch_count = 0
    
    try:
        # Google CSE returns max 10 results per request
        # We can paginate up to 100 results (10 batches of 10)
        start_index = 1
        while len(all_results) < num_results and start_index <= 91:  # 91 is max start
            batch_count += 1
            results_to_fetch = min(10, num_results - len(all_results))
            
            print(f"Fetching batch {batch_count}: items {start_index} to {start_index + results_to_fetch - 1}")
            
            # Search Reddit with site filter
            result = service.cse().list(
                q=f"{query} site:reddit.com",
                cx=settings.google_cse_id,
                num=results_to_fetch,
                start=start_index
            ).execute()
            
            if 'items' not in result:
                print(f"No more items found after batch {batch_count}")
                break
            
            for item in result['items']:
                # Parse Reddit URL to extract subreddit and post info
                url = item.get('link', '')
                parsed_info = parse_reddit_url(url)
                
                if parsed_info:
                    # Extract only essential data points
                    post_data = {
                        'title': item.get('title', ''),
                        'snippet': item.get('snippet', ''),
                        'url': url,
                        'subreddit': parsed_info.get('subreddit'),
                        'post_id': parsed_info.get('post_id'),
                    }
                    all_results.append(post_data)
            
            start_index += 10
            
            # Break if we got fewer results than requested (no more results available)
            if len(result['items']) < results_to_fetch:
                print(f"Received fewer results than requested. Ending pagination.")
                break
        
        print(f"✓ Successfully fetched {len(all_results)} Reddit posts in {batch_count} batches")
        return all_results
        
    except Exception as e:
        print(f"Error searching Reddit with Google: {e}")
        import traceback
        traceback.print_exc()
        return all_results  # Return whatever we collected so far


def parse_reddit_url(url: str) -> Optional[Dict[str, str]]:
    """
    Parse Reddit URL to extract subreddit and post ID.
    
    Example URLs:
    - https://www.reddit.com/r/technology/comments/abc123/title/
    - https://reddit.com/r/technology/comments/abc123/
    """
    # Pattern: reddit.com/r/SUBREDDIT/comments/POST_ID
    pattern = r'reddit\.com/r/([^/]+)/comments/([^/]+)'
    match = re.search(pattern, url)
    
    if match:
        return {
            'subreddit': match.group(1),
            'post_id': match.group(2)
        }
    
    return None
