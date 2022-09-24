from django.shortcuts import render
from django.http import JsonResponse, HttpResponse, HttpResponseBadRequest
from .models import Episode, Favorite, Media, Category, Movie, Season
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.models import User
from django.utils.datastructures import MultiValueDictKeyError
from django.views.decorators.http import require_GET, require_POST, require_http_methods
# Create your views here.


def toAbsolute(url):
    root = "http://localhost:8000"
    return root + url

class Http401(HttpResponse):
    """
    Unauthorized
    """
    status_code = 401

@require_GET
def index(request):
    return render(request, "streaming_app/index.html")

@require_GET
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
                "thumbnailUrl": toAbsolute(m.thumbnail.url)
            })
        data.append({
            "title": category.name,
            "id": category.id,
            "items": items
        })
    res = JsonResponse({"sections": data})
    return res

@require_GET
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
            "thumbnailUrl": toAbsolute(m.thumbnail.url)
        })

    return JsonResponse({
        "category": c.name,
        "id": c.id,
        "items": data
    })

@require_GET
def media(request, media_id):
    try:
        m = Media.objects.get(pk = media_id)
    except Media.DoesNotExist:
        return HttpResponseBadRequest("media_id doesn't exist")

    isInFavorites = False
    # check if in favorites
    if request.user.is_authenticated:
        try:
            Favorite.objects.get(user = request.user, media=m)
            isInFavorites = True
        except Favorite.DoesNotExist:
            pass

    if m.type == Media.MOVIE:
        movie = Movie.objects.get(media=m)
        return JsonResponse({
            "url": toAbsolute(movie.content.url),
            "title": m.title,
            "type": "movie",
            "isFavorite": isInFavorites,
            "id": m.id
        })
        
    seasons = []

    for season in Season.objects.filter(show = m):
        episodes = []
        for episode in Episode.objects.filter(season = season):
            episodes.append({
                "number": episode.number,
                "title": episode.title,
                "id": episode.id,
                "thumbnailUrl": toAbsolute(episode.thumbnail.url)
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
        "seasons": seasons ,
        "isFavorite": isInFavorites,
        "id": m.id
    })

@require_GET
def episode(request, episode_id):
    e = Episode.objects.get(pk = episode_id)
    return JsonResponse({
        "number": e.number,
        "title": e.title,
        "url": toAbsolute(e.content.url)
    })

@require_POST
def loginRoute(request):
    try:
        username = request.POST["username"]
        password = request.POST["password"]
    except MultiValueDictKeyError:
        return HttpResponseBadRequest("please provide username and password")
    user = authenticate(request, username = username, password = password)
    if user is not None:
        login(request, user)
        return HttpResponse()
    else:
        return Http401("invalid username or password")

@require_POST
def logoutRoute(request):
    logout(request)
    return HttpResponse()

@require_POST
def register(request):
    try:
        username = request.POST["username"]
        password = request.POST["password"]
    except MultiValueDictKeyError:
        return HttpResponseBadRequest("please enter username and password")
    User.objects.create_user(username, email = None, password=password)
    return HttpResponse()

@require_POST
def favorite(request):
    if not request.user.is_authenticated:
        return Http401("Not logged in")

    user = request.user
    
    try:
        media_id = request.POST["id"]
    except MultiValueDictKeyError:
        return HttpResponseBadRequest("enter id")

    try:
        media = Media.objects.get(pk = media_id)
    except Media.DoesNotExist:
        return HttpResponseBadRequest("id doesn't exist")

    #add to favorites if isn't already
    try:
        Favorite.objects.get(media = media, user = user)
        return HttpResponseBadRequest("already in watchlist")
    except Favorite.DoesNotExist:
        fav = Favorite(media = media, user = user)
        fav.save()
        
    return HttpResponse()
    

@require_http_methods(["DELETE"])
def delete_favorite(request, media_id):
    if not request.user.is_authenticated:
        return Http401("Not logged in")

    user = request.user

    try:
        media = Media.objects.get(pk = media_id)
    except Media.DoesNotExist:
        return HttpResponseBadRequest("id doesn't exist")

    try:
        fav = Favorite.objects.get(media = media, user = user)
        fav.delete()
    except Favorite.DoesNotExist:
        return HttpResponseBadRequest("isn't in watchlist")

    return HttpResponse()

@require_GET
def watchlist(request):
    if request.user.is_authenticated:
        user = request.user
        favorites = Favorite.objects.filter(user = user)
        items = []
        for fav in favorites:
            items.append({
                "title": fav.media.title,
                "thumbnailUrl": toAbsolute(fav.media.thumbnail.url),
                "id": fav.media.id
            })
        return JsonResponse({"favorites": items})
        
    return Http401("Not logged in")

@require_GET
def userInfo(request):
    if request.user.is_authenticated:
        return JsonResponse({"username": request.user.username})

    return Http401("Not logged in")