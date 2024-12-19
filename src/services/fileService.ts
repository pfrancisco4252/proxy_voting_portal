import { v4 as uuidv4 } from 'uuid';

export interface UploadedFile {
  id: string;
  name: string;
  type: string;
  size: number;
  url: string;
}

export const uploadFile = async (file: File): Promise<UploadedFile> => {
  // In a real implementation, this would upload to a cloud storage service
  // For now, we'll create a local URL
  const fileId = uuidv4();
  const fileUrl = URL.createObjectURL(file);

  return {
    id: fileId,
    name: file.name,
    type: file.type,
    size: file.size,
    url: fileUrl
  };
};

export const processShareholderExcel = async (file: File): Promise<any[]> => {
  try {
    const arrayBuffer = await file.arrayBuffer();
    const text = new TextDecoder().decode(arrayBuffer);
    const rows = text.split('\n').map(row => row.split(','));
    
    // Skip header row and map data
    return rows.slice(1).map(row => ({
      name: row[0]?.trim(),
      email: row[1]?.trim(),
      controlNumber: row[2]?.trim()
    }));
  } catch (error) {
    console.error('Error processing Excel file:', error);
    throw new Error('Invalid file format');
  }
};
