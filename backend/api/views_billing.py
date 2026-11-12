from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticatedOrReadOnly

from api.models import Bill
from api.serializers_billing import BillSerializer
from api.access import AccessMixin, AccessPermission  # Shikshya's access table


class BillViewSet(AccessMixin, viewsets.ModelViewSet):
    access_model = 'Bill'
    queryset = Bill.objects.all().order_by('-created_at')
    serializer_class = BillSerializer
    permission_classes = [AccessPermission]
    filterset_fields = ['patient', 'appointment', 'status']
    search_fields = ['status']
    ordering_fields = ['created_at', 'amount', 'due_date']