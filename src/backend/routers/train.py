from fastapi import APIRouter, HTTPException, Depends
from fastapi.responses import StreamingResponse
from services.train import execute_training_pipeline
from supabase import Client

from database.supabase import create_supabase_client
router = APIRouter(tags=["train"])

def get_supabase_client() -> Client:
    return create_supabase_client()


@router.get("/trainingPipeline")
async def training_pipeline():
   return execute_training_pipeline()