import React, { useState } from 'react';
import { createDocument } from '../api';
import type { Document } from '../types';
import { Button } from '../components/ui';
import { Icon } from '../components/icons';

interface DocumentUploadFormProps {
  onUpload: (document: Document) => void;
}

const DOCUMENT_TYPES: { value: string; label: string }[] = [
  { value: 'insurance_card', label: 'Insurance Card' },
  { value: 'lab_result', label: 'Lab Result' },
  { value: 'other', label: 'Other' },
];

function DocumentUploadForm({ onUpload }: DocumentUploadFormProps) {
  const [documentType, setDocumentType] = useState<string>('other');
  const [description, setDescription] = useState<string>('');
  const [file, setFile] = useState<File | null>(null);
  const [submitting, setSubmitting] = useState<boolean>(false);
  const [error, setError] = useState<string>('');

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files && e.target.files[0] ? e.target.files[0] : null;
    setFile(selected);
  };

  const resetForm = () => {
    setDocumentType('other');
    setDescription('');
    setFile(null);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');

    if (!file) {
      setError('Please choose a file to upload (insurance card, lab result, or other document).');
      return;
    }

    setSubmitting(true);
    try {
      const payload: Record<string, unknown> = {
        document_type: documentType,
        description,
        file,
      };
      const created = await createDocument(payload as unknown as Partial<Document>);
      onUpload(created);
      resetForm();
    } catch (err) {
      setError('Upload failed. Please check the file and try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form className="ds-form" onSubmit={handleSubmit}>
      <div className="ds-form-row">
        <div className="ds-field">
          <label className="ds-label" htmlFor="document_type">Document Type</label>
          <select
            id="document_type"
            className="input"
            value={documentType}
            onChange={(e) => setDocumentType(e.target.value)}
          >
            {DOCUMENT_TYPES.map((type) => (
              <option key={type.value} value={type.value}>{type.label}</option>
            ))}
          </select>
        </div>

        <div className="ds-field">
          <label className="ds-label" htmlFor="description">Description</label>
          <input
            id="description"
            type="text"
            className="input"
            placeholder="e.g. Blue Cross card, front side"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            maxLength={255}
          />
        </div>
      </div>

      <div className="ds-field">
        <label className="ds-label" htmlFor="file">File</label>
        <input
          id="file"
          type="file"
          className="input"
          accept="image/*,application/pdf"
          onChange={handleFileChange}
        />
        <p className="ds-help">Accepted: images or PDF. Upload insurance cards, lab results, or other records.</p>
      </div>

      {error && <p className="ds-small" style={{ color: 'var(--color-danger)' }}>{error}</p>}

      <div className="ds-form-actions">
        <Button type="submit" variant="primary" disabled={submitting}>
          <Icon name="upload" size={16} />
          {submitting ? 'Uploading...' : 'Upload Document'}
        </Button>
      </div>
    </form>
  );
}

export default DocumentUploadForm;