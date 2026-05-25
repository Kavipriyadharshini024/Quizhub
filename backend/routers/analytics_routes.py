from fastapi import APIRouter, Depends

from sqlalchemy.orm import Session

import models

from database import get_db

router = APIRouter(
    prefix="/analytics",
    tags=["Analytics"]
)


@router.get("/")
def get_analytics(
    db: Session = Depends(get_db)
):

    total_users = db.query(
        models.User
    ).count()

    total_quizzes = db.query(
        models.Quiz
    ).count()

    total_certificates = db.query(
        models.Certificate
    ).count()

    return {

        "total_users": total_users,

        "total_quizzes": total_quizzes,

        "total_certificates": total_certificates
    }