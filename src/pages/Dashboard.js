import { useState, useContext, useRef } from 'react';
import { AppContext } from '../context/AppContext';
import CustomButtonFunctional from '../components/CustomButtonFunctional';
import YouTube from 'react-youtube';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  const { addSearchHistory, setVideos: updateVideos } = useContext(AppContext);

  const [handle, setHandle] = useState('');

  const [videos, setVideos] = useState([]);

  const [selectedVideo, setSelectedVideo] = useState(null);

  const buttonRef = useRef();

  const searchVideos = async () => {
    const response = await fetch(
      `https://www.googleapis.com/youtube/v3/search?part=snippet&type=video&q=${handle}&key=AIzaSyCwLVSWQkNZngUhoraN_leGhF05Nv0Dhzw`
    );

    const data = await response.json();

    setVideos(data.items);

    updateVideos(data.items);

    addSearchHistory(handle);

    buttonRef.current.setTitle('Search Completed');
  };

  const opts = {
    height: '390',
    width: '640',
    playerVars: {
      autoplay: 1,
    },
  };

  return (
    <div className="max-w-6xl mx-auto p-4">
      <div className="mb-6 flex flex-col md:flex-row items-center justify-center">
        <input
          type="text"
          value={handle}
          onChange={(e) => setHandle(e.target.value)}
          placeholder="Enter YouTube handle"
          className="w-full md:w-auto p-2 border border-gray-300 rounded md:mr-2 mb-4 md:mb-0"
        />

        <CustomButtonFunctional ref={buttonRef} onClick={searchVideos} />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {videos.map((video) => (
          <div
            key={video.id.videoId}
            className="border border-gray-300 p-2 rounded cursor-pointer hover:shadow-md transition-shadow"
            onClick={() => setSelectedVideo(video.id.videoId)}
          >
            <img
              src={video.snippet.thumbnails.default.url}
              alt={video.snippet.title}
              className="w-full mb-2 rounded"
            />

            <p className="text-sm font-semibold text-gray-700">
              {video.snippet.title}
            </p>
          </div>
        ))}
      </div>

      {selectedVideo && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex justify-center items-center z-50">
          <div className="bg-white p-4 rounded shadow-lg relative">
            <button
              onClick={() => setSelectedVideo(null)}
              className="absolute top-2 right-2 text-black"
            >
              &times;
            </button>

            <YouTube videoId={selectedVideo} opts={opts} />
          </div>
        </div>
      )}

      <div className="flex justify-center mt-6">
        <Link
          to="/insights"
          className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition-colors"
        >
          Go to Insights
        </Link>
      </div>
    </div>
  );
};

export default Dashboard;
