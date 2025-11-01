import React, { useState } from "react";
import axios from "axios";
import { LuUploadCloud } from "react-icons/lu";
import Potato from "/assets/plants/potatoo.png"; // Corrected paths for images
import groundnut from "/assets/plants/groundnut.png";
import tomata from "/assets/plants/tomata.png";
import pepper from "/assets/plants/pepper.png";
import blackgram from "/assets/plants/blackgram.png";
import { LuLoader2 } from "react-icons/lu";
import toast from "react-hot-toast";
import { chatSession } from "../utils/gemini";
import DataList from "./DataList";
function Input() {
  const [image, setImage] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [data, setData] = useState("");
  const [symptomData, setSymptomData] = useState([]);
  const [treatmentData, setTreatmentData] = useState([]);
  const [per, setPer] = useState(0);
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false); // State to track loading

  const onFileChange = (event) => {
    const uploadedImage = event.target.files[0];
    setSelectedFile(uploadedImage);
    if (!uploadedImage) return;
    setImage(URL.createObjectURL(uploadedImage));
  };

  const onFileUpload = async () => {
    if (!selectedFile) {
      toast.error("Please select File !");
      return;
    }
    if (!url) {
      toast.error("Please select plant !");
      return;
    }

    setLoading(true); // Start loading
    const formData = new FormData();
    formData.append("file", selectedFile);

    try {
      const response = await axios.post(`http://localhost:8000/predict/${url}`, formData);
      const obj = response.data;
      setData(obj.class);
      setPer(obj.confidence);
      toast.success("Disease Detected Successfully!");

      // Proper prompt construction
      // const userInput = `The plant is: ${url}. The detected disease is: ${obj.class}. Based on this, provide the actionable insights and treatment recommendations in JSON format only.`;

      // Send message to chat session and get the result
      // const result = await chatSession.sendMessage(userInput);

      try {
        // console.log(result)
        // let jsonRes = result.response
        //   .text()
        //   .replace("```json", "")
        //   .replace("```", "")
        //   console.log(jsonRes)
        // const { actionable_insights, treatment_recommendations } = JSON.parse(jsonRes); // Parse JSON for symptoms and treatments
        // setSymptomData(actionable_insights)
        // setTreatmentData(treatment_recommendations)
        // console.log("Symptoms: ", symptoms);
        // console.log("Treatments: ", treatments);
      } catch (parseError) {
        console.error("Error parsing JSON:", parseError);
        toast.error("Failed to parse response.");
      }
    } catch (error) {
      toast.error("Invalid input");
    } finally {
      setLoading(false); // Stop loading
    }
  };

  const clearData = () => {
    setSelectedFile(null);
    setImage(false);
    setData("");
    setPer(0);
    setUrl("");
  };

  return (
    <>
      <h1 className="text-3xl font-bold text-center mt-10">Give it a try</h1>
      <div className="flex flex-col items-center mb-8">
        <h2 className="text-xl font-semibold mb-4">Select a plant</h2>
        <div className="flex gap-4">
          <button onClick={() => setUrl('potato')} className={`bg-gray-400 rounded-full p-2 ${url === 'potato' ? 'bg-blue-300' : 'bg-gray-400'} active:bg-gray-200`} title="potato">
            <img className="w-16 h-16" src={Potato} alt="Potato" />
          </button>
          <button onClick={() => setUrl('tomato')} className={`bg-gray-400 rounded-full p-2 ${url === 'tomato' ? 'bg-blue-300' : 'bg-gray-400'} active:bg-gray-200`} title="tomato">
            <img className="w-16 h-16" src={tomata} alt="Tomato" />
          </button>
          <button onClick={() => setUrl('pepper')} className={`bg-gray-400 rounded-full p-2 ${url === 'pepper' ? 'bg-blue-300' : 'bg-gray-400'} active:bg-gray-200`} title="pepper">
            <img className="w-16 h-16" src={pepper} alt="Pepper" />
          </button>
          <button onClick={() => setUrl('groundnut')} className={`bg-gray-400 rounded-full p-2 ${url === 'groundnut' ? 'bg-blue-300' : 'bg-gray-400'} active:bg-gray-200`} title="groundnut">
            <img className="w-16 h-16" src={groundnut} alt="Groundnut" />
          </button>
          <button onClick={() => setUrl('blackgram')} className={`bg-gray-400 rounded-full p-2 ${url === 'blackgram' ? 'bg-blue-300' : 'bg-gray-400'} active:bg-gray-200`} title="blackgram">
            <img className="w-16 h-16" src={blackgram} alt="blackgram" />
          </button>
        </div>
      </div>

      <div className="flex justify-center items-center gap-8">
        <div className="box1 mr-4">
          {!image && (
            <div className="flex flex-col gap-4">
              <span className="text-3xl font-bold">Is Your Plant Healthy?</span>
              <p>Check by uploading a photo of your <strong>{url}</strong> plant</p>
              <label className="flex flex-col p-4 justify-center items-center h-64 w-[28rem] border-4 border-dashed rounded-lg cursor-pointer hover:bg-gray-100">
                <span className="text-9xl"><LuUploadCloud /></span>
                <span className="text-lg mt-2">Click here to upload image</span>
                <input
                  className="hidden"
                  type="file"
                  accept="image/*"
                  onChange={onFileChange}
                />
              </label>
            </div>
          )}
          {image && <img className="mt-4 h-72 p-4 w-[28rem] object-contain" src={image} alt="Uploaded plant" />}

          <div className="flex justify-center items-center text-white mt-4 gap-8">
            <button className="btn bg-black px-4 py-2 rounded-lg" onClick={onFileUpload} disabled={loading}>
              {loading ? <span className="flex items-center"><LuLoader2 /> Detecting...</span> : 'Detect Disease'}
            </button>
            <button className="btn bg-red-500 px-4 py-2 rounded-lg" onClick={clearData} disabled={loading}>Clear Data</button>
          </div>
        </div>

        <div className="box2">
          <div className="text2">
            <h2 className="text-xl font-semibold">Result</h2>
            <p><strong>Disease:</strong> {data}</p>
            <p><strong>Confidence:</strong> {((per) * 100).toFixed(2)}%</p>
          </div>

        </div>
      </div>
      {
        treatmentData  ?
        <>
        <div className="flex justify-center w-full gap-4 p-4">
          {/* <DataList title="Actionable Insights" data={symptomData} fallback="No symptoms available" />
          <DataList title="Treatments Recommendation" data={treatmentData} fallback="No treatments available" /> */}
        </div>
        </>
        : ""
      }
    </>
  );
}

