from fastapi import APIRouter

from app.controllers.health_controller import get_health, get_root
from app.models.health import HealthResponse, RootResponse

router = APIRouter()


@router.get("/health", response_model=HealthResponse)
def health_check() -> HealthResponse:
    return get_health()


@router.get("/", response_model=RootResponse)
def root() -> RootResponse:
    return get_root()

