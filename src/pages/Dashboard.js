// src/pages/Dashboard.js
import React, { useState, useContext, useRef } from 'react';
import { AppContext } from '../context/AppContext';
import CustomButtonFunctional from '../components/CustomButtonFunctional';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  const { addSearchHistory, setVideos: updateVideos } = useContext(AppContext); // Renamed setVideos to updateVideos
  const [handle, setHandle] = useState('');
  const [videos, setVideos] = useState([]);
  const buttonRef = useRef();

  const searchVideos = async () => {
    const response = await fetch(
      `https://www.googleapis.com/youtube/v3/search?part=snippet&type=video&q=${handle}&key=AIzaSyCwLVSWQkNZngUhoraN_leGhF05Nv0Dhzw`
    );
    const data = await response.json();
    setVideos(data.items);
    updateVideos(data.items); // Updating the context videos
    addSearchHistory(handle);
    buttonRef.current.setTitle('Search Completed');
  };

  return (
    <div className="container mx-auto p-4">
      <div className="flex flex-col items-center">
        <input
          type="text"
          value={handle}
          onChange={(e) => setHandle(e.target.value)}
          placeholder="Enter YouTube handle"
          className="p-2 border border-gray-300 rounded mb-4 w-full max-w-md"
        />
        <CustomButtonFunctional ref={buttonRef} onClick={searchVideos} />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-6">
        {videos.map((video) => (
          <div
            key={video.id.videoId}
            className="border border-gray-300 p-2 rounded shadow-lg"
          >
            <a
              href={`https://www.youtube.com/watch?v=${video.id.videoId}`}
              target="_blank"
              rel="noopener noreferrer"
              className="block"
            >
              <img
                src={video.snippet.thumbnails.high.url}
                alt={video.snippet.title}
                className="mb-2 w-full h-48 object-cover"
              />
              <p className="text-sm font-medium">{video.snippet.title}</p>
            </a>
          </div>
        ))}
      </div>
      <div className="flex justify-center mt-6">
        <Link
          to="/insights"
          className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
        >
          Go to Insights
        </Link>
      </div>
    </div>
  );
};

export default Dashboard;
