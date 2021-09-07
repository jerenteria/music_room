from django.urls import path
from .views import index

app_name = 'front_end'

urlpatterns = [
    path('', index, name=''),
    path('join', index),
    path('create', index),
    path('room/<str:roomCode>', index),
]