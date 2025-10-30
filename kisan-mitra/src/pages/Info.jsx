import React from 'react';
import { motion } from 'framer-motion';
import { PiPlantFill } from "react-icons/pi";
import {  GiReceiveMoney } from "react-icons/gi";
const  Info = () => {
  return (
    <div className="flex flex-col md:flex-row items-center justify-center p-10 gap-10 md:justify-between">
      <div className="w-full md:w-1/2">
        <p className="text-center md:text-left">
          Plants play a crucial role in supplying food globally. Various environmental factors lead to plant diseases which results in significant production losses. However, manual detection of plant diseases is a time-consuming and error-prone process due to the fact that symptoms are not always apparent, either through visual inspection or computer analysis. It can be an unreliable method of identifying and preventing the spread of plant diseases. Emergence of accurate techniques in the field of leaf based image classification has shown impressive results.
        </p>
        <div className="text-center md:text-left">
          <strong>
            Our model uses ML algorithm for identifying between healthy and diseased leaf. Our solution gives us a clear way to detect the disease present in plants in a colossal scale.
          </strong>
        </div>
      </div>
      <div className="w-1/2 flex flex-col items-center gap-4 justify-center">
        <motion.div
          initial={{ opacity: -2 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1, ease: "easeOut" }}
          className="w-96 shadow-2xl rounded-lg border p-4"
        >
          <span>
            <PiPlantFill />
          </span>
          <span className="ml-2  text-xs font-bold">Plant pathology</span>
          <span className="ml-2 text-xs">
            "AI technologies have recently been applied to the field of plant pathology for identifying plant abnormalities and infestations. These technologies can have the capability to transform the method in which plant maladies are identified, diagnosed, and managed🤖"
          </span>
        </motion.div>
        <div className="flex gap-4">
          <motion.div
            initial={{ opacity: -2 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1, ease: "easeOut" }}
            className="w-96 shadow-2xl rounded-lg border p-4"
          >
            <span>
              <GiReceiveMoney />
            </span>
            <span className="ml-2 text-xs font-bold">Early Identification</span>
            <span className="ml-2 text-xs">
              "By adopting these advanced technologies, farmers and plant disease specialists can detect diseases at an early stage, preventing further spread and reducing the risk of crop losses.🌱🕵️‍♂️ "
            </span>
          </motion.div>
          <motion.div
            initial={{ opacity: -2 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1, ease: "easeOut" }}
            className="w-96 shadow-2xl rounded-lg border p-4"
          >
            <span>
              <GiReceiveMoney />
            </span>
            <span className="ml-2 text-xs font-bold">Cost Reduction</span>
            <span className="ml-2 text-xs">
              "The use of ML and DL techniques in plant disease detection can reduce the need for manual labor and the cost of plant disease detection. This can be useful for farmers and small-scale agricultural operations who may not have access to expensive equipment or specialized expertise."
            </span>
          </motion.div>
        </div>
      </div>
    </div>
  );
};
export default Info