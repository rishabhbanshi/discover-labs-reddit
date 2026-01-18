from pydantic import BaseModel, Field
from typing import Optional, Dict, List


class RedditDiscoveryRequest(BaseModel):
    company_name: Optional[str] = Field(None, description="Company name to search")
    description: Optional[str] = Field(None, description="Company description to search")
    limit: int = Field(100, ge=1, le=500, description="Number of results (default 100, max 500)")


class PostDetail(BaseModel):
    title: str
    snippet: str
    url: str
    subreddit: str
    post_id: str
    type: str = Field(default="POST", description="POST, DISCUSSION, COMMENT, or NEWS")
    author: Optional[str] = None
    score: Optional[int] = None
    num_comments: Optional[int] = None
    created_utc: Optional[float] = None
    selftext: Optional[str] = None
    link_flair_text: Optional[str] = None


class SubredditAnalytics(BaseModel):
    subreddit_name: str
    post_count: int
    subscribers: Optional[int] = None
    description: Optional[str] = None
    category: Optional[str] = None
    flair_distribution: Dict[str, int] = Field(default_factory=dict)
    audience_size: Optional[float] = None
    mention_frequency: Optional[float] = None
    content_quality: Optional[float] = None
    business_value_score: Optional[float] = None
    posts: List["PostDetail"] = Field(default_factory=list, description="Posts in this subreddit")


class RedditDiscoveryResponse(BaseModel):
    company_name: str
    post_count: int
    subreddit_analytics: List[SubredditAnalytics]
