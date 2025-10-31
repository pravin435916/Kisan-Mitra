import numpy as np
from io import BytesIO
from PIL import Image
import tensorflow as tf
from fastapi import FastAPI, File, UploadFile
from fastapi.responses import JSONResponse

# Initialize FastAPI app
app = FastAPI()

# Load models
try:
    TOMATO_MODEL = tf.keras.models.load_model("./Tomato_model2.keras")
    POTATO_MODEL = tf.keras.models.load_model("./Potato_model.keras")
    BLACKGRAM_MODEL = tf.keras.models.load_model("./Blackgram_model.keras")
    PEPPER_MODEL = tf.keras.models.load_model("./Pepper_model.keras")
    GROUNDNUT_MODEL = tf.keras.models.load_model("./groundnut_model.keras")
except Exception as e:
    print(f"Error loading model: {e}")
    raise

# Class names for each crop
TOMATO_CLASSES = ['Tomato_Early_blight', 'Tomato_Late_blight', 'Tomato_Tomato_YellowLeafCurl_Virus', 'Tomato_Tomato_mosaic_virus', 'Tomato_healthy']
POTATO_CLASSES = ["Early Blight", "Late Blight", "Healthy"]
BLACKGRAM_CLASSES = ['Blackgram_anthracnose', 'Blackgram_healthy', 'Blackgram_leaf_crinckle', 'Blackgram_powdery_mildew', 'Blackgram_yellow_mosaic']
PEPPER_CLASSES = ['Pepper__bell___Bacterial_spot', 'Pepper__bell___healthy']
GROUNDNUT_CLASSES =['Groundnut__early_leaf_spot', 'Groundnut__early_rust', 'Groundnut__healthy_leaf', 'Groundnut__late_leaf_spot', 'Groundnut__nutrition_deficiency', 'Groundnut__rust']
# Helper function to read file as image
def read_file_as_image(data) -> np.ndarray:
    image = np.array(Image.open(BytesIO(data)))
    return image

# Helper function to make predictions
def predict_image(model, class_names, image_data):
    image = read_file_as_image(image_data)
    if image.ndim != 3:
        raise ValueError("Invalid image format")
    
    img_batch = np.expand_dims(image, 0)
    predictions = model.predict(img_batch)
    predicted_class = class_names[np.argmax(predictions[0])]
    confidence = np.max(predictions[0])
    
    return predicted_class, confidence

# Route to predict the class of the tomato image
@app.post("/predict/tomato")
async def predict_tomato(file: UploadFile = File(...)):
    try:
        image_data = await file.read()
        predicted_class, confidence = predict_image(TOMATO_MODEL, TOMATO_CLASSES, image_data)
        return JSONResponse(content={'class': predicted_class, 'confidence': float(confidence)})
    except Exception as e:
        return JSONResponse(content={"error": str(e)}, status_code=500)

# Route to predict the class of the potato image
@app.post("/predict/potato")
async def predict_potato(file: UploadFile = File(...)):
    try:
        image_data = await file.read()
        predicted_class, confidence = predict_image(POTATO_MODEL, POTATO_CLASSES, image_data)
        return JSONResponse(content={'class': predicted_class, 'confidence': float(confidence)})
    except Exception as e:
        return JSONResponse(content={"error": str(e)}, status_code=500)

# Route to predict the class of the blackgram image
@app.post("/predict/blackgram")
async def predict_blackgram(file: UploadFile = File(...)):
    try:
        image_data = await file.read()
        predicted_class, confidence = predict_image(BLACKGRAM_MODEL, BLACKGRAM_CLASSES, image_data)
        return JSONResponse(content={'class': predicted_class, 'confidence': float(confidence)})
    except Exception as e:
        return JSONResponse(content={"error": str(e)}, status_code=500)
    
# Route to predict the class of the pepper image
@app.post("/predict/pepper")
async def predict_pepper(file: UploadFile = File(...)):
    try:
        image_data = await file.read()
        predicted_class, confidence = predict_image(PEPPER_MODEL, PEPPER_CLASSES, image_data)
        return JSONResponse(content={'class': predicted_class, 'confidence': float(confidence)})
    except Exception as e:
        return JSONResponse(content={"error": str(e)}, status_code=500)

# Route to predict the class of the Groundnut image
@app.post("/predict/groundnut")
async def predict_groundnut(file: UploadFile = File(...)):
    try:
        image_data = await file.read()
        predicted_class, confidence = predict_image(GROUNDNUT_MODEL, GROUNDNUT_CLASSES, image_data)
        return JSONResponse(content={'class': predicted_class, 'confidence': float(confidence)})
    except Exception as e:
        return JSONResponse(content={"error": str(e)}, status_code=500)
    
# To run the app with uvicorn, use the command below
# uvicorn detection_api:app --reload
