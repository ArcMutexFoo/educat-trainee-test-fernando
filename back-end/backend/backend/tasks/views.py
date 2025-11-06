from django.http import JsonResponse, HttpRequest
from .models import Task
from .serializers import TaskSerializer
from .repository import get_many_tasks
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status

@api_view(["GET", "POST"])
def handleTasks(request):

    if request.method == "GET":

        order_by = request.GET.get("orderBy", "id")
        direction = request.GET.get("direction", "asc")
        page = int(request.GET.get("page", 1))
        limit = int(request.GET.get("limit", 10))
        search = request.GET.get("search", "")

        if direction.lower() == 'desc':
            order_by = f'-{order_by}'

        data = get_many_tasks(page, limit, search, order_by, direction)

        # serializer = TaskSerializer(task)
        return Response(data)

    if request.method == "POST":
        serializer = TaskSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return JsonResponse(serializer.data, status=status.HTTP_201_CREATED)

@api_view(["GET", "PUT", "DELETE"])
def handleTasksById(request: HttpRequest, id):
    try:
        task = Task.objects.get(pk=id)
    except Task.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    if request.method == "GET":
        
        serializer = TaskSerializer(task)
        return Response(serializer.data)
        
    if request.method == "PUT":
        serializer = TaskSerializer(task, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    if request.method == "DELETE":
        task.delete()
        return Response(status=status.HTTP_200_OK)