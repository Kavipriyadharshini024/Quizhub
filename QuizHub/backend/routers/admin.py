from fastapi import APIRouter

router = APIRouter(
    prefix="/admin",
    tags=["Admin"]
)

@router.get("/")
def admin_dashboard():
    return {
        "message": "Admin API Working"
    }