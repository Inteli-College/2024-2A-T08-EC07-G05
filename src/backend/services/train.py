from utils.pipeline import execute_pipeline
from fastapi.responses import StreamingResponse

def execute_training_pipeline():
    return StreamingResponse(execute_pipeline(), media_type="text/event-stream")