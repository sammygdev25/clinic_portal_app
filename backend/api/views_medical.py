from rest_framework import viewsets, permissions
from rest_framework.permissions import IsAuthenticatedOrReadOnly
from django.db.models import Q
from api.models import VisitNote, Prescription, DoctorProfile, PatientProfile
from api.serializers_medical import VisitNoteSerializer, PrescriptionSerializer
from api.access import AccessMixin, AccessPermission  # Shikshya's access table


class IsPatientOrDoctorOfRecord(permissions.BasePermission):
    """
    Only the treating doctor or the patient themselves may view/create
    visit notes and prescriptions tied to them.
    """

    def has_object_permission(self, request, view, obj):
        user = request.user
        if not user or not user.is_authenticated:
            return False
        is_doctor = hasattr(user, 'doctor_profile') and obj.doctor_id == user.doctor_profile.id
        is_patient = hasattr(user, 'patient_profile') and obj.patient_id == user.patient_profile.id
        return is_doctor or is_patient


class VisitNoteViewSet(AccessMixin, viewsets.ModelViewSet):
    access_model = 'VisitNote'
    queryset = VisitNote.objects.all().order_by('-created_at')
    serializer_class = VisitNoteSerializer
    permission_classes = [AccessPermission]
    filterset_fields = ['appointment', 'doctor', 'patient']
    search_fields = ['diagnosis', 'content']
    ordering_fields = ['created_at', 'updated_at']

    def get_queryset(self):
        qs = VisitNote.objects.all().order_by('-created_at')
        user = self.request.user
        if not user.is_authenticated:
            return qs.none()
        doctor_profile = getattr(user, 'doctor_profile', None)
        patient_profile = getattr(user, 'patient_profile', None)
        filters = Q()
        if doctor_profile is not None:
            filters |= Q(doctor=doctor_profile)
        if patient_profile is not None:
            filters |= Q(patient=patient_profile)
        if not filters:
            return qs.none()
        return qs.filter(filters)

    def perform_create(self, serializer):
        user = self.request.user
        doctor_profile = getattr(user, 'doctor_profile', None)
        if doctor_profile is not None:
            serializer.save(doctor=doctor_profile)
        else:
            serializer.save()


class PrescriptionViewSet(AccessMixin, viewsets.ModelViewSet):
    access_model = 'Prescription'
    queryset = Prescription.objects.all().order_by('-created_at')
    serializer_class = PrescriptionSerializer
    permission_classes = [AccessPermission]
    filterset_fields = ['appointment', 'doctor', 'patient']
    search_fields = ['medication', 'dosage', 'instructions']
    ordering_fields = ['created_at', 'updated_at']

    def get_queryset(self):
        qs = Prescription.objects.all().order_by('-created_at')
        user = self.request.user
        if not user.is_authenticated:
            return qs.none()
        doctor_profile = getattr(user, 'doctor_profile', None)
        patient_profile = getattr(user, 'patient_profile', None)
        filters = Q()
        if doctor_profile is not None:
            filters |= Q(doctor=doctor_profile)
        if patient_profile is not None:
            filters |= Q(patient=patient_profile)
        if not filters:
            return qs.none()
        return qs.filter(filters)

    def perform_create(self, serializer):
        user = self.request.user
        doctor_profile = getattr(user, 'doctor_profile', None)
        if doctor_profile is not None:
            serializer.save(doctor=doctor_profile)
        else:
            serializer.save()