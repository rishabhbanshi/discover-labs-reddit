from fastapi import APIRouter, HTTPException
from app.models.reddit import RedditDiscoveryRequest, RedditDiscoveryResponse
from app.controllers.reddit_controller import discover_company_posts

router = APIRouter(prefix="/reddit", tags=["reddit"])


@router.post("/discover", response_model=RedditDiscoveryResponse)
async def discover_posts(request: RedditDiscoveryRequest):
    """
    Discover Reddit posts about a company.
    
    - Takes company_name or description
    - Limit: default 100, max 500
    - Returns: company_name, post_count, subreddit distribution, and post details
    """
    if not request.company_name and not request.description:
        raise HTTPException(
            status_code=400, 
            detail="Either company_name or description must be provided"
        )
    
    try:
        result = await discover_company_posts(request)

        return result
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error discovering posts: {str(e)}")

