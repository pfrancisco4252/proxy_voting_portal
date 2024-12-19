import { v4 as uuidv4 } from 'uuid';
import { Company, Document, VoteButton, VotingPeriod } from '../types/Company';

const companies: Company[] = [];

export const getCompanies = (): Company[] => companies;

export const createCompany = (name: string): Company => {
  const company: Company = {
    id: uuidv4(),
    name,
    documents: [],
    videos: [],
    images: [],
    shareholders: [],
    votingPeriods: []
  };
  companies.push(company);
  return company;
};

export const uploadDocument = (
  companyId: string,
  title: string,
  path: string,
  buttons: VoteButton[],
  instructions?: string
): Document => {
  const document: Document = {
    id: uuidv4(),
    title,
    path,
    uploadDate: new Date(),
    customButtons: buttons,
    instructions
  };

  const company = companies.find(c => c.id === companyId);
  if (company) {
    company.documents.push(document);
  }

  return document;
};

export const createVotingPeriod = (
  companyId: string,
  documentId: string,
  startTime: Date,
  endTime: Date
): VotingPeriod => {
  const votingPeriod: VotingPeriod = {
    id: uuidv4(),
    documentId,
    startTime,
    endTime,
    isActive: false
  };

  const company = companies.find(c => c.id === companyId);
  if (company) {
    company.votingPeriods.push(votingPeriod);
  }

  return votingPeriod;
};
