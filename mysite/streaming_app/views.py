from django.shortcuts import render
from django.http import JsonResponse
from .models import Episode, Favorite, Media, Category, Movie, Season
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.models import User
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
    m = Media.objects.get(pk = media_id)
    if m.type == Media.MOVIE:
        movie = Movie.objects.get(media=m)
        return JsonResponse({
            "url": movie.content.url,
            "title": m.title,
            "type": "movie"
        })
        
    seasons = []

    for season in Season.objects.filter(show = m):
        episodes = []
        for episode in Episode.objects.filter(season = season):
            episodes.append({
                "number": episode.number,
                "title": episode.title,
                "id": episode.id,
                "thumbnailUrl": episode.thumbnail.url
            })
        seasons.append({
            "episodes": episodes,
            "number": season.number,
            "title": season.title,
            "id": season.id
        })

    return JsonResponse({
        "type": "series",
        "title": m.title,
        "seasons": seasons 
    })

def episode(request, episode_id):
    e = Episode.objects.get(pk = episode_id)
    return JsonResponse({
        "number": e.number,
        "title": e.title,
        "url": e.content.url
    })

def login(request):
    username = request.POST["username"]
    password = request.POST["password"]
    user = authenticate(request, username = username, password = password)
    if user is not None:
        login(request, user)
        return JsonResponse({"success": True})
    else:
        return JsonResponse({"success": False})
    
def logout(request):
    logout(request)
    return JsonResponse({"success": True})

def register(request):
    username = request.POST["username"]
    password = request.POST["password"]
    User.objects.create_user(username, email = None, password=password)
    return JsonResponse({
        "success": True
    })

def favorite(request):
    if request.user.is_authenticated:
        media_id = request.POST["id"]
        user = request.user
        media = Media.objects.get(pk = media_id)

        fav = Favorite(media = media, user = user)
        fav.save()
        
        return JsonResponse({"success": True})

    return JsonResponse({"success": False})

def watchlist(request):
    if request.user.is_authenticated:
        user = request.user
        favorites = Favorite.objects.filter(user = user)
        items = []
        for fav in favorites:
            items.append({
                "title": fav.media.title,
                "imgUrl": fav.media.thumbnail.url,
                "id": fav.media.id
            })
        return JsonResponse({"success": True, "favorites": items})
        
    res = JsonResponse({"success": False})
    res.status_code = 403
    return res