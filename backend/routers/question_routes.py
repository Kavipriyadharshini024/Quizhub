from fastapi import APIRouter
from fastapi import Depends

from sqlalchemy.orm import Session

import models
import schemas

from database import get_db


router = APIRouter(

    prefix="/questions",

    tags=["Questions"]
)


# =====================================
# CREATE QUESTION
# =====================================

# =====================================
# CREATE QUESTION
# =====================================

@router.post("/create")

def create_question(

    question: schemas.QuestionCreate,

    db: Session = Depends(get_db)
):

    new_question = models.Question(

        quiz_id=question.quiz_id,

        question=question.question,

        option_1=question.option_1,

        option_2=question.option_2,

        option_3=question.option_3,

        option_4=question.option_4,

        correct_answer=question.correct_answer,

        marks=question.marks
    )

    db.add(new_question)

    db.commit()

    db.refresh(new_question)

    return {

        "message":
        "Question Added Successfully"
    }
# =====================================
# GET QUESTIONS BY QUIZ
# =====================================

@router.get("/{quiz_id}")

def get_questions(

    quiz_id: int,

    db: Session = Depends(get_db)
):

    questions = db.query(

        models.Question

    ).filter(

        models.Question.quiz_id
        == quiz_id

    ).all()

    return questions

    # =====================================
# DELETE QUESTION
# =====================================

@router.delete("/delete/{question_id}")

def delete_question(

    question_id: int,

    db: Session = Depends(get_db)
):

    question = db.query(

        models.Question

    ).filter(

        models.Question.question_id == question_id

    ).first()


    if not question:

        return {

            "message":
            "Question Not Found"
        }


    db.delete(question)

    db.commit()

    return {

        "message":
        "Question Deleted Successfully"
    }