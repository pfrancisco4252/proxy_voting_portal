import { Company } from '../types/Company';

    export const addDocumentToCompany = (companyId: string, documentPath: string): void => {
      const company = getCompanies().find(c => c.id === companyId);
      if (company) {
        company.documents.push(documentPath);
      }
    };
