from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticatedOrReadOnly

from api.models import DoctorProfile, PatientProfile
from api.serializers_core import DoctorProfileSerializer, PatientProfileSerializer
from api.access import AccessMixin, AccessPermission  # Shikshya's access table


class DoctorProfileViewSet(AccessMixin, viewsets.ModelViewSet):
    access_model = 'DoctorProfile'
    queryset = DoctorProfile.objects.all().order_by('specialty')
    serializer_class = DoctorProfileSerializer
    permission_classes = [AccessPermission]
    filterset_fields = ['user', 'specialty']
    search_fields = ['specialty', 'bio']
    ordering_fields = ['specialty', 'years_experience', 'created_at']

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)


class PatientProfileViewSet(AccessMixin, viewsets.ModelViewSet):
    access_model = 'PatientProfile'
    queryset = PatientProfile.objects.all().order_by('-created_at')
    serializer_class = PatientProfileSerializer
    permission_classes = [AccessPermission]
    filterset_fields = ['user', 'insurance_provider']
    search_fields = ['phone', 'address', 'insurance_provider', 'insurance_id']
    ordering_fields = ['created_at', 'updated_at']

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)