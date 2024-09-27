from fastapi import APIRouter, HTTPException, Depends, status
from services.predict import prediction
from services.FetchAllData import carregar_knrs
from schemas.schemas import KNRInput
from supabase import Client
from utils.pipemodelo.NewModel import main
from database.supabase import create_supabase_client
router = APIRouter(tags=["predict"])

def get_supabase_client() -> Client:
    return create_supabase_client()

@router.post("/predict/")
async def predict_knr(data: KNRInput, supabase: Client = Depends(get_supabase_client)):
    knr = data.knr
    my_prediction = prediction(knr=knr, supabase=supabase)
    return my_prediction

@router.get("/fetch_all_data", status_code=status.HTTP_200_OK)
async def fetch_all_data():
    main = carregar_knrs()  
    return main

@router.get("/new_model", status_code=status.HTTP_200_OK)
async def fetch_all_data():
    new_modle = await main()  
    return new_modle

@router.get("/health_backend", status_code=status.HTTP_200_OK)
def health_check_backend():
    return {"status": "healthy", "backend_connection": "sucessful"}
