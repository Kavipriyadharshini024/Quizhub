from fastapi import FastAPI

from fastapi.middleware.cors import CORSMiddleware

from database import engine

import models


from routers.auth_routes import router as auth_router
from routers.quiz_routes import router as quiz_router
from routers.question_routes import router as question_router
from routers.answer_routes import router as answer_router
from routers.score_routes import router as score_router
from routers.attempt_routes import router as attempt_router
from routers.user_routes import router as user_router

models.Base.metadata.create_all(bind=engine)


app = FastAPI()


# =====================================
# CORS
# =====================================

app.add_middleware(

    CORSMiddleware,

    allow_origins=["*"],

    allow_credentials=True,

    allow_methods=["*"],

    allow_headers=["*"],
)


# =====================================
# ROUTERS
# =====================================

app.include_router(auth_router, prefix="/api")

app.include_router(quiz_router, prefix="/api")

app.include_router(question_router, prefix="/api")

app.include_router(answer_router, prefix="/api")

app.include_router(score_router, prefix="/api")

app.include_router(attempt_router, prefix="/api")

app.include_router(user_router, prefix="/api")
# =====================================
# ROOT
# =====================================

@app.get("/")

def home():

    return {

        "message":
        "Quiz Platform API Running"
    }