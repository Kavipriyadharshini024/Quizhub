from fastapi import APIRouter
from fastapi import Depends

from sqlalchemy.orm import Session

import models

from database import get_db


router = APIRouter(

    prefix="/attempts",

    tags=["Attempts"]
)


# =====================================
# USER ATTEMPT HISTORY
# =====================================

@router.get("/{student_id}")

def attempt_history(

    student_id: int,

    db: Session = Depends(get_db)
):

    attempts = db.query(

        models.QuizAttempt

    ).filter(

        models.QuizAttempt.student_id
        == student_id

    ).all()


    result = []


    for attempt in attempts:

        quiz = db.query(

            models.Quiz

        ).filter(

            models.Quiz.quiz_id
            == attempt.quiz_id

        ).first()


        result.append({

            "quiz_name":
            quiz.quiz_name,

            "score":
            attempt.score,

            "percentage":
            attempt.percentage,

            "result":
            attempt.result
        })


    return result