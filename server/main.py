from fastapi import FastAPI, File, UploadFile
from fastapi.middleware.cors import CORSMiddleware
import uvicorn
import numpy as np
from io import BytesIO
from PIL import Image
import tensorflow as tf

app = FastAPI()

origins = [
    "http://localhost",
    "http://localhost:5173", #5173 is the port where frontend is running
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

potato_MODEL = tf.keras.models.load_model("./models/plant_disease/Potato_model.keras")
tomato_MODEL = tf.keras.models.load_model("./models/plant_disease/Tomato_model.keras")
blackgram_MODEL = tf.keras.models.load_model("./models/plant_disease/Blackgram_model.keras")
pepper_MODEL = tf.keras.models.load_model("./models/plant_disease/Pepper_model.keras")
groundnut_MODEL = tf.keras.models.load_model("./models/plant_disease/groundnut_model.keras")

p_CLASS_NAMES = ["Early Blight", "Late Blight", "Healthy"]
t_CLASS_NAMES = ['Early Blight', 'Late Blight', 'YellowLeaf Curl Virus', 'Mosaic Virus', 'Healthy']
b_CLASS_NAMES = ['Anthracnose', 'Healthy', 'Leaf Crinckle', 'Powdery Mildew', 'Yellow Mosaic']
pep_CLASS_NAMES = ['Bell Bacterial Spot', 'Bell Healthy']
g_CLASS_NAMES = ['Early Leaf Spot', 'Early Rust', 'Healthy Leaf', 'Late Leaf Spot', 'Nutrition Deficiency', 'Rust']

def read_file_as_image(data) -> np.ndarray:
    image = np.array(Image.open(BytesIO(data)))
    return image

@app.get("/hello")
async def hello():
    return {"message": "Hello from website"}

@app.post("/predict/{plant}")
async def predict(plant: str, file: UploadFile = File(...)):
    image = read_file_as_image(await file.read())
    img_batch = np.expand_dims(image, 0)
    
    if plant == "potato":
        predictions = potato_MODEL.predict(img_batch)
        predicted_class = p_CLASS_NAMES[np.argmax(predictions[0])]
    elif plant == "tomato":
        predictions = tomato_MODEL.predict(img_batch)
        predicted_class = t_CLASS_NAMES[np.argmax(predictions[0])]
    elif plant == "blackgram":
        predictions = blackgram_MODEL.predict(img_batch)
        predicted_class = b_CLASS_NAMES[np.argmax(predictions[0])]
    elif plant == "pepper":
        predictions = pepper_MODEL.predict(img_batch)
        predicted_class = pep_CLASS_NAMES[np.argmax(predictions[0])]
    elif plant == "groundnut":
        predictions = groundnut_MODEL.predict(img_batch)
        predicted_class = g_CLASS_NAMES[np.argmax(predictions[0])]
        
    confidence = np.max(predictions[0])
    return {
        'class': predicted_class,
        'confidence': float(confidence)
    }

@app.post("/recommendPrice")
async def recommend_price(plant: str, file: UploadFile = File(...)):
    return {}

if __name__ == "__main__":
    uvicorn.run(app, host='localhost', port=8000)
