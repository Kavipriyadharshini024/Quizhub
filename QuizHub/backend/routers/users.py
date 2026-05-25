from fastapi import APIRouter
from fastapi import Depends
from fastapi import HTTPException

from sqlalchemy.orm import Session

from database import get_db

from models import User

from auth import hash_password

from auth import verify_password


router = APIRouter(

    prefix="/users",

    tags=["Users"]
)



# ====================================
# REGISTER
# ====================================

@router.post("/register")

def register_user(

    user: dict,

    db: Session = Depends(get_db)
):

    existing_user = db.query(User).filter(

        User.email == user["email"]

    ).first()


    if existing_user:

        raise HTTPException(

            status_code=400,

            detail="Email already exists"
        )


    hashed_password = hash_password(

        user["password"]
    )


    new_user = User(

        username=user["username"],

        email=user["email"],

        password=hashed_password,

        role=user["role"]
    )


    db.add(new_user)

    db.commit()

    db.refresh(new_user)


    return {

        "message":
        "Registration Successful"
    }




# ====================================
# LOGIN
# ====================================

@router.post("/login")

def login_user(

    user: dict,

    db: Session = Depends(get_db)
):

    existing_user = db.query(User).filter(

        User.email == user["email"]

    ).first()


    if not existing_user:

        raise HTTPException(

            status_code=404,

            detail="User not found"
        )


    valid_password = verify_password(

        user["password"],

        existing_user.password
    )


    if not valid_password:

        raise HTTPException(

            status_code=401,

            detail="Invalid Password"
        )


    return {

        "message":
        "Login Successful",

        "user_id":
        existing_user.id,

        "username":
        existing_user.username,

        "role":
        existing_user.role
    }




# ====================================
# GET USERS
# ====================================

@router.get("/")

def get_users(

    db: Session = Depends(get_db)
):

    users = db.query(User).all()

    return users