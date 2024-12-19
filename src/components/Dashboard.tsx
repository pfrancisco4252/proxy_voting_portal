import React, { useState, useEffect } from 'react';
import { VotingMetrics } from '../types/Vote';
import { Document } from '../types/Company';

const Dashboard: React.FC = () => {
  const [activeDocuments, setActiveDocuments] = useState<Document[]>([]);
  const [metrics, setMetrics] = useState<VotingMetrics | null>(null);

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-8 text-indigo-600">Voting Dashboard</h1>

      {/* Active Votes */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Active Votes</h2>
          {activeDocuments.length === 0 ? (
            <p className="text-gray-500">No active votes at the moment</p>
          ) : (
            <ul className="space-y-4">
              {activeDocuments.map((doc) => (
                <li key={doc.id} className="border-b pb-4">
                  <h3 className="font-medium">{doc.title}</h3>
                  <p className="text-sm text-gray-600">
                    Uploaded on {doc.uploadDate.toLocaleDateString()}
                  </p>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Voting Metrics */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Current Results</h2>
          {metrics ? (
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Total Votes:</span>
                <span className="font-medium">{metrics.totalVotes}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Participation Rate:</span>
                <span className="font-medium">
                  {(metrics.participationRate * 100).toFixed(1)}%
                </span>
              </div>
              <div className="space-y-2">
                <h3 className="text-sm font-medium text-gray-600">Results:</h3>
                {Object.entries(metrics.results).map(([choice, count]) => (
                  <div key={choice} className="flex justify-between items-center">
                    <span>{choice}:</span>
                    <span className="font-medium">{count}</span>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <p className="text-gray-500">No voting data available</p>
          )}
        </div>
      </div>

      {/* Export Button */}
      <div className="flex justify-end">
        <button
          onClick={() => {/* TODO: Implement export */}}
          className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700"
        >
          Export Results to Excel
        </button>
      </div>
    </div>
  );
};

export default Dashboard;
