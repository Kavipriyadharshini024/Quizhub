from pydantic import BaseModel


# =========================================
# USER
# =========================================

class UserCreate(BaseModel):

    username: str

    email: str

    password: str

    role: str


class UserLogin(BaseModel):

    email: str

    password: str

# =========================================
# QUIZ
# =========================================

class QuizCreate(BaseModel):

    quiz_name: str

    description: str

    organization_name: str

    location: str

    quiz_status: str

    coordinator_id: int
# =========================================
# QUESTION
# =========================================

class QuestionCreate(BaseModel):

    quiz_id: int

    question: str

    option_1: str

    option_2: str

    option_3: str

    option_4: str

    correct_answer: str

    marks: int


# =========================================
# ANSWER
# =========================================

class AnswerCreate(BaseModel):

    student_id: int

    quiz_id: int

    question_id: int

    selected_option: str