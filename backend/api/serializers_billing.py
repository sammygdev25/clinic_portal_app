from rest_framework import serializers
from api.models import Bill, PatientProfile, Appointment


class PatientProfileMiniSerializer(serializers.ModelSerializer):
    username = serializers.CharField(source='user.username', read_only=True)
    first_name = serializers.CharField(source='user.first_name', read_only=True)
    last_name = serializers.CharField(source='user.last_name', read_only=True)

    class Meta:
        model = PatientProfile
        fields = [
            'id', 'username', 'first_name', 'last_name', 'phone',
            'insurance_provider', 'insurance_id',
        ]
        read_only_fields = fields


class AppointmentMiniSerializer(serializers.ModelSerializer):
    class Meta:
        model = Appointment
        fields = ['id', 'scheduled_at', 'status', 'reason']
        read_only_fields = fields


class BillSerializer(serializers.ModelSerializer):
    patient_detail = PatientProfileMiniSerializer(source='patient', read_only=True)
    appointment_detail = AppointmentMiniSerializer(source='appointment', read_only=True)

    class Meta:
        model = Bill
        fields = [
            'id', 'patient', 'patient_detail', 'appointment', 'appointment_detail',
            'amount', 'status', 'due_date', 'created_at', 'updated_at',
        ]
        read_only_fields = ['id', 'created_at', 'updated_at']