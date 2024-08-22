from fastapi import APIRouter, HTTPException

from services.predict import prediction



router = APIRouter(tags=["predict"])

@router.get("/predict")
async def predict():
    my_prediction = prediction()
    return my_prediction
