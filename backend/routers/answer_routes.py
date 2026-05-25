from fastapi import APIRouter
from fastapi import Depends

from sqlalchemy.orm import Session

import models
import schemas

from database import get_db


router = APIRouter(

    prefix="/answers",

    tags=["Answers"]
)


# =====================================
# SUBMIT ANSWER
# =====================================

@router.post("/submit")

def submit_answer(

    answer: schemas.AnswerCreate,

    db: Session = Depends(get_db)
):

    new_answer = models.Answer(

        student_id=answer.student_id,

        quiz_id=answer.quiz_id,

        question_id=answer.question_id,

        selected_option=answer.selected_option
    )

    db.add(new_answer)

    db.commit()

    db.refresh(new_answer)

    return {

        "message": "Answer Submitted"
    }