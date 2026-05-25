from fastapi import APIRouter

router = APIRouter(
    prefix="/results",
    tags=["Results"]
)

@router.get("/")
def get_results():
    return {
        "message": "Results API Working"
    }