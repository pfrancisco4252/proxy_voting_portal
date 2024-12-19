import React, { useState } from 'react';
import SignatureVerification from './SignatureVerification';
import { UploadedFile } from '../services/fileService';

interface DocumentViewerProps {
  document: UploadedFile;
  onVote: (choice: string, signatureId: string) => void;
  voteButtons: Array<{ label: string; value: string; }>;
  controlNumber: string;
}

const DocumentViewer: React.FC<DocumentViewerProps> = ({
  document,
  onVote,
  voteButtons,
  controlNumber
}) => {
  const [showSignature, setShowSignature] = useState(false);
  const [selectedChoice, setSelectedChoice] = useState<string | null>(null);

  const handleVote = (signatureId: string) => {
    if (selectedChoice) {
      onVote(selectedChoice, signatureId);
      setShowSignature(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Document Display */}
      <div className="border rounded-lg p-4">
        <h2 className="text-xl font-semibold mb-4">{document.name}</h2>
        {document.type.startsWith('image/') ? (
          <img src={document.url} alt="Document" className="max-w-full" />
        ) : (
          <iframe
            src={document.url}
            className="w-full h-[600px]"
            title="Document Viewer"
          />
        )}
      </div>

      {/* Voting Section */}
      <div className="space-y-4">
        <h3 className="text-lg font-medium">Cast Your Vote</h3>
        <div className="flex flex-wrap gap-4">
          {voteButtons.map((button) => (
            <button
              key={button.value}
              onClick={() => {
                setSelectedChoice(button.value);
                setShowSignature(true);
              }}
              className={`px-6 py-3 rounded-md font-medium transition-colors
                ${selectedChoice === button.value
                  ? 'bg-indigo-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
            >
              {button.label}
            </button>
          ))}
        </div>
      </div>

      {/* Signature Modal */}
      {showSignature && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg p-6 max-w-xl w-full">
            <h3 className="text-lg font-medium mb-4">Sign Your Vote</h3>
            <SignatureVerification
              controlNumber={controlNumber}
              documentId={document.id}
              onSignatureComplete={handleVote}
            />
            <button
              onClick={() => setShowSignature(false)}
              className="mt-4 px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default DocumentViewer;
