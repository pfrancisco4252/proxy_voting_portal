
import React, { useState } from 'react';

interface ReportConfig {
  type: string;
  dateRange: string;
  filters: Record<string, any>;
}

const ReportingSystem: React.FC = () => {
  const [selectedReport, setSelectedReport] = useState<string>('');
  const [dateRange, setDateRange] = useState('7d');
  const [filters, setFilters] = useState({});
  const [generatingReport, setGeneratingReport] = useState(false);

  const reportTypes = [
    { id: 'voting-summary', name: 'Voting Summary Report' },
    { id: 'participation', name: 'Participation Analysis' },
    { id: 'shareholder-activity', name: 'Shareholder Activity Report' },
    { id: 'audit-log', name: 'Audit Log Report' },
  ];

  const handleGenerateReport = async () => {
    setGeneratingReport(true);
    try {
      // Implementation for report generation
      console.log('Generating report:', {
        type: selectedReport,
        dateRange,
        filters,
      });
    } finally {
      setGeneratingReport(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Report Configuration */}
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-lg font-medium mb-4">Generate Report</h2>
        
        <div className="space-y-4">
          {/* Report Type */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Report Type</label>
            <select
              value={selectedReport}
              onChange={(e) => setSelectedReport(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            >
              <option value="">Select a report type</option>
              {reportTypes.map((type) => (
                <option key={type.id} value={type.id}>
                  {type.name}
                </option>
              ))}
            </select>
          </div>

          {/* Date Range */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Date Range</label>
            <div className="mt-1 flex space-x-2">
              {['7d', '30d', '90d', 'custom'].map((range) => (
                <button
                  key={range}
                  onClick={() => setDateRange(range)}
                  className={`px-3 py-1 rounded-md text-sm ${
                    dateRange === range
                      ? 'bg-indigo-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {range === 'custom' ? 'Custom' : range}
                </button>
              ))}
            </div>
          </div>

          {dateRange === 'custom' && (
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Start Date</label>
                <input
                  type="date"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">End Date</label>
                <input
                  type="date"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                />
              </div>
            </div>
          )}

          {/* Filters */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Filters</label>
            <div className="mt-1 space-y-2">
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                />
                <label className="text-sm text-gray-700">Include inactive shareholders</label>
              </div>
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                />
                <label className="text-sm text-gray-700">Show only completed votes</label>
              </div>
            </div>
          </div>

          {/* Generate Button */}
          <div className="flex justify-end">
            <button
              onClick={handleGenerateReport}
              disabled={!selectedReport || generatingReport}
              className={`px-4 py-2 rounded-md text-white ${
                generatingReport || !selectedReport
                  ? 'bg-gray-400 cursor-not-allowed'
                  : 'bg-indigo-600 hover:bg-indigo-700'
              }`}
            >
              {generatingReport ? 'Generating...' : 'Generate Report'}
            </button>
          </div>
        </div>
      </div>

      {/* Recent Reports */}
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-lg font-medium mb-4">Recent Reports</h2>
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="flex items-center justify-between border-b pb-4">
              <div>
                <p className="font-medium">Voting Summary Report</p>
                <p className="text-sm text-gray-500">Generated on {new Date().toLocaleDateString()}</p>
              </div>
              <div className="flex space-x-2">
                <button className="px-3 py-1 text-sm text-indigo-600 hover:text-indigo-900">
                  Download
                </button>
                <button className="px-3 py-1 text-sm text-gray-600 hover:text-gray-900">
                  View
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Scheduled Reports */}
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-medium">Scheduled Reports</h2>
          <button className="px-4 py-2 text-sm bg-indigo-600 text-white rounded-md hover:bg-indigo-700">
            Schedule New Report
          </button>
        </div>
        <div className="space-y-4">
          {[1, 2].map((i) => (
            <div key={i} className="flex items-center justify-between border-b pb-4">
              <div>
                <p className="font-medium">Weekly Participation Report</p>
                <p className="text-sm text-gray-500">Every Monday at 9:00 AM</p>
              </div>
              <div className="flex space-x-2">
                <button className="px-3 py-1 text-sm text-indigo-600 hover:text-indigo-900">
                  Edit
                </button>
                <button className="px-3 py-1 text-sm text-