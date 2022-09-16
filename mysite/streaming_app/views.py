from django.shortcuts import render
from django.http import JsonResponse
from .models import Media, Category

# Create your views here.

def index(request):
    return render(request, "streaming_app/index.html")

def content(request):
    """
    Items to show to the user
    """
    data = []
    for category in Category.objects.all():
        media = category.media_set.all()
        items = []
        for m in media:
            items.append({
                "id": m.id,
                "thumbnailUrl": m.thumbnail.url
            })
        data.append({
            "title": category.name,
            "id": category.id,
            "items": items
        })
    res = JsonResponse({"sections": data})
    return res

def category(request, category_id):
    """
    Get all the items in given category
    """
    c = Category.objects.get(pk = category_id)
    media = c.media_set.all()
    data = []
    for m in media:
        data.append({
            "id": m.id,
            "thumbnailUrl": m.thumbnail.url
        })

    return JsonResponse({
        "category": c.name,
        "id": c.id,
        "items": data
    })

def media(request, media_id):
    return JsonResponse({

    })