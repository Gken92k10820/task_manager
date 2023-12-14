from django.shortcuts import render


# Viewsets class provides the implementation for CRUD operations by default, what we had to do was specify the serializer class and the query set.

from rest_framework import viewsets          
from .serializers import TodoSerializer      
from .models import Todo 
from django.views.generic import TemplateView                    


class TodoView(viewsets.ModelViewSet):       
    serializer_class = TodoSerializer          
    queryset = Todo.objects.all() 
    
class ReactAppView(TemplateView):
    template_name = 'index.html'

    def get(self, request, *args, **kwargs):
        # Override the get method to load the index.html file from the frontend/build directory
        self.template_name = 'frontend/build/index.html'
        return super().get(request, *args, **kwargs)             
