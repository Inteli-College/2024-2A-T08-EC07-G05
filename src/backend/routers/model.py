from fastapi import APIRouter, HTTPException, Depends
from services.model import get_model_by_id, new_model, delete_model_id
from supabase import Client
from fastapi import status
from fastapi.responses import StreamingResponse

from database.supabase import create_supabase_client
router = APIRouter(tags=["model"])

def get_supabase_client() -> Client:
    return create_supabase_client()

@router.get("/getModel/")
async def get_model(ID_MODELO: int):
    return get_model_by_id(ID_MODELO)

@router.post("/getLastModel")
async def get_model():
    return get_model_by_id()


@router.get("/new_model", status_code=status.HTTP_200_OK)
async def create_new_model():
    return StreamingResponse(new_model(), media_type="text/event-stream", headers={
        "Cache-Control": "no-cache",
        "X-Accel-Buffering": "no"
    })

@router.delete("/deleteModel/", status_code=status.HTTP_200_OK)
async def delete_model(ID_MODELO):
    return delete_model_id(ID_MODELO)