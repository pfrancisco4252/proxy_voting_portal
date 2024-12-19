import React, { useState } from 'react';
import { VoteItem } from '../../types/Vote';

interface VoteSchedulerProps {
  vote: VoteItem;
  onSchedule: (schedule: {
    startDate: Date;
    endDate: Date;
    reminderDays: number[];
    notifyParticipants: boolean;
    sendReminders: boolean;
    recurringType?: 'none' | 'yearly' | 'quarterly' | 'monthly';
    recurringEndDate?: Date;
  }) => void;
  onCancel: () => void;
}

const VoteScheduler: React.FC<VoteSchedulerProps> = ({ vote, onSchedule, onCancel }) => {
  const [startDate, setStartDate] = useState(
    new Date(vote.startDate).toISOString().slice(0, 16)
  );
  const [endDate, setEndDate] = useState(
    new Date(vote.endDate).toISOString().slice(0, 16)
  );
  const [reminderDays, setReminderDays] = useState<number[]>([7, 3, 1]); // Days before end date
  const [notifyParticipants, setNotifyParticipants] = useState(true);
  const [sendReminders, setSendReminders] = useState(true);
  const [recurringType, setRecurringType] = useState<'none' | 'yearly' | 'quarterly' | 'monthly'>('none');
  const [recurringEndDate, setRecurringEndDate] = useState<string>('');
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    try {
      const start = new Date(startDate);
      const end = new Date(endDate);
      
      // Validation
      if (end <= start) {
        throw new Error('End date must be after start date');
      }

      if (new Date(startDate) < new Date()) {
        throw new Error('Start date cannot be in the past');
      }

      if (recurringType !== 'none' && !recurringEndDate) {
        throw new Error('Please set an end date for recurring votes');
      }

      const schedule = {
        startDate: start,
        endDate: end,
        reminderDays,
        notifyParticipants,
        sendReminders,
        recurringType,
        recurringEndDate: recurringEndDate ? new Date(recurringEndDate) : undefined
      };

      onSchedule(schedule);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to schedule vote');
    }
  };

  const handleReminderChange = (day: number, checked: boolean) => {
    if (checked) {
      setReminderDays([...reminderDays, day].sort((a, b) => b - a));
    } else {
      setReminderDays(reminderDays.filter(d => d !== day));
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Schedule Vote</h2>
        <button
          onClick={onCancel}
          className="text-gray-400 hover:text-gray-500"
        >
          <span className="sr-only">Close</span>
          <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Vote Period */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Start Date & Time
            </label>
            <input
              type="datetime-local"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              required
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              End Date & Time
            </label>
            <input
              type="datetime-local"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              required
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            />
          </div>
        </div>

        {/* Recurring Schedule */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Recurring Schedule
          </label>
          <select
            value={recurringType}
            onChange={(e) => setRecurringType(e.target.value as any)}
            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          >
            <option value="none">One-time Vote</option>
            <option value="yearly">Yearly</option>
            <option value="quarterly">Quarterly</option>
            <option value="monthly">Monthly</option>
          </select>

          {recurringType !== 'none' && (
            <div className="mt-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Recurring End Date
              </label>
              <input
                type="date"
                value={recurringEndDate}
                onChange={(e) => setRecurringEndDate(e.target.value)}
                required
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              />
            </div>
          )}
        </div>

        {/* Notification Settings */}
        <div>
          <h3 className="text-sm font-medium text-gray-700 mb-2">Notification Settings</h3>
          <div className="space-y-3">
            <div className="flex items-center">
              <input
                type="checkbox"
                id="notifyParticipants"
                checked={notifyParticipants}
                onChange={(e) => setNotifyParticipants(e.target.checked)}
                className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
              />
              <label htmlFor="notifyParticipants" className="ml-2 text-sm text-gray-700">
                Notify participants when voting begins
              </label>
            </div>
            
            <div className="flex items-center">
              <input
                type="checkbox"
                id="sendReminders"
                checked={sendReminders}
                onChange={(e) => setSendReminders(e.target.checked)}
                className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
              />
              <label htmlFor="sendReminders" className="ml-2 text-sm text-gray-700">
                Send reminder notifications
              </label>
            </div>

            {sendReminders && (
              <div className="pl-6 pt-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Send reminders before end date:
                </label>
                <div className="space-y-2">
                  {[7, 3, 1].map((day) => (
                    <div key={day} className="flex items-center">
                      <input
                        type="checkbox"
                        id={`reminder-${day}`}
                        checked={reminderDays.includes(day)}
                        onChange={(e) => handleReminderChange(day, e.target.checked)}
                        className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                      />
                      <label htmlFor={`reminder-${day}`} className="ml-2 text-sm text-gray-700">
                        {day} {day === 1 ? 'day' : 'days'} before
                      </label>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 rounded-md p-4">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-sm text-red-700">{error}</p>
              </div>
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex justify-end space-x-3">
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Schedule Vote
          </button>
        </div>
      </form>
    </div>
  );
};

export default VoteScheduler;
