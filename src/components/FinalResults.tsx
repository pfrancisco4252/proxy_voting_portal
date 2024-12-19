import React from 'react';
import { mockVotes } from '../services/mockData';

const FinalResults: React.FC = () => {
  return (
    <div className="p-4">
      <h2 className="text-xl font-bold">Final Results</h2>
      <ul>
        {mockVotes.map(vote => (
          <li key={vote.id}>
            User: {vote.userId}, Document: {vote.documentId}, Choice: {vote.choice}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FinalResults;
