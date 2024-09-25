from fastapi import APIRouter, HTTPException, Depends, status
from schemas.schemas import KNRInput
from supabase import Client

from database.supabase import create_supabase_client
router = APIRouter(tags=["ETL"])

