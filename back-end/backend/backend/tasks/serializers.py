
from rest_framework import serializers
from rest_framework.decorators import api_view
from .models import Task

class TaskSerializer(serializers.ModelSerializer):
    class Meta:
        model = Task
        fields = ['id', 'name', 'description', 'status', 'priority']