export interface AdminUser {
  id: string;
  email: string;
  name: string;
  role: 'SUPER_ADMIN' | 'COMPANY_ADMIN';
  companyId?: string;
  permissions: string[];
}

export interface CompanyPortal {
  id: string;
  name: string;
  logo?: string;
  primaryColor?: string;
  secondaryColor?: string;
  domain?: string;
  settings: {
    allowChat: boolean;
    requireControlNumber: boolean;
    allowEmailVerification: boolean;
    customVotingButtons: boolean;
    votingPeriodEnabled: boolean;
  };
  status: 'ACTIVE' | 'INACTIVE' | 'SUSPENDED';
  createdAt: Date;
  updatedAt: Date;
}
