from django.core.paginator import Paginator
from .models import Task
from .serializers import TaskSerializer
def get_many_tasks(page: int, limit: int, search: str, order_by: str, direction: str):
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

    return data