export default Input;






// {data && (
//   <div className="treat mt-4">
//     <h1 className="text-xl font-bold mb-2">Treatment</h1>
//     <ul className="list-disc list-inside">
//       {/* Dynamic treatment details based on detected disease */}
//       {data === "Anthracnose" && (
//         <>
//           <li>Remove Affected Parts</li>
//           <li>Fungicide Application</li>
//         </>
//       )}
//       {data === "Leaf Crinckle" && (
//         <>
//           <li>Remove Affected Parts</li>
//           <li>Control Aphid Vectors</li>
//           <li>Plant Virus-free Seed</li>
//         </>
//       )}
//       {data === "Powdery Mildew" && (
//         <>
//           <li>Remove Affected Parts</li>
//           <li>Fungicide Application</li>
//           <li>Air Circulation</li>
//         </>
//       )}
//       {data === "Yellow Mosaic" && (
//         <>
//           <li>Remove Affected Parts</li>
//           <li>Control Whitefly Vectors</li>
//           <li>Plant Virus-Free Seed</li>
//         </>
//       )}
//       {data === "Early Blight" && (
//         <>
//           <li>Proper Fertilization</li>
//           <li>Irrigation</li>
//           <li>Management of other pests</li>
//         </>
//       )}
//       {/* Additional conditions for other diseases */}
//     </ul>
//   </div>
// )}