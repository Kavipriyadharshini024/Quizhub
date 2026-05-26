from fastapi import APIRouter
from fastapi import Depends

from sqlalchemy.orm import Session

import models

from database import get_db


router = APIRouter(

    prefix="/scores",

    tags=["Scores"]
)

# =====================================
# GET ALL SCORES
# =====================================

@router.get("/")
def get_scores(db: Session = Depends(get_db)):

    results = db.query(

        models.Score,
        models.User.username,
        models.Quiz.quiz_name

    ).join(

        models.User,
        models.Score.user_id == models.User.user_id

    ).join(

        models.Quiz,
        models.Score.quiz_id == models.Quiz.quiz_id

    ).all()


    response = []


    for score, username, quiz_name in results:

        response.append({

            "username": username,

            "quiz_name": quiz_name,

            "score": score.total_score,

            "status": "PASS" if score.eligibility_status else "FAIL",

            "attended": "Yes"
        })


    return response
#====================================
# CALCULATE RESULT
# =====================================

@router.get("/{student_id}/{quiz_id}")

def calculate_result(

    student_id: int,

    quiz_id: int,

    db: Session = Depends(get_db)
):

    questions = db.query(

        models.Question

    ).filter(

        models.Question.quiz_id
        == quiz_id

    ).all()


    answers = db.query(

        models.Answer

    ).filter(

        models.Answer.student_id
        == student_id,

        models.Answer.quiz_id
        == quiz_id

    ).all()


    total_score = 0

    total_marks = 0


    answer_map = {

        answer.question_id:
        answer.selected_option

        for answer in answers
    }


    for question in questions:

        total_marks += question.marks

        selected_answer = answer_map.get(
            question.question_id
        )

        if (

            selected_answer
            ==
            question.correct_answer

        ):

            total_score += question.marks


    percentage = 0

    if total_marks > 0:

        percentage = int(

            (total_score / total_marks)
            * 100
        )


    result_status = "PASS"

    if percentage < 40:

        result_status = "FAIL"


    existing_attempt = db.query(

        models.QuizAttempt

    ).filter(

        models.QuizAttempt.student_id
        == student_id,

        models.QuizAttempt.quiz_id
        == quiz_id

    ).first()


    if not existing_attempt:

        new_attempt = models.QuizAttempt(

            student_id=student_id,

            quiz_id=quiz_id,

            score=total_score,

            percentage=percentage,

            result=result_status
        )

        db.add(new_attempt)

        db.commit()


    return {

        "total_score": total_score,

        "percentage": percentage,

        "result_status": result_status
    }
