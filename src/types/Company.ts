export interface Company {
  id: string;
  name: string;
  documents: Document[];
  videos: Media[];
  images: Media[];
  shareholders: string[]; // Array of user IDs
  votingPeriods: VotingPeriod[];
}

export interface Document {
  id: string;
  title: string;
  path: string;
  uploadDate: Date;
  customButtons: VoteButton[];
  instructions?: string;
}

export interface Media {
  id: string;
  title: string;
  path: string;
  uploadDate: Date;
}

export interface VoteButton {
  id: string;
  label: string;
  value: string;
}

export interface VotingPeriod {
  id: string;
  documentId: string;
  startTime: Date;
  endTime: Date;
  isActive: boolean;
}
