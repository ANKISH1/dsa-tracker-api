from django.shortcuts import render
from .serializer import RegisterSerializer
from rest_framework import generics
from rest_framework.permissions import AllowAny
from .models import User
from tracker.models import UserStats
from django.db import transaction
# Create your views here.

class RegisterAPIView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = RegisterSerializer
    permission_classes = [AllowAny]

    def perform_create(self, serializer):
        with transaction.atomic():
            user = serializer.save()
            UserStats.objects.create(user=user)


