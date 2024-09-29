from fastapi import APIRouter, HTTPException, Depends
from backend.services.history import fetch_history, fetch_stats
from backend.schemas.schemas import KNRInput
from supabase import Client

from backend.database.supabase import create_supabase_client
router = APIRouter(tags=["history"])

def get_supabase_client() -> Client:
    return create_supabase_client()


@router.get("/getHistory")
async def get_predictions():
   return fetch_history()

@router.get("/getStats")
async def get_stats():
    return fetch_stats()