from fastapi import APIRouter, HTTPException, Depends
from services.model import get_model_by_id, new_model, delete_model_and_file_by_id, get_models
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

@router.get("/new_model", status_code=status.HTTP_200_OK)
async def create_new_model():
    return StreamingResponse(new_model(), media_type="text/event-stream", headers={
        "Cache-Control": "no-cache",
        "X-Accel-Buffering": "no"
    })

@router.delete("/deleteModel/", status_code=status.HTTP_200_OK)
async def delete_model(ID_MODELO):
    return delete_model_and_file_by_id(ID_MODELO)

@router.get("/getModels")
async def fetch_models():
    data = get_models()
    if data is None:
        return {"error": "Unable to fetch models"}
    return data

# @router.delete("/deleteModelBucket/", status_code=status.HTTP_200_OK)
# async def delete_model_from_bucket(ID_MODELO):
#     return delete_model_bucket(ID_MODELO)