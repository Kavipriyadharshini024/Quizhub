from fastapi import APIRouter
from fastapi import Depends
from fastapi import HTTPException

from sqlalchemy.orm import Session

from database import get_db

from models import Quiz
from models import Question


router = APIRouter(

    prefix="/quizzes",

    tags=["Quizzes"]
)



# ====================================
# CREATE QUIZ
# ====================================

@router.post("/create")

def create_quiz(

    quiz: dict,

    db: Session = Depends(get_db)
):

    new_quiz = Quiz(

        title=quiz["title"],

        description=quiz["description"],

        category=quiz["category"],

        status="active"
    )


    db.add(new_quiz)

    db.commit()

    db.refresh(new_quiz)


    return {

        "message":
        "Quiz Created Successfully"
    }




# ====================================
# GET ALL QUIZZES
# ====================================

@router.get("/")

def get_quizzes(

    db: Session = Depends(get_db)
):

    quizzes = db.query(Quiz).all()

    return quizzes




# ====================================
# CREATE QUESTION
# ====================================

@router.post("/add-question")

def add_question(

    question: dict,

    db: Session = Depends(get_db)
):

    new_question = Question(

        quiz_id=question["quiz_id"],

        question=question["question"],

        option1=question["option1"],

        option2=question["option2"],

        option3=question["option3"],

        option4=question["option4"],

        answer=question["answer"]
    )


    db.add(new_question)

    db.commit()

    db.refresh(new_question)


    return {

        "message":
        "Question Added Successfully"
    }




# ====================================
# GET QUESTIONS BY QUIZ
# ====================================

@router.get("/{quiz_id}/questions")

def get_questions(

    quiz_id: int,

    db: Session = Depends(get_db)
):

    questions = db.query(Question).filter(

        Question.quiz_id == quiz_id

    ).all()


    return questions