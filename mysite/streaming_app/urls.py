from django.urls import path

from . import views

app_name = "streaming_app"

urlpatterns = [
    path("", views.index, name="index"),
    path("content/", views.content, name="content"),
    path("category/<int:category_id>/", views.category, name="category"),
    path("media/<int:media_id>/", views.media, name="media"),
    path("episode/<int:episode_id>/", views.episode, name="episode"),
    path("login/", views.login, name="login"),
    path("logout/", views.logout, name="logout"),
    path("register/", views.register, name="register"),
    path("favorite/", views.favorite, name="favorite"),
    path("watchlist/", views.watchlist, name="watchlist")
]