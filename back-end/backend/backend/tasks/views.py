from django.http import JsonResponse, HttpRequest
from django.core.paginator import Paginator
from .models import Task
from .serializers import TaskSerializer
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

        queryset = Task \
            .objects \
            .filter(name__icontains=search) \
            .order_by(order_by) \
            .all()


        paginator = Paginator(queryset, limit)
        page = paginator.get_page(page)
        serializer = TaskSerializer(page.object_list, many=True)

        data: dict[str, any] = {
            "page": page.number,
            "limit": limit,
            "total_pages": paginator.num_pages,
            "total_items": paginator.count,
            # "result": list(page.object_list.values())
            "result": serializer.data
        }

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