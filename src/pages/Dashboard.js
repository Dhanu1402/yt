import React, { useState, useContext, useRef } from 'react';
import { AppContext } from '../context/AppContext';
import CustomButtonFunctional from '../components/CustomButtonFunctional';

const Dashboard = () => {
  const { addSearchHistory, setVideos: updateVideos } = useContext(AppContext); // Renamed setVideos to updateVideos

  const [handle, setHandle] = useState('');
  const [videos, setVideos] = useState([]); // Changed the state name to videos

  const buttonRef = useRef();

  const searchVideos = async () => {
    const response = await fetch(
      `https://www.googleapis.com/youtube/v3/search?part=snippet&type=video&q=${handle}&key=AIzaSyCwLVSWQkNZngUhoraN_leGhF05Nv0Dhzw`
    );

    const data = await response.json();

    setVideos(data.items); // Updating the videos state
    addSearchHistory(handle);
    buttonRef.current.setTitle('Search Completed');
  };

  return (
    <div className="p-4">
      <input
        type="text"
        value={handle}
        onChange={(e) => setHandle(e.target.value)}
        placeholder="Enter YouTube handle"
        className="p-2 border border-gray-300 rounded mr-2"
      />

      <CustomButtonFunctional ref={buttonRef} onClick={searchVideos} />

      <div className="grid grid-cols-3 gap-4 mt-4">
        {videos.map((video) => (
          <div
            key={video.id.videoId}
            className="border border-gray-300 p-2 rounded"
          >
            <a
              href={`https://www.youtube.com/watch?v=${video.id.videoId}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                src={video.snippet.thumbnails.default.url}
                alt={video.snippet.title}
                className="mb-2"
              />
              <p className="text-sm">{video.snippet.title}</p>
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
