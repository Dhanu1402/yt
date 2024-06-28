import { useContext, useEffect, useState } from 'react';
import { PieChart, Pie, Cell, Tooltip } from 'recharts';
import { AppContext } from '../context/AppContext';

const Insights = () => {
  const { videos } = useContext(AppContext);

  const [top5Videos, setTop5Videos] = useState([]);

  useEffect(() => {
    const fetchVideoDetails = async () => {
      const API_KEY = 'AIzaSyCwLVSWQkNZngUhoraN_leGhF05Nv0Dhzw';

      const videoDetails = await Promise.all(
        videos.map(async (video) => {
          const videoId = video.id.videoId;

          const response = await fetch(
            `https://www.googleapis.com/youtube/v3/videos?part=statistics&id=${videoId}&key=${API_KEY}`
          );

          const data = await response.json();
          return { ...video, statistics: data.items[0].statistics };
        })
      );

      setTop5Videos(
        videoDetails
          .sort((a, b) => b.statistics.likeCount - a.statistics.likeCount)
          .slice(0, 5)
          .map((video) => ({
            name: video.snippet.title,
            likes: parseInt(video.statistics.likeCount, 10),
          }))
      );
    };

    fetchVideoDetails();
  }, [videos]);

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#AA336A'];

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4 text-center">Top 5 Video Likes</h2>

      {top5Videos.length > 0 ? (
        <div className="flex flex-col items-center">
          <PieChart width={400} height={400}>
            <Pie
              data={top5Videos}
              dataKey="likes"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={150}
              fill="#8884d8"
              label={({ likes }) => `(${likes})`}
              labelLine={false}
            >
              {top5Videos.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>

            <Tooltip />
          </PieChart>

          <table className="table-auto mt-8 w-full max-w-md">
            <thead>
              <tr>
                <th className="px-4 py-2">Color</th>

                <th className="px-4 py-2">Video Title</th>

                <th className="px-4 py-2">Likes</th>
              </tr>
            </thead>

            <tbody>
              {top5Videos.map((video, index) => (
                <tr key={video.name}>
                  <td
                    className="px-4 py-2"
                    style={{ backgroundColor: COLORS[index % COLORS.length] }}
                  />

                  <td className="px-4 py-2">{video.name}</td>

                  <td className="px-4 py-2">{video.likes}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="text-center mt-4 text-gray-600">
          No video data available. Please perform a search on the Dashboard.
        </p>
      )}
    </div>
  );
};

export default Insights;
