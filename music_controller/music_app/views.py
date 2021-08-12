from django.shortcuts import render
from rest_framework import generics
from .serializers import RoomSerializer
from .models import Room

## returns all of the current rooms
class RoomView(generics.CreateAPIView):
    queryset = Room.objects.all()
    serializer_class = RoomSerializer


