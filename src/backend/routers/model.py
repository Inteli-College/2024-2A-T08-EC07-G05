from fastapi import APIRouter, HTTPException, Depends
from services.model import get_model_by_id, create_model_by_id, get_last_model
from supabase import Client
# from pydantic import BaseModel

from database.supabase import create_supabase_client
router = APIRouter(tags=["model"])

def get_supabase_client() -> Client:
    return create_supabase_client()

@router.get("/getModel/")
async def get_model(ID_MODELO: int):
    return get_model_by_id(ID_MODELO: int)

@router.post("/getLastModel")
async def get_model():
    return get_last_model()

# class precisao(BaseModel):
#     precisao: float

@router.post("/createModel/")
## RECEBER METRICAS E O ARQUIVO PKL
async def get_model(precisao: float):
 # função no services/model 
    return create_model_by_id(precisao)
