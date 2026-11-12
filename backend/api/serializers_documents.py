from rest_framework import serializers
from api.models import Document, PatientProfile
from api.picture_field import PictureField, StoredFileField


class PatientProfileMiniSerializer(serializers.ModelSerializer):
    username = serializers.CharField(source='user.username', read_only=True)

    class Meta:
        model = PatientProfile
        fields = ['id', 'username', 'phone', 'insurance_provider', 'insurance_id']


class DocumentSerializer(serializers.ModelSerializer):
    file = StoredFileField(required=False)
    patient_name = serializers.CharField(source='patient.user.username', read_only=True)
    document_type_display = serializers.CharField(source='get_document_type_display', read_only=True)

    class Meta:
        model = Document
        fields = [
            'id', 'patient', 'patient_name', 'document_type', 'document_type_display',
            'file', 'description', 'created_at', 'updated_at',
        ]
        read_only_fields = ['id', 'patient_name', 'document_type_display', 'created_at', 'updated_at']