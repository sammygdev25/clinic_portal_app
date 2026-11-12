from rest_framework import serializers
from api.models import DoctorSchedule, Appointment, DoctorProfile, PatientProfile, Bill
from api.picture_field import PictureField, StoredFileField


class DoctorProfileMiniSerializer(serializers.ModelSerializer):
    photo = PictureField(required=False)
    user_full_name = serializers.SerializerMethodField()

    class Meta:
        model = DoctorProfile
        fields = ['id', 'specialty', 'bio', 'photo', 'years_experience', 'user_full_name']
        read_only_fields = ['id', 'user_full_name']

    def get_user_full_name(self, obj):
        full_name = obj.user.get_full_name()
        return full_name if full_name else obj.user.username


class PatientProfileMiniSerializer(serializers.ModelSerializer):
    user_full_name = serializers.SerializerMethodField()

    class Meta:
        model = PatientProfile
        fields = ['id', 'phone', 'date_of_birth', 'user_full_name']
        read_only_fields = ['id', 'user_full_name']

    def get_user_full_name(self, obj):
        full_name = obj.user.get_full_name()
        return full_name if full_name else obj.user.username


class DoctorScheduleSerializer(serializers.ModelSerializer):
    doctor_specialty = serializers.CharField(source='doctor.specialty', read_only=True)
    doctor_name = serializers.SerializerMethodField()

    class Meta:
        model = DoctorSchedule
        fields = [
            'id', 'doctor', 'doctor_specialty', 'doctor_name',
            'day_of_week', 'start_time', 'end_time',
            'created_at', 'updated_at',
        ]
        read_only_fields = ['id', 'doctor_specialty', 'doctor_name', 'created_at', 'updated_at']

    def get_doctor_name(self, obj):
        full_name = obj.doctor.user.get_full_name()
        return full_name if full_name else obj.doctor.user.username


class AppointmentSerializer(serializers.ModelSerializer):
    patient_name = serializers.SerializerMethodField()
    doctor_name = serializers.SerializerMethodField()
    doctor_specialty = serializers.CharField(source='doctor.specialty', read_only=True)

    class Meta:
        model = Appointment
        fields = [
            'id', 'patient', 'doctor', 'patient_name', 'doctor_name', 'doctor_specialty',
            'scheduled_at', 'status', 'reason', 'created_at', 'updated_at',
        ]
        read_only_fields = ['id', 'patient_name', 'doctor_name', 'doctor_specialty', 'created_at', 'updated_at']

    def get_patient_name(self, obj):
        full_name = obj.patient.user.get_full_name()
        return full_name if full_name else obj.patient.user.username

    def get_doctor_name(self, obj):
        full_name = obj.doctor.user.get_full_name()
        return full_name if full_name else obj.doctor.user.username


class BillMiniSerializer(serializers.ModelSerializer):
    class Meta:
        model = Bill
        fields = ['id', 'patient', 'appointment', 'amount', 'status', 'due_date', 'created_at']
        read_only_fields = ['id', 'created_at']