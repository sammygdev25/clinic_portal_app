"""
Models for clinic_portal_app — auto-generated from ProjectContract.
DO NOT EDIT — regenerate from contract if changes needed.
"""
from django.db import models
from django.contrib.auth.models import User
from django.conf import settings


class DoctorProfile(models.Model):
    user = models.OneToOneField(to=settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='doctor_profile')
    specialty = models.CharField(max_length=150)
    bio = models.TextField(blank=True)
    photo = models.ImageField(upload_to='doctor_photos/', blank=True, null=True)
    years_experience = models.IntegerField(default=0)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['specialty']

    def __str__(self):
        return str(self.specialty)


class PatientProfile(models.Model):
    user = models.OneToOneField(to=settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='patient_profile')
    date_of_birth = models.DateField(null=True, blank=True)
    phone = models.CharField(max_length=20, blank=True)
    address = models.CharField(max_length=255, blank=True)
    insurance_provider = models.CharField(max_length=150, blank=True)
    insurance_id = models.CharField(max_length=100, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['-created_at']

    def __str__(self):
        return str(self.phone)


class Service(models.Model):
    name = models.CharField(max_length=150)
    description = models.TextField(blank=True)
    icon = models.CharField(max_length=50, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['name']

    def __str__(self):
        return str(self.name)


class ClinicHours(models.Model):
    day_of_week = models.CharField(max_length=10, choices=[['monday', 'Monday'], ['tuesday', 'Tuesday'], ['wednesday', 'Wednesday'], ['thursday', 'Thursday'], ['friday', 'Friday'], ['saturday', 'Saturday'], ['sunday', 'Sunday']])
    open_time = models.TimeField(null=True, blank=True)
    close_time = models.TimeField(null=True, blank=True)
    is_closed = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['id']

    def __str__(self):
        return str(self.day_of_week)


class DoctorSchedule(models.Model):
    doctor = models.ForeignKey(to='DoctorProfile', on_delete=models.CASCADE, related_name='schedules')
    day_of_week = models.CharField(max_length=10, choices=[['monday', 'Monday'], ['tuesday', 'Tuesday'], ['wednesday', 'Wednesday'], ['thursday', 'Thursday'], ['friday', 'Friday'], ['saturday', 'Saturday'], ['sunday', 'Sunday']])
    start_time = models.TimeField()
    end_time = models.TimeField()
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['day_of_week', 'start_time']

    def __str__(self):
        return str(self.doctor)


class Appointment(models.Model):
    patient = models.ForeignKey(to='PatientProfile', on_delete=models.CASCADE, related_name='appointments')
    doctor = models.ForeignKey(to='DoctorProfile', on_delete=models.CASCADE, related_name='appointments')
    scheduled_at = models.DateTimeField()
    status = models.CharField(max_length=20, choices=[['scheduled', 'Scheduled'], ['checked_in', 'Checked In'], ['completed', 'Completed'], ['cancelled', 'Cancelled']], default='scheduled')
    reason = models.TextField(blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['-scheduled_at']

    def __str__(self):
        return str(self.patient)


class VisitNote(models.Model):
    appointment = models.OneToOneField(to='Appointment', on_delete=models.CASCADE, related_name='visit_note')
    doctor = models.ForeignKey(to='DoctorProfile', on_delete=models.CASCADE, related_name='visit_notes')
    patient = models.ForeignKey(to='PatientProfile', on_delete=models.CASCADE, related_name='visit_notes')
    diagnosis = models.CharField(max_length=255, blank=True)
    content = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['-created_at']

    def __str__(self):
        return str(self.appointment)


class Prescription(models.Model):
    appointment = models.ForeignKey(to='Appointment', on_delete=models.CASCADE, related_name='prescriptions')
    doctor = models.ForeignKey(to='DoctorProfile', on_delete=models.CASCADE, related_name='prescriptions')
    patient = models.ForeignKey(to='PatientProfile', on_delete=models.CASCADE, related_name='prescriptions')
    medication = models.CharField(max_length=200)
    dosage = models.CharField(max_length=100)
    instructions = models.TextField(blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['-created_at']

    def __str__(self):
        return str(self.medication)


class Bill(models.Model):
    patient = models.ForeignKey(to='PatientProfile', on_delete=models.CASCADE, related_name='bills')
    appointment = models.ForeignKey(to='Appointment', on_delete=models.CASCADE, related_name='bills')
    amount = models.DecimalField(max_digits=8, decimal_places=2)
    status = models.CharField(max_length=20, choices=[['unpaid', 'Unpaid'], ['paid', 'Paid'], ['overdue', 'Overdue']], default='unpaid')
    due_date = models.DateField(null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['-created_at']

    def __str__(self):
        return str(self.patient)


class Document(models.Model):
    patient = models.ForeignKey(to='PatientProfile', on_delete=models.CASCADE, related_name='documents')
    document_type = models.CharField(max_length=20, choices=[['insurance_card', 'Insurance Card'], ['lab_result', 'Lab Result'], ['other', 'Other']], default='other')
    file = models.FileField(upload_to='patient_documents/')
    description = models.CharField(max_length=255, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['-created_at']

    def __str__(self):
        return str(self.document_type)

