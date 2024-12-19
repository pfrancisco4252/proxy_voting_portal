import React, { useState } from 'react';
import { Line, Bar, Pie } from 'react-chartjs-2';

interface AnalyticsProps {
  companyId: string;
}

const CompanyAnalytics: React.FC<AnalyticsProps> = ({ companyId }) => {
  const [timeRange, setTimeRange] = useState('7d');

  // Mock data - replace with real data from your backend
  const votingData = {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    datasets: [
      {
        label: 'Votes Cast',
        data: [65, 59, 80, 81, 56, 55, 40],
        fill: false,
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.1,
      },
    ],
  };

  const participationData = {
    labels: ['Voted', 'Not Voted'],
    datasets: [
      {
        data: [300, 100],
        backgroundColor: ['#4F46E5', '#E5E7EB'],
      },
    ],
  };

  return (
    <div className="space-y-6">
      {/* Time Range Selector */}
      <div className="flex justify-end space-x-2">
        {['24h', '7d', '30d', '90d'].map((range) => (
          <button
            key={range}
            onClick={() => setTimeRange(range)}
            className={`px-3 py-1 rounded-md text-sm ${
              timeRange === range
                ? 'bg-indigo-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            {range}
          </button>
        ))}
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="text-sm font-medium text-gray-500">Total Shareholders</h3>
          <p className="mt-2 text-3xl font-bold text-gray-900">400</p>
          <p className="mt-1 text-sm text-green-600">+5% from last month</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="text-sm font-medium text-gray-500">Active Votes</h3>
          <p className="mt-2 text-3xl font-bold text-gray-900">3</p>
          <p className="mt-1 text-sm text-gray-600">2 ending soon</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="text-sm font-medium text-gray-500">Avg. Participation</h3>
          <p className="mt-2 text-3xl font-bold text-gray-900">75%</p>
          <p className="mt-1 text-sm text-green-600">+12% from last vote</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="text-sm font-medium text-gray-500">Total Votes Cast</h3>
          <p className="mt-2 text-3xl font-bold text-gray-900">1,234</p>
          <p className="mt-1 text-sm text-gray-600">Across all votes</p>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="text-lg font-medium mb-4">Voting Activity</h3>
          <Line data={votingData} options={{ responsive: true }} />
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="text-lg font-medium mb-4">Participation Rate</h3>
          <Pie data={participationData} options={{ responsive: true }} />
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white p-4 rounded-lg shadow">
        <h3 className="text-lg font-medium mb-4">Recent Activity</h3>
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="flex items-center justify-between border-b pb-4">
              <div>
                <p className="font-medium">Vote #{i} Cast</p>
                <p className="text-sm text-gray-500">2 minutes ago</p>
              </div>
              <span className="px-2 py-1 text-sm rounded-full bg-green-100 text-green-800">
                Completed
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CompanyAnalytics;
