from fastapi import APIRouter
from fastapi import Depends

from sqlalchemy.orm import Session

import models
import schemas

from database import get_db


router = APIRouter(

    prefix="/quizzes",

    tags=["Quizzes"]
)


# =====================================
# CREATE QUIZ
# =====================================

@router.post("/create")

def create_quiz(

    quiz: schemas.QuizCreate,

    db: Session = Depends(get_db)
):

    new_quiz = models.Quiz(

        quiz_name=quiz.quiz_name,

        description=quiz.description,

        organization_name=quiz.organization_name,

        location=quiz.location,

        quiz_status=quiz.quiz_status,

        coordinator_id=quiz.coordinator_id
    )

    db.add(new_quiz)

    db.commit()

    db.refresh(new_quiz)

    return {

        "message": "Quiz Created Successfully"
    }
# =====================================
# GET ALL QUIZZES
# =====================================

@router.get("/")

def get_quizzes(

    db: Session = Depends(get_db)
):

    quizzes = db.query(

        models.Quiz

    ).all()

    return quizzes


# =====================================
# ORGANIZATION QUIZZES
# =====================================

@router.get("/organization/{organization_id}")

def organization_quizzes(

    organization_id: int,

    db: Session = Depends(get_db)
):

    quizzes = db.query(

        models.Quiz

    ).filter(

        models.Quiz.organization_id
        == organization_id

    ).all()

    return quizzes

    # =====================================
# DELETE QUIZ
# =====================================

@router.delete("/delete/{quiz_id}")

def delete_quiz(

    quiz_id: int,

    db: Session = Depends(get_db)
):

    quiz = db.query(

        models.Quiz

    ).filter(

        models.Quiz.quiz_id == quiz_id

    ).first()


    if not quiz:

        return {

            "message": "Quiz Not Found"
        }


    db.delete(quiz)

    db.commit()

    return {

        "message": "Quiz Deleted Successfully"
    }