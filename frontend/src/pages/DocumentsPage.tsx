import { useEffect, useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { getDocumentList, deleteDocument as deleteDocumentApi } from '../api';
import type { Document } from '../types';
import DocumentsHeader from '../components/DocumentsHeader';
import DocumentsContent from '../components/DocumentsContent';
import DocumentUploadForm from '../components/DocumentUploadForm';
import { Alert } from '../components/ui';

export default function DocumentsPage() {
  const { isAuthenticated } = useAuth();
  const [documents, setDocuments] = useState<Document[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>('');

  const fetchDocuments = async () => {
    setLoading(true);
    try {
      const data = await getDocumentList();
      setDocuments(Array.isArray(data) ? data : []);
      setError('');
    } catch (err) {
      setError('Unable to load documents right now. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      fetchDocuments();
    }
  }, [isAuthenticated]);

  const handleUpload = (document: Document) => {
    setDocuments((prev) => [document, ...prev]);
  };

  const handleDelete = async (id: number) => {
    const previous = documents;
    setDocuments((prev) => prev.filter((doc) => doc.id !== id));
    try {
      await deleteDocumentApi(id);
    } catch (err) {
      setDocuments(previous);
      setError('Could not delete that document. Please try again.');
    }
  };

  return (
    <div className="ds-stack-lg">
      <DocumentsHeader documentCount={documents.length} />
      {error && <Alert tone="danger">{error}</Alert>}
      <DocumentUploadForm onUpload={handleUpload} />
      <DocumentsContent documents={documents} loading={loading} onDelete={handleDelete} />
    </div>
  );
}