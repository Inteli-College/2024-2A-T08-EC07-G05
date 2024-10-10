from fastapi import APIRouter, Depends, status
from services.predict import prediction
from services.FetchAllData import carregar_knrs
# from utils.pipemodelo.NewModel import new_model2
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

@router.get("/fetch_all_data", status_code=status.HTTP_200_OK)
async def fetch_all_data():
    all_knrs = carregar_knrs()  
    return all_knrs

# @router.get("/new_model", status_code=status.HTTP_200_OK)
# async def create_new_model():
#     async for message in new_model():
#         print(message)  

@router.get("/health_backend", status_code=status.HTTP_200_OK)
def health_check_backend():
    return {"status": "healthy", "backend_connection": "sucessful"}
