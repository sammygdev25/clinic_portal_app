from rest_framework import viewsets, permissions
from rest_framework.pagination import PageNumberPagination
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import filters as drf_filters

from api.models import DoctorSchedule, Appointment
from api.serializers_scheduling import DoctorScheduleSerializer, AppointmentSerializer
from api.access import AccessMixin, AccessPermission  # Shikshya's access table


class StandardResultsSetPagination(PageNumberPagination):
    page_size = 20
    page_size_query_param = 'page_size'
    max_page_size = 100


class DoctorScheduleViewSet(AccessMixin, viewsets.ModelViewSet):
    access_model = 'DoctorSchedule'
    queryset = DoctorSchedule.objects.all().order_by('day_of_week', 'start_time')
    serializer_class = DoctorScheduleSerializer
    permission_classes = [AccessPermission]
    pagination_class = StandardResultsSetPagination
    filter_backends = [DjangoFilterBackend, drf_filters.SearchFilter, drf_filters.OrderingFilter]
    filterset_fields = ['doctor', 'day_of_week']
    search_fields = ['doctor__specialty', 'doctor__user__first_name', 'doctor__user__last_name']
    ordering_fields = ['day_of_week', 'start_time', 'created_at']


class AppointmentViewSet(AccessMixin, viewsets.ModelViewSet):
    access_model = 'Appointment'
    queryset = Appointment.objects.all().order_by('-scheduled_at')
    serializer_class = AppointmentSerializer
    permission_classes = [AccessPermission]
    pagination_class = StandardResultsSetPagination
    filter_backends = [DjangoFilterBackend, drf_filters.SearchFilter, drf_filters.OrderingFilter]
    filterset_fields = ['patient', 'doctor', 'status']
    search_fields = ['reason', 'patient__user__first_name', 'patient__user__last_name',
                      'doctor__user__first_name', 'doctor__user__last_name', 'doctor__specialty']
    ordering_fields = ['scheduled_at', 'created_at', 'status']

    def get_queryset(self):
        queryset = super().get_queryset()
        user = self.request.user
        if user.is_authenticated:
            if hasattr(user, 'patient_profile'):
                queryset = queryset.filter(patient=user.patient_profile)
            elif hasattr(user, 'doctor_profile'):
                queryset = queryset.filter(doctor=user.doctor_profile)
        return queryset

    def perform_create(self, serializer):
        user = self.request.user
        if hasattr(user, 'patient_profile'):
            serializer.save(patient=user.patient_profile)
        else:
            serializer.save()