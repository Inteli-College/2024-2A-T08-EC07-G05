import numpy as np
import pandas as pd 
import pickle
from fastapi import HTTPException
from supabase import Client
from datetime import datetime
from services.model import get_model_by_id, get_current_model
from services.FetchAllData import carregar_knr


# with open("utils/modelo.pkl", "rb") as f:
#     model = pickle.load(f)

def prediction(knr: str = None, supabase = Client):

    current_model_data = get_current_model()
    if current_model_data is None:
        raise HTTPException(status_code=404, detail="No current model found")
    
    current_model_id = current_model_data[0]["ID_MODELO_ATUAL"]
    model = get_model_by_id(current_model_id)

    knr_info = carregar_knr(knr)
    knr_data = pd.DataFrame(knr_info)

    knr_data = np.array(knr_data).reshape((knr_data.shape[0], 1, knr_data.shape[1]))
    knr_data = np.array(knr_data, dtype=np.float32)


    if model is None:
        raise HTTPException(status_code=404, detail="Model not found")
    



    prediction_result = model.predict(knr_data)

    prediction_value = prediction_result[0].item()

    return {"prediction": prediction_value}