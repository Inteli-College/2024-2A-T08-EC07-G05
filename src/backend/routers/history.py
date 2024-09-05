from fastapi import APIRouter, HTTPException, Depends
from services.history import fetch_history
from schemas.schemas import KNRInput
from supabase import Client

from database.supabase import create_supabase_client
router = APIRouter(tags=["history"])


def get_supabase_client() -> Client:
    return create_supabase_client()


@router.get("/getHistory")
async def get_predictions():
   return fetch_history()