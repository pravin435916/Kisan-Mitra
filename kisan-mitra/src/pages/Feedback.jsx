import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { TextField, Rating } from '@mui/material';
import {toast} from "react-hot-toast"
import leftImage from '/assets/home/girl.svg'; // Import your left image

export const Feedback = () => {
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');
  const [rating, setRating] = useState(0);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:8000/api/posts', {
        name,
        message: message,
        rating: parseInt(rating),
      });
      if(!message || !rating) {
        toast.error('Invalid Inputs')
      }
      if (response.status === 200) {
        toast.success("Feedback submitted successfully");
        console.log('Feedback submitted successfully');
        navigate('/');
        setName('');
        setMessage('');
        setRating(0);
      } else {
        console.error('Failed to submit feedback');
      }
    } catch (error) {
      console.error('Error submitting feedback:', error);
      toast.error('Error submitting feedback');

    }
  };

  return (
    <div className="h-[80vh] mx-auto mt-8 flex justify-center items-center">
      <div className="w-1/2 p-2 center-pos">
        <img className="w-[38rem] h-[38rem]" src={leftImage} alt="Left" />
      </div>
      <div className="w-1/2">
        <div className="mx-auto flex flex-col gap-8">
          <h1 className="text-3xl font-semibold mb-4">Feedback Form</h1>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <TextField
                className='w-96'
                label="Name"
                variant="outlined"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="mb-4">
              <TextField
                className='w-[28rem]'
                multiline
                rows={4}
                label="Message"
                variant="outlined"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              />
            </div>
            <div className="mb-4">
            <Rating name="size-large" value={rating}  onChange={(e) => setRating(e.target.value)} size="large" />
            </div>
            <button
              type="submit"
              className="btn bg-black text-white rounded-lg"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}