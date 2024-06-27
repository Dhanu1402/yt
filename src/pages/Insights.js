// src/pages/Insights.js
import React, { useContext } from 'react';
import { PieChart, Pie, Cell, Tooltip } from 'recharts';
import { AppContext } from '../context/AppContext';

const Insights = () => {
  const { videos } = useContext(AppContext);

  const top5Videos = videos.slice(0, 5).map((video) => ({
    name: video.snippet.title,
    likes: parseInt(video.statistics.likeCount, 10),
  }));

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#AA336A'];

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Top 5 Video Likes</h2>

      <PieChart width={400} height={400}>
        <Pie
          data={top5Videos}
          dataKey="likes"
          nameKey="name"
          cx="50%"
          cy="50%"
          outerRadius={100}
          fill="#8884d8"
        >
          {top5Videos.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>

        <Tooltip />
      </PieChart>
    </div>
  );
};

export default Insights;
