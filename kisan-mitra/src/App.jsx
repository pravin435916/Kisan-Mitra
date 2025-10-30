import React from 'react'
import { Home } from './pages/Home'
import { About } from './pages/About'
import {BrowserRouter,Routes,Route} from "react-router-dom"
import { Navbar } from './pages/Navbar'
import ChatBot from './component/ChatBot'
import { Feedback } from './pages/Feedback'
import Posts from './pages/Posts'
import DiseaseDetection from './pages/models/DiseaseDetection'
import WeatherPrediction from './pages/models/WeatherPrediction'
import CropRecommendation from './pages/models/CropRecommendation'
import NearbySoilTestingLabs from './pages/models/NearbySoilTestingLabs'
function App() {
  return (
    <>
    <BrowserRouter>
    {/* <Navbar/> */}
       <Routes>
          <Route path='/' element={<Home/>}/>
          {/* <Route path='/about' element={<About/>}/> */}
          <Route path='/posts' element={<Posts/>}/>
          <Route path='/feedback' element={<Feedback/>}/>
          <Route path="/disease-detection" element={<DiseaseDetection />} />
          <Route path="/weather-prediction" element={<WeatherPrediction />} />
          <Route path="/crop-recommendation" element={<CropRecommendation />} />
          <Route path="/nearby-soil-testing-labs" element={<NearbySoilTestingLabs />} />
       </Routes>
       <ChatBot/>
    </BrowserRouter>
    </>
  )
}

export default App