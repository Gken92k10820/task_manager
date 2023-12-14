from django.urls import path, include
from .views import TodoView, ReactAppView

urlpatterns = [
    path('api/tasks/', TodoView.as_view({'get': 'list', 'post': 'create'}), name='task-list'),
    path('api/tasks/<int:pk>/', TodoView.as_view({'get': 'retrieve', 'put': 'update', 'patch': 'partial_update', 'delete': 'destroy'}), name='task-detail'),
    path('react/', ReactAppView.as_view(), name='react-app'),
]