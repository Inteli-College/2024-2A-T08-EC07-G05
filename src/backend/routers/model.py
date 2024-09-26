from fastapi import APIRouter, HTTPException, Depends
from services.model import get_model_by_id, create_model_by_id
from schemas.schemas import KNRInput
from supabase import Client
# from pydantic import BaseModel

from database.supabase import create_supabase_client
router = APIRouter(tags=["model"])

def get_supabase_client() -> Client:
    return create_supabase_client()

@router.get("/getModel")
async def get_model(ID_MODELO: int):
    return get_model_by_id(ID_MODELO: int)

@router.post("/getLastModel")
async def get_model():
    return get_model_by_id()

# class precisao(BaseModel):
#     precisao: float

@router.post("/createModel/")
async def get_model(precisao: float):
    return create_model_by_id(precisao)
