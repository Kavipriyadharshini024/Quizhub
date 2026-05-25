from fastapi import APIRouter
from fastapi import Depends
from fastapi import HTTPException

from sqlalchemy.orm import Session

import models
import schemas

from database import get_db

from auth import hash_password
from auth import verify_password


router = APIRouter(

    prefix="/auth",

    tags=["Authentication"]
)


# =====================================
# REGISTER
# =====================================

@router.post("/register")

def register_user(

    user: schemas.UserCreate,

    db: Session = Depends(get_db)
):

    existing_user = db.query(

        models.User

    ).filter(

        models.User.email == user.email

    ).first()


    if existing_user:

        raise HTTPException(

            status_code=400,

            detail="Email already exists"
        )


    hashed_password = hash_password(
        user.password
    )


    new_user = models.User(

        username=user.username,

        email=user.email,

        password=hashed_password,

        role=user.role
    )


    db.add(new_user)

    db.commit()

    db.refresh(new_user)


    return {

        "message":
        "Registration Successful"
    }


# =====================================
# LOGIN
# =====================================

@router.post("/login")

def login_user(

    user: schemas.UserLogin,

    db: Session = Depends(get_db)
):

    existing_user = db.query(

        models.User

    ).filter(

        models.User.email == user.email

    ).first()


    if not existing_user:

        raise HTTPException(

            status_code=404,

            detail="User not found"
        )


    valid_password = verify_password(

        user.password,

        existing_user.password
    )


    if not valid_password:

        raise HTTPException(

            status_code=401,

            detail="Invalid password"
        )


    return {

        "message": "Login Successful",

        "user_id": existing_user.user_id,

        "username": existing_user.username,

        "email": existing_user.email,

        "role": existing_user.role
    }