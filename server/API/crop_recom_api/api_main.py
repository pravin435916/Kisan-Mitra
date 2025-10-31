from fastapi import FastAPI
from pydantic import BaseModel
import numpy as np
from joblib import load

# Load the trained Random Forest model
model = load('./RandomForest.joblib')

# Initialize the FastAPI app
app = FastAPI()

# Define the data structure for the input using Pydantic
class SoilData(BaseModel):
    N: float
    P: float
    OX: float
    temperature: float
    humidity: float
    ph: float
    rainfall: float

# Define the prediction route
@app.post("/predict/croprec")
async def predict_crop(data: SoilData):
    # Prepare the input data for the model
    input_data = np.array([[data.N, data.P, data.OX, data.temperature, data.humidity, data.ph, data.rainfall]])

    # Predict the class (crop)
    prediction = model.predict(input_data)[0]

    # Get the probabilities for each class
    probabilities = model.predict_proba(input_data)[0]

    # Get the confidence of the predicted class
    confidence = np.max(probabilities) * 100  # Convert to percentage

    # Return the predicted crop and confidence as a response
    return {
        "predicted_crop": prediction,
        "confidence": f"{confidence:.2f}%"
    }

#    uvicorn api_main:app --reload