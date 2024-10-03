from fastapi import APIRouter, HTTPException, status, UploadFile, File
from fastapi.responses import JSONResponse
from typing import List
import pandas as pd
from utils.etl import FALHAS_ROUTINE, RESULTADO_ROUTINE, STATUS_ROUTINE, MERGE_DFS
from services.etl import insert
from io import BytesIO
import os
from datetime import datetime

router = APIRouter(tags=["ETL"])

UPLOAD_DIRECTORY = "exceldata"

if not os.path.exists(UPLOAD_DIRECTORY):
    os.makedirs(UPLOAD_DIRECTORY)

@router.post("/etl/process", status_code=status.HTTP_200_OK)
async def process_files(
    falhas_file: UploadFile = File(...),
    resultados_file: UploadFile = File(...),
    status_file: UploadFile = File(...)
):
    try:
        timestamp = datetime.now().strftime("%d_%m_%H_%M")
        falhas_path = os.path.join(UPLOAD_DIRECTORY, f"falhas_{timestamp}_{falhas_file.filename}")
        resultados_path = os.path.join(UPLOAD_DIRECTORY, f"resultados_{timestamp}_{resultados_file.filename}")
        status_path = os.path.join(UPLOAD_DIRECTORY, f"status_{timestamp}_{status_file.filename}")

        with open(falhas_path, "wb") as f:
            f.write(falhas_file.file.read())
        with open(resultados_path, "wb") as f:
            f.write(resultados_file.file.read())
        with open(status_path, "wb") as f:
            f.write(status_file.file.read())

        falhas_processed_df = FALHAS_ROUTINE(falhas_path)
        resultados_processed_df = RESULTADO_ROUTINE(resultados_path)
        status_processed_df = STATUS_ROUTINE(status_path)
        merged_data_df = MERGE_DFS(falhas_processed_df, resultados_processed_df, status_processed_df)
        insert(merged_data_df)

        return JSONResponse(
            status_code=200,
            content={"message": "Dados inseridos com sucesso"}
            )

    except Exception as e:
        print(e)
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail=str(e))
