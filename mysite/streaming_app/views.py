from django.shortcuts import render
from django.http import JsonResponse

# Create your views here.

def index(request):
    return render(request, "streaming_app/index.html")

def content(request):
    data = {
        "sections": [
            {
                "id": 0,
                "title": "Section1",
                "items": [
                    {
                        "id": 0,
                        "thumbnailUrl": "/static/streaming_app/images/media0.jpg"
                    },
                    {
                        "id": 1,
                        "thumbnailUrl": "/static/streaming_app/images/media1.jpg"
                    },
                    {
                        "id": 2,
                        "thumbnailUrl": "/static/streaming_app/images/media2.jpg"
                    },
                    {
                        "id": 3,
                        "thumbnailUrl": "/static/streaming_app/images/media3.jpg"
                    },
                    {
                        "id": 4,
                        "thumbnailUrl": "/static/streaming_app/images/media4.jpg"
                    },
                ]
            },
            {
                "id": 1,
                "title": "Section2",
                "items": [
                    {
                        "id": 5,
                        "thumbnailUrl": "/static/streaming_app/images/media5.jpg"
                    },
                    {
                        "id": 6,
                        "thumbnailUrl": "/static/streaming_app/images/media6.jpg"
                    },
                    {
                        "id": 7,
                        "thumbnailUrl": "/static/streaming_app/images/media7.jpg"
                    },
                    {
                        "id": 8,
                        "thumbnailUrl": "/static/streaming_app/images/media8.jpg"
                    },
                    {
                        "id": 9,
                        "thumbnailUrl": "/static/streaming_app/images/media9.jpg"
                    },
                    {
                        "id": 10,
                        "thumbnailUrl": "/static/streaming_app/images/media10.jpg"
                    },
                    {
                        "id": 11,
                        "thumbnailUrl": "/static/streaming_app/images/media11.jpg"
                    },
                ]
            },
        ]
    }
    return JsonResponse(data)