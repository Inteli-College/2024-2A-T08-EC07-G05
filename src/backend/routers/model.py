from fastapi import APIRouter, HTTPException, Depends
from services.model import list_models
from schemas.schemas import KNRInput
from supabase import Client

from database.supabase import create_supabase_client
router = APIRouter(tags=["model"])


def get_supabase_client() -> Client:
    return create_supabase_client()


@router.get("/getModels")
async def get_models():
   return list_models()

# @router.get("/getStats")
# async def get_stats():
#     return fetch_stats()