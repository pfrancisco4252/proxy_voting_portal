import React, { useState, useEffect } from 'react';
import { signatureStorageService } from '../../services/signatureStorageService';

interface SignatureViewerProps {
  controlNumber: string;
  documentId?: string;
}

const SignatureViewer: React.FC<SignatureViewerProps> = ({
  controlNumber,
  documentId
}) => {
  const [signatures, setSignatures] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadSignatures();
  }, [controlNumber, documentId]);

  const loadSignatures = async () => {
    try {
      const sigs = await signatureStorageService.getSignaturesByControlNumber(controlNumber);
      if (documentId) {
        setSignatures(sigs.filter(s => s.documentId === documentId));
      } else {
        setSignatures(sigs);
      }
    } catch (error) {
      console.error('Error loading signatures:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div>Loading signatures...</div>;
  }

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">Signatures</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {signatures.map((sig) => (
          <div key={sig.id} className="border rounded-lg p-4">
            <div className="mb-2">
              <img
                src={sig.imageData}
                alt="Signature"
                className="max-w-full border"
              />
            </div>
            <div className="text-sm text-gray-600">
              <p>Timestamp: {sig.timestamp.toLocaleString()}</p>
              <p>Document ID: {sig.documentId}</p>
              <p>Hash: {sig.hash.substring(0, 16)}...</p>
              <details className="mt-2">
                <summary className="cursor-pointer">Metadata</summary>
                <div className="pl-4 mt-2">
                  <p>IP: {sig.metadata.ipAddress}</p>
                  <p>Device: {sig.metadata.deviceId}</p>
                  {sig.metadata.geoLocation && (
                    <p>Location: {sig.metadata.geoLocation}</p>
                  )}
                </div>
              </details>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SignatureViewer;
