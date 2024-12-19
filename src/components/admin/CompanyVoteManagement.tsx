import React, { useState, useEffect } from 'react';
import { VoteItem } from '../../types/Vote';
import { voteManagementService } from '../../services/voteManagementService';
import CreateVote from '../voting/CreateVote';
import { toast } from 'react-toastify';

interface CompanyVoteManagementProps {
  companyId: string;
}

const CompanyVoteManagement: React.FC<CompanyVoteManagementProps> = ({ companyId }) => {
  const [showCreateVote, setShowCreateVote] = useState(false);
  const [votes, setVotes] = useState<VoteItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadVotes();
  }, [companyId]);

  const loadVotes = async () => {
    try {
      const companyVotes = await voteManagementService.getCompanyVotes(companyId);
      setVotes(companyVotes);
    } catch (error) {
      toast.error('Failed to load votes');
      console.error('Error loading votes:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCreateVote = async (vote: VoteItem) => {
    try {
      await voteManagementService.createVote(companyId, vote);
      toast.success('Vote created successfully');
      await loadVotes(); // Refresh the list
      setShowCreateVote(false);
    } catch (error) {
      toast.error('Failed to create vote');
      console.error('Error creating vote:', error);
    }
  };

  const handleDeleteVote = async (voteId: string) => {
    if (window.confirm('Are you sure you want to delete this vote?')) {
      try {
        await voteManagementService.deleteVote(companyId, voteId);
        toast.success('Vote deleted successfully');
        await loadVotes();
      } catch (error) {
        toast.error('Failed to delete vote');
        console.error('Error deleting vote:', error);
      }
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-2xl font-semibold text-gray-900">Vote Management</h1>
          <p className="mt-2 text-sm text-gray-700">
            Create and manage votes for your shareholders
          </p>
        </div>
        <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
          <button
            type="button"
            onClick={() => setShowCreateVote(true)}
            className="inline-flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:w-auto"
          >
            Create New Vote
          </button>
        </div>
      </div>

      {isLoading ? (
        <div className="text-center py-12">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-indigo-500 border-t-transparent"></div>
          <p className="mt-2 text-sm text-gray-500">Loading votes...</p>
        </div>
      ) : (
        <div className="mt-8 flex flex-col">
          <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
              <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
                <table className="min-w-full divide-y divide-gray-300">
                  <thead className="bg-gray-50">
                    <tr>
                      <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                        Title
                      </th>
                      <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                        Type
                      </th>
                      <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                        Status
                      </th>
                      <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                        Date Range
                      </th>
                      <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-6">
                        <span className="sr-only">Actions</span>
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 bg-white">
                    {votes.map((vote) => (
                      <tr key={vote.id}>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-900">
                          {vote.title}
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                          {vote.type}
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm">
                          <span className={`inline-flex rounded-full px-2 text-xs font-semibold leading-5 ${
                            vote.status === 'active'
                              ? 'bg-green-100 text-green-800'
                              : vote.status === 'upcoming'
                              ? 'bg-yellow-100 text-yellow-800'
                              : 'bg-gray-100 text-gray-800'
                          }`}>
                            {vote.status}
                          </span>
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                          {new Date(vote.startDate).toLocaleDateString()} - {new Date(vote.endDate).toLocaleDateString()}
                        </td>
                        <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                          <button
                            onClick={() => handleDeleteVote(vote.id)}
                            className="text-red-600 hover:text-red-900"
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Create Vote Modal */}
      {showCreateVote && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center p-4">
          <div className="relative bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <CreateVote
              companyId={companyId}
              onVoteCreated={handleCreateVote}
              onCancel={() => setShowCreateVote(false)}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default CompanyVoteManagement;
