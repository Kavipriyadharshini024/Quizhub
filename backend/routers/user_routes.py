from fastapi import APIRouter
from fastapi import Depends

from sqlalchemy.orm import Session

import models

from database import get_db


router = APIRouter(

    prefix="/users",

    tags=["Users"]
)


# =====================================
# GET ALL USERS
# =====================================

@router.get("/")

def get_users(

    db: Session = Depends(get_db)
):

    users = db.query(

        models.User

    ).all()

    return users