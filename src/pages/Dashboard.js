import { useState, useContext, useRef, useEffect, useCallback } from 'react';
import { AppContext } from '../context/AppContext';
import CustomButtonFunctional from '../components/CustomButtonFunctional';
import YouTube from 'react-youtube';
import { Link } from 'react-router-dom';
import ErrorMessage from '../components/ErrorMessage';

const Dashboard = () => {
  const { videos, setVideos, addSearchHistory } = useContext(AppContext);

  const [handle, setHandle] = useState('');

  const [selectedVideo, setSelectedVideo] = useState(null);

  const [noVideosMessage, setNoVideosMessage] = useState('');

  const [apiError, setApiError] = useState('');

  const [loading, setLoading] = useState(false);

  const [pageToken, setPageToken] = useState(null);

  const loadingRef = useRef(null);

  const API_KEY = 'AIzaSyCwLVSWQkNZngUhoraN_leGhF05Nv0Dhzw';

  const maxResults = 8;

  const searchVideos = useCallback(
    async (newSearch = false) => {
      if (loading) return;

      setLoading(true);

      try {
        const response = await fetch(
          `https://www.googleapis.com/youtube/v3/search?part=snippet&type=video&q=${handle}&maxResults=${maxResults}&pageToken=${
            pageToken || ''
          }&key=${API_KEY}`
        );

        if (!response.ok) {
          throw new Error(`API call failed with status: ${response.status}`);
        }

        const data = await response.json();

        if (data.items && data.items.length > 0) {
          setVideos((prevVideos) =>
            newSearch ? data.items : [...prevVideos, ...data.items]
          );
          setNoVideosMessage('');
          setApiError('');
          setPageToken(data.nextPageToken || null);

          if (newSearch) {
            addSearchHistory(handle);
          }
        } else {
          if (newSearch) {
            setVideos([]);
          }
          setNoVideosMessage('No videos available for this handle.');
        }
      } catch (error) {
        console.error('Error fetching videos:', error);
        setApiError(`Error fetching videos: ${error.message}`);
        setNoVideosMessage('');
      } finally {
        setLoading(false);
      }
    },
    [handle, pageToken, setVideos, addSearchHistory, loading]
  );

  const opts = {
    height: '390',
    width: '640',
    playerVars: {
      autoplay: 1,
    },
  };

  const handleObserver = useCallback(
    (entries) => {
      const target = entries[0];

      if (target.isIntersecting && pageToken) {
        searchVideos();
      }
    },
    [pageToken, searchVideos]
  );

  useEffect(() => {
    const option = {
      root: null,
      rootMargin: '20px',
      threshold: 1.0,
    };

    const observer = new IntersectionObserver(handleObserver, option);

    const currentLoadingRef = loadingRef.current;

    if (currentLoadingRef) {
      observer.observe(currentLoadingRef);
    }

    return () => {
      if (currentLoadingRef) {
        observer.unobserve(currentLoadingRef);
      }
    };
  }, [handleObserver]);

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

          <CustomButtonFunctional onClick={() => searchVideos(true)} />
        </div>

        {apiError && <ErrorMessage error={apiError} />}

        {noVideosMessage && (
          <p className="text-center text-red-500">{noVideosMessage}</p>
        )}

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

            <div ref={loadingRef} className="loading-indicator"></div>
          </div>
        ) : (
          !noVideosMessage &&
          !apiError && (
            <p className="text-center">
              No videos available. Please search for something.
            </p>
          )
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
