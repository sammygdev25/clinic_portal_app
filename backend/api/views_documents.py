from rest_framework import viewsets, permissions
from rest_framework.parsers import MultiPartParser, FormParser, JSONParser
from api.models import Document
from api.serializers_documents import DocumentSerializer
from api.access import AccessMixin, AccessPermission  # Shikshya's access table


class DocumentViewSet(AccessMixin, viewsets.ModelViewSet):
    access_model = 'Document'
    queryset = Document.objects.all().order_by('-created_at')
    serializer_class = DocumentSerializer
    permission_classes = [AccessPermission]
    parser_classes = [MultiPartParser, FormParser, JSONParser]
    filterset_fields = ['patient', 'document_type']
    search_fields = ['description', 'document_type']
    ordering_fields = ['created_at', 'updated_at']

    def get_queryset(self):
        queryset = Document.objects.all().order_by('-created_at')
        user = self.request.user
        if user.is_authenticated and hasattr(user, 'patient_profile'):
            return queryset.filter(patient=user.patient_profile)
        return queryset

    def perform_create(self, serializer):
        patient_profile = getattr(self.request.user, 'patient_profile', None)
        serializer.save(patient=patient_profile)