from fastapi import (
    APIRouter,
    Depends,
    HTTPException
)

from sqlalchemy.orm import Session

import models

from database import get_db

router = APIRouter(
    prefix="/certificates",
    tags=["Certificates"]
)


# =========================================
# GENERATE CERTIFICATE
# =========================================

@router.post("/{user_id}/{quiz_id}")

def generate_certificate(
    user_id: int,
    quiz_id: int,
    db: Session = Depends(get_db)
):

    score = db.query(
        models.Score
    ).filter(
        models.Score.user_id == user_id,
        models.Score.quiz_id == quiz_id
    ).first()

    if not score:

        raise HTTPException(
            status_code=404,
            detail="Score Not Found"
        )

    if not score.eligibility_status:

        raise HTTPException(
            status_code=400,
            detail="User Not Eligible"
        )

    certificate_path = f"certificates/{user_id}_{quiz_id}.pdf"

    existing_certificate = db.query(
        models.Certificate
    ).filter(
        models.Certificate.user_id == user_id,
        models.Certificate.quiz_id == quiz_id
    ).first()

    if existing_certificate:

        return {
            "message": "Certificate Already Generated"
        }

    certificate = models.Certificate(

        user_id=user_id,

        quiz_id=quiz_id,

        certificate_url=certificate_path
    )

    db.add(certificate)

    db.commit()

    db.refresh(certificate)

    return {

        "message": "Certificate Generated",

        "certificate_url": certificate_path
    }


# =========================================
# GET CERTIFICATES
# =========================================

@router.get("/{user_id}")

def get_certificates(
    user_id: int,
    db: Session = Depends(get_db)
):

    certificates = db.query(
        models.Certificate
    ).filter(
        models.Certificate.user_id == user_id
    ).all()

    return certificates