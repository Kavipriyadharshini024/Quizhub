from sqlalchemy import Column
from sqlalchemy import Integer
from sqlalchemy import String
from sqlalchemy import ForeignKey

from database import Base



class User(Base):

    __tablename__ = "users"

    id = Column(
        Integer,
        primary_key=True,
        index=True
    )

    username = Column(String)

    email = Column(
        String,
        unique=True
    )

    password = Column(String)

    role = Column(String)




class Quiz(Base):

    __tablename__ = "quizzes"

    id = Column(
        Integer,
        primary_key=True,
        index=True
    )

    title = Column(String)

    description = Column(String)

    category = Column(String)

    status = Column(String)




class Question(Base):

    __tablename__ = "questions"

    id = Column(
        Integer,
        primary_key=True,
        index=True
    )

    quiz_id = Column(
        Integer,
        ForeignKey("quizzes.id")
    )

    question = Column(String)

    option1 = Column(String)

    option2 = Column(String)

    option3 = Column(String)

    option4 = Column(String)

    answer = Column(String)




class Result(Base):

    __tablename__ = "results"

    id = Column(
        Integer,
        primary_key=True,
        index=True
    )

    user_id = Column(Integer)

    quiz_id = Column(Integer)

    score = Column(Integer)

    total = Column(Integer)