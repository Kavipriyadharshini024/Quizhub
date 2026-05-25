from fastapi import FastAPI
from routers import users, quizzes, results, admin

app = FastAPI()

# Include Routers
app.include_router(users.router)
app.include_router(quizzes.router)
app.include_router(results.router)
app.include_router(admin.router)

@app.get("/")
def home():
    return {
        "message": "QuizHub API Running"
    }