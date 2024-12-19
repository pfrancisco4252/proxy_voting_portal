import React, { useState } from 'react';
import { createCompany } from '../services/companyService';
import { VoteButton } from '../types/Company';

const AdminPanel: React.FC = () => {
  const [companyName, setCompanyName] = useState('');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [documentTitle, setDocumentTitle] = useState('');
  const [votingButtons, setVotingButtons] = useState<VoteButton[]>([]);
  const [newButtonLabel, setNewButtonLabel] = useState('');
  const [instructions, setInstructions] = useState('');
  const [votingStart, setVotingStart] = useState('');
  const [votingEnd, setVotingEnd] = useState('');

  const handleCreateCompany = () => {
    if (companyName) {
      createCompany(companyName);
      setCompanyName('');
    }
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
    }
  };

  const handleAddVoteButton = () => {
    if (newButtonLabel) {
      setVotingButtons([
        ...votingButtons,
        { id: Date.now().toString(), label: newButtonLabel, value: newButtonLabel }
      ]);
      setNewButtonLabel('');
    }
  };

  const handleSubmitDocument = () => {
    if (selectedFile && documentTitle && votingButtons.length > 0) {
      // TODO: Implement document upload
      console.log('Uploading document:', {
        file: selectedFile,
        title: documentTitle,
        buttons: votingButtons,
        instructions,
        votingPeriod: { start: votingStart, end: votingEnd }
      });
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-8 text-indigo-600">PrideProxy Admin Panel</h1>
      
      {/* Company Creation */}
      <div className="bg-white p-6 rounded-lg shadow-md mb-8">
        <h2 className="text-xl font-semibold mb-4">Create Company</h2>
        <div className="flex gap-4">
          <input
            type="text"
            value={companyName}
            onChange={(e) => setCompanyName(e.target.value)}
            placeholder="Company Name"
            className="flex-1 border rounded-md px-3 py-2"
          />
          <button
            onClick={handleCreateCompany}
            className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700"
          >
            Create Company
          </button>
        </div>
      </div>

      {/* Document Upload */}
      <div className="bg-white p-6 rounded-lg shadow-md mb-8">
        <h2 className="text-xl font-semibold mb-4">Upload Document</h2>
        <div className="space-y-4">
          <input
            type="text"
            value={documentTitle}
            onChange={(e) => setDocumentTitle(e.target.value)}
            placeholder="Document Title"
            className="w-full border rounded-md px-3 py-2"
          />
          
          <div className="border-2 border-dashed border-gray-300 rounded-md p-4">
            <input
              type="file"
              onChange={handleFileUpload}
              className="w-full"
            />
          </div>

          <textarea
            value={instructions}
            onChange={(e) => setInstructions(e.target.value)}
            placeholder="Voting Instructions"
            className="w-full border rounded-md px-3 py-2 h-32"
          />

          {/* Voting Buttons */}
          <div className="space-y-2">
            <div className="flex gap-2">
              <input
                type="text"
                value={newButtonLabel}
                onChange={(e) => setNewButtonLabel(e.target.value)}
                placeholder="Vote Button Label"
                className="flex-1 border rounded-md px-3 py-2"
              />
              <button
                onClick={handleAddVoteButton}
                className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700"
              >
                Add Button
              </button>
            </div>
            <div className="flex flex-wrap gap-2">
              {votingButtons.map((button) => (
                <span
                  key={button.id}
                  className="bg-gray-200 px-3 py-1 rounded-full text-sm"
                >
                  {button.label}
                </span>
              ))}
            </div>
          </div>

          {/* Voting Period */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Voting Start
              </label>
              <input
                type="datetime-local"
                value={votingStart}
                onChange={(e) => setVotingStart(e.target.value)}
                className="w-full border rounded-md px-3 py-2"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Voting End
              </label>
              <input
                type="datetime-local"
                value={votingEnd}
                onChange={(e) => setVotingEnd(e.target.value)}
                className="w-full border rounded-md px-3 py-2"
              />
            </div>
          </div>

          <button
            onClick={handleSubmitDocument}
            className="w-full bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700"
          >
            Upload Document and Create Vote
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;
