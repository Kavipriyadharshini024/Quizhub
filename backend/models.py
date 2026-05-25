from sqlalchemy import Column, Integer, String, DateTime, ForeignKey, Boolean
from sqlalchemy.orm import relationship
from datetime import datetime

from database import Base


class User(Base):

    __tablename__ = "users"

    user_id = Column(
        Integer,
        primary_key=True,
        index=True
    )

    username = Column(
        String,
        nullable=False
    )

    email = Column(
        String,
        unique=True,
        nullable=False
    )

    password = Column(
        String,
        nullable=False
    )

    role = Column(
        String,
        default="student"
    )
class Quiz(Base):

    __tablename__ = "quizzes"

    quiz_id = Column(Integer, primary_key=True, index=True)

    quiz_name = Column(String, nullable=False)

    description = Column(String)

    organization_name = Column(String)

    date_time = Column(DateTime)

    location = Column(String)

    quiz_status = Column(String, default="available")

    coordinator_id = Column(Integer, ForeignKey("users.user_id"))

    created_at = Column(DateTime, default=datetime.utcnow)

    deadline = Column(DateTime)

class Section(Base):

    __tablename__ = "sections"

    section_id = Column(Integer, primary_key=True, index=True)

    quiz_id = Column(Integer, ForeignKey("quizzes.quiz_id"))

    section_name = Column(String, nullable=False)

class Question(Base):

    __tablename__ = "questions"

    question_id = Column(
        Integer,
        primary_key=True,
        index=True
    )

    quiz_id = Column(
        Integer,
        ForeignKey("quizzes.quiz_id")
    )

    question = Column(String)

    option_1 = Column(String)

    option_2 = Column(String)

    option_3 = Column(String)

    option_4 = Column(String)

    correct_answer = Column(String)

    marks = Column(Integer)
class Answer(Base):

    __tablename__ = "answers"

    answer_id = Column(Integer, primary_key=True, index=True)

    user_id = Column(Integer, ForeignKey("users.user_id"))

    quiz_id = Column(Integer, ForeignKey("quizzes.quiz_id"))

    question_id = Column(Integer, ForeignKey("questions.question_id"))

    selected_option = Column(String)

    marks_obtained = Column(Integer, default=0)

class Score(Base):

    __tablename__ = "scores"

    score_id = Column(Integer, primary_key=True, index=True)

    user_id = Column(Integer, ForeignKey("users.user_id"))

    quiz_id = Column(Integer, ForeignKey("quizzes.quiz_id"))

    total_score = Column(Integer)

    percentage = Column(Integer)

    eligibility_status = Column(Boolean, default=False)

class Certificate(Base):

    __tablename__ = "certificates"

    certificate_id = Column(Integer, primary_key=True, index=True)

    user_id = Column(Integer, ForeignKey("users.user_id"))

    quiz_id = Column(Integer, ForeignKey("quizzes.quiz_id"))

    certificate_url = Column(String)

    issued_date = Column(DateTime, default=datetime.utcnow)