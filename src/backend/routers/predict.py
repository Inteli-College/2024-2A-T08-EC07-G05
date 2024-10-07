from fastapi import APIRouter, HTTPException, Depends, status
from services.predict import prediction
from schemas.schemas import KNRInput
from supabase import Client

from database.supabase import create_supabase_client
router = APIRouter(tags=["predict"])

def get_supabase_client() -> Client:
    return create_supabase_client()

@router.post("/predict/")
async def predict_knr(data: KNRInput, supabase: Client = Depends(get_supabase_client)):
    knr = data.knr
    my_prediction = prediction(knr=knr, supabase=supabase)
    return my_prediction

@router.get("/health_backend", status_code=status.HTTP_200_OK)
def health_check_backend():
    return {"status": "healthy", "backend_connection": "sucessful"}
