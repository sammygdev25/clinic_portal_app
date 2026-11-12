from rest_framework import serializers
from api.models import VisitNote, Prescription, Appointment, PatientProfile, DoctorProfile
from api.picture_field import PictureField, StoredFileField


class DoctorProfileSerializer(serializers.ModelSerializer):
    photo = PictureField(required=False)
    username = serializers.CharField(source='user.username', read_only=True)

    class Meta:
        model = DoctorProfile
        fields = [
            'id', 'user', 'username', 'specialty', 'bio', 'photo',
            'years_experience', 'created_at', 'updated_at',
        ]
        read_only_fields = ['id', 'created_at', 'updated_at']


class PatientProfileSerializer(serializers.ModelSerializer):
    username = serializers.CharField(source='user.username', read_only=True)

    class Meta:
        model = PatientProfile
        fields = [
            'id', 'user', 'username', 'date_of_birth', 'phone', 'address',
            'insurance_provider', 'insurance_id', 'created_at', 'updated_at',
        ]
        read_only_fields = ['id', 'created_at', 'updated_at']


class AppointmentSerializer(serializers.ModelSerializer):
    patient_name = serializers.CharField(source='patient.user.username', read_only=True)
    doctor_name = serializers.CharField(source='doctor.user.username', read_only=True)

    class Meta:
        model = Appointment
        fields = [
            'id', 'patient', 'patient_name', 'doctor', 'doctor_name',
            'scheduled_at', 'status', 'reason', 'created_at', 'updated_at',
        ]
        read_only_fields = ['id', 'created_at', 'updated_at']


class VisitNoteSerializer(serializers.ModelSerializer):
    doctor_name = serializers.CharField(source='doctor.user.username', read_only=True)
    patient_name = serializers.CharField(source='patient.user.username', read_only=True)
    doctor_specialty = serializers.CharField(source='doctor.specialty', read_only=True)
    appointment_scheduled_at = serializers.DateTimeField(source='appointment.scheduled_at', read_only=True)

    class Meta:
        model = VisitNote
        fields = [
            'id', 'appointment', 'appointment_scheduled_at', 'doctor', 'doctor_name',
            'doctor_specialty', 'patient', 'patient_name', 'diagnosis', 'content',
            'created_at', 'updated_at',
        ]
        read_only_fields = ['id', 'created_at', 'updated_at']


class PrescriptionSerializer(serializers.ModelSerializer):
    doctor_name = serializers.CharField(source='doctor.user.username', read_only=True)
    patient_name = serializers.CharField(source='patient.user.username', read_only=True)
    appointment_scheduled_at = serializers.DateTimeField(source='appointment.scheduled_at', read_only=True)

    class Meta:
        model = Prescription
        fields = [
            'id', 'appointment', 'appointment_scheduled_at', 'doctor', 'doctor_name',
            'patient', 'patient_name', 'medication', 'dosage', 'instructions',
            'created_at', 'updated_at',
        ]
        read_only_fields = ['id', 'created_at', 'updated_at']