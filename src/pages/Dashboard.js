import { useState, useContext, useRef } from 'react';
import { AppContext } from '../context/AppContext';
import CustomButtonFunctional from '../components/CustomButtonFunctional';
import YouTube from 'react-youtube';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  const { videos, setVideos, addSearchHistory } = useContext(AppContext);

  const [handle, setHandle] = useState('');

  const [selectedVideo, setSelectedVideo] = useState(null);

  const buttonRef = useRef();

  const searchVideos = async () => {
    const API_KEY = 'AIzaSyCwLVSWQkNZngUhoraN_leGhF05Nv0Dhzw';

    const maxResults = 8;

    const response = await fetch(
      `https://www.googleapis.com/youtube/v3/search?part=snippet&type=video&q=${handle}&maxResults=${maxResults}&key=${API_KEY}`
    );

    const data = await response.json();

    setVideos(data.items);
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
    <div className="p-8 bg-gray-400 rounded-md min-h-screen">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-2xl font-bold mb-4">Dashboard</h1>

        <div className="mb-4 flex flex-col md:flex-row items-center">
          <input
            type="text"
            value={handle}
            onChange={(e) => setHandle(e.target.value)}
            placeholder="Enter YouTube handle"
            className="w-full md:flex-1 p-2 border border-gray-300 rounded mb-2 md:mb-0 md:mr-2"
          />

          <CustomButtonFunctional ref={buttonRef} onClick={searchVideos} />
        </div>

        {videos.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-4">
            {videos.map((video) => (
              <div
                key={video.id.videoId}
                className="border border-gray-300 p-2 rounded cursor-pointer"
                onClick={() => setSelectedVideo(video.id.videoId)}
              >
                <img
                  src={video.snippet.thumbnails.default.url}
                  alt={video.snippet.title}
                  className="mb-2 w-full h-40 object-cover rounded"
                />

                <p className="text-sm">{video.snippet.title}</p>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center">No videos available do search anything.</p>
        )}

        {selectedVideo && (
          <div className="fixed inset-0 bg-black bg-opacity-75 flex justify-center items-center">
            <div className="bg-white p-4 rounded relative">
              <button
                onClick={() => setSelectedVideo(null)}
                className="absolute top-2 right-2 text-black bg-gray-200 rounded-full p-1"
              >
                ✕
              </button>

              <YouTube videoId={selectedVideo} opts={opts} />
            </div>
          </div>
        )}

        <div className="flex justify-center mt-6">
          <Link
            to="/insights"
            className="bg-purple-200 py-2 px-4 rounded hover:bg-purple-600 transition-colors"
          >
            Go to Insights
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
