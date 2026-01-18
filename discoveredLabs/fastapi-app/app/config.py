import os
from dotenv import load_dotenv
from pydantic_settings import BaseSettings

load_dotenv()


class Settings(BaseSettings):
    # Google Custom Search API
    google_api_key: str = os.getenv("GOOGLE_API_KEY", "")
    google_cse_id: str = os.getenv("GOOGLE_CSE_ID", "")
    
    # API Settings
    max_subreddits: int = 50
    max_subreddits_detailed: int = 5
    max_posts_per_subreddit: int = 10
    max_comments_per_post: int = 5
    max_search_results: int = 100
    
    class Config:
        env_file = ".env"


settings = Settings()

