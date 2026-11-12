from django.contrib.auth import get_user_model
from rest_framework import serializers

from api.models import DoctorProfile, PatientProfile
from api.picture_field import PictureField, StoredFileField

User = get_user_model()


class UserBasicSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'first_name', 'last_name']
        read_only_fields = ['id', 'username', 'email', 'first_name', 'last_name']


class DoctorProfileSerializer(serializers.ModelSerializer):
    photo = PictureField(required=False)
    user_detail = UserBasicSerializer(source='user', read_only=True)

    class Meta:
        model = DoctorProfile
        fields = [
            'id', 'user', 'user_detail', 'specialty', 'bio', 'photo',
            'years_experience', 'created_at', 'updated_at',
        ]
        read_only_fields = ['id', 'created_at', 'updated_at']


class PatientProfileSerializer(serializers.ModelSerializer):
    user_detail = UserBasicSerializer(source='user', read_only=True)

    class Meta:
        model = PatientProfile
        fields = [
            'id', 'user', 'user_detail', 'date_of_birth', 'phone', 'address',
            'insurance_provider', 'insurance_id', 'created_at', 'updated_at',
        ]
        read_only_fields = ['id', 'created_at', 'updated_at']