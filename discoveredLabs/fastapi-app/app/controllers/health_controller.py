from app.models.health import HealthResponse, RootResponse


def get_health() -> HealthResponse:
    return HealthResponse(status="ok")


def get_root() -> RootResponse:
    return RootResponse(message="Hello from FastAPI")


