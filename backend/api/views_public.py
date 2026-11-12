from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticatedOrReadOnly

from api.models import Service, ClinicHours
from api.serializers_public import ServiceSerializer, ClinicHoursSerializer
from api.access import AccessMixin, AccessPermission  # Shikshya's access table


class ServiceViewSet(AccessMixin, viewsets.ModelViewSet):
    access_model = 'Service'
    queryset = Service.objects.all().order_by('name')
    serializer_class = ServiceSerializer
    permission_classes = [AccessPermission]
    filterset_fields = []
    search_fields = ['name', 'description']
    ordering_fields = ['name', 'created_at']


class ClinicHoursViewSet(AccessMixin, viewsets.ModelViewSet):
    access_model = 'ClinicHours'
    queryset = ClinicHours.objects.all().order_by('id')
    serializer_class = ClinicHoursSerializer
    permission_classes = [AccessPermission]
    filterset_fields = ['day_of_week', 'is_closed']
    search_fields = ['day_of_week']
    ordering_fields = ['id', 'day_of_week']