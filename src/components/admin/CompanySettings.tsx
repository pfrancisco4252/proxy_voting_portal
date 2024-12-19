import React, { useState } from 'react';
import { CompanyPortal } from '../../types/Admin';

interface CompanySettingsProps {
  company: CompanyPortal;
  onUpdate: (updatedCompany: CompanyPortal) => void;
}

const CompanySettings: React.FC<CompanySettingsProps> = ({ company, onUpdate }) => {
  const [settings, setSettings] = useState(company);
  const [activeSection, setActiveSection] = useState('general');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdate(settings);
  };

  return (
    <div className="bg-white rounded-lg shadow-sm">
      <div className="flex border-b">
        <button
          onClick={() => setActiveSection('general')}
          className={`px-6 py-3 ${activeSection === 'general' ? 'border-b-2 border-indigo-600 text-indigo-600' : ''}`}
        >
          General
        </button>
        <button
          onClick={() => setActiveSection('branding')}
          className={`px-6 py-3 ${activeSection === 'branding' ? 'border-b-2 border-indigo-600 text-indigo-600' : ''}`}
        >
          Branding
        </button>
        <button
          onClick={() => setActiveSection('security')}
          className={`px-6 py-3 ${activeSection === 'security' ? 'border-b-2 border-indigo-600 text-indigo-600' : ''}`}
        >
          Security
        </button>
        <button
          onClick={() => setActiveSection('notifications')}
          className={`px-6 py-3 ${activeSection === 'notifications' ? 'border-b-2 border-indigo-600 text-indigo-600' : ''}`}
        >
          Notifications
        </button>
      </div>

      <form onSubmit={handleSubmit} className="p-6">
        {activeSection === 'general' && (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700">Company Name</label>
              <input
                type="text"
                value={settings.name}
                onChange={(e) => setSettings({ ...settings, name: e.target.value })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Domain</label>
              <input
                type="text"
                value={settings.domain}
                onChange={(e) => setSettings({ ...settings, domain: e.target.value })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Portal Features</label>
              <div className="mt-2 space-y-2">
                {Object.entries(settings.settings).map(([key, value]) => (
                  <div key={key} className="flex items-center">
                    <input
                      type="checkbox"
                      checked={value}
                      onChange={(e) => setSettings({
                        ...settings,
                        settings: { ...settings.settings, [key]: e.target.checked }
                      })}
                      className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                    />
                    <label className="ml-2 text-sm text-gray-700">
                      {key.replace(/([A-Z])/g, ' $1').trim()}
                    </label>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeSection === 'branding' && (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700">Logo</label>
              <div className="mt-1 flex items-center">
                {settings.logo ? (
                  <img src={settings.logo} alt="Company logo" className="h-12 w-12 rounded-full" />
                ) : (
                  <div className="h-12 w-12 rounded-full bg-gray-200 flex items-center justify-center">
                    <span className="text-xl font-bold text-gray-500">{settings.name[0]}</span>
                  </div>
                )}
                <button
                  type="button"
                  className="ml-4 px-3 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
                >
                  Change
                </button>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Primary Color</label>
              <input
                type="color"
                value={settings.primaryColor}
                onChange={(e) => setSettings({ ...settings, primaryColor: e.target.value })}
                className="mt-1 block w-full"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Secondary Color</label>
              <input
                type="color"
                value={settings.secondaryColor}
                onChange={(e) => setSettings({ ...settings, secondaryColor: e.target.value })}
                className="mt-1 block w-full"
              />
            </div>
          </div>
        )}

        {activeSection === 'security' && (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-medium text-gray-900">Access Control</h3>
              <div className="mt-2 space-y-2">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Minimum Password Length</label>
                  <input
                    type="number"
                    min="8"
                    max="32"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Session Timeout (minutes)</label>
                  <input
                    type="number"
                    min="5"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {activeSection === 'notifications' && (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-medium text-gray-900">Email Notifications</h3>
              <div className="mt-2 space-y-2">
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                  />
                  <label className="ml-2 text-sm text-gray-700">
                    New vote notifications
                  </label>
                </div>
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                  />
                  <label className="ml-2 text-sm text-gray-700">
                    Vote reminder emails
                  </label>
                </div>
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                  />
                  <label className="ml-2 text-sm text-gray-700">
                    Results summary emails
                  </label>
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="mt-6 flex justify-end">
          <button
            type="submit"
            className="ml-3 inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            Save Changes
          </button>
        </div>
      </form>
    </div>
  );
};

export default CompanySettings;
