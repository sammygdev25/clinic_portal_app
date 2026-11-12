import { Section } from '../components/ui';
import { Icon } from '../components/icons';

interface VisitHistoryDetailsProps {
  patientName?: string;
  patientEmail?: string;
  phone?: string;
  dateOfBirth?: string;
  insuranceProvider?: string;
  insuranceId?: string;
  address?: string;
}

export default function VisitHistoryDetails({
  patientName,
  patientEmail,
  phone,
  dateOfBirth,
  insuranceProvider,
  insuranceId,
  address,
}: VisitHistoryDetailsProps) {
  return (
    <Section
      narrow
      eyebrow="Account details"
      title="Your information on file"
      subtitle="This is the information your care team sees alongside your visit notes and prescriptions."
    >
      <div className="ds-form">
        <div className="ds-form-row">
          <div className="ds-field">
            <label className="ds-label">
              <Icon name="user" size={14} /> Patient
            </label>
            <input className="input" value={patientName || ''} disabled readOnly />
          </div>
          <div className="ds-field">
            <label className="ds-label">
              <Icon name="mail" size={14} /> Email
            </label>
            <input className="input" value={patientEmail || ''} disabled readOnly />
          </div>
        </div>
        <div className="ds-form-row">
          <div className="ds-field">
            <label className="ds-label">
              <Icon name="phone" size={14} /> Phone
            </label>
            <input className="input" value={phone || ''} disabled readOnly />
          </div>
          <div className="ds-field">
            <label className="ds-label">
              <Icon name="calendar" size={14} /> Date of birth
            </label>
            <input className="input" value={dateOfBirth || ''} disabled readOnly />
          </div>
        </div>
        <div className="ds-field">
          <label className="ds-label">
            <Icon name="map-pin" size={14} /> Address
          </label>
          <input className="input" value={address || ''} disabled readOnly />
        </div>
        <div className="ds-form-row">
          <div className="ds-field">
            <label className="ds-label">
              <Icon name="shield" size={14} /> Insurance provider
            </label>
            <input className="input" value={insuranceProvider || ''} disabled readOnly />
          </div>
          <div className="ds-field">
            <label className="ds-label">
              <Icon name="info" size={14} /> Insurance ID
            </label>
            <input className="input" value={insuranceId || ''} disabled readOnly />
          </div>
        </div>
        <p className="ds-help">
          To update any of these details, visit your{' '}
          <Icon name="settings" size={12} /> profile settings page.
        </p>
      </div>
    </Section>
  );
}