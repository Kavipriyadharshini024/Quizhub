from sqlalchemy.orm import Session

import models
import schemas

from auth import hash_password


# =========================================
# CREATE USER
# =========================================

def create_user(
    db: Session,
    user: schemas.UserCreate
):

    hashed_password = hash_password(
        user.password
    )

    db_user = models.User(

        username=user.username,

        email=user.email,

        password=hashed_password,

        organization=user.organization,

        role=user.role
    )

    db.add(db_user)

    db.commit()

    db.refresh(db_user)

    return db_user


# =========================================
# GET USER BY EMAIL
# =========================================

def get_user_by_email(
    db: Session,
    email: str
):

    return db.query(models.User).filter(
        models.User.email == email
    ).first()