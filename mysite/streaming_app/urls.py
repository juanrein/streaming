from django.urls import path

from . import views

app_name = "streaming_app"

urlpatterns = [
    path("", views.index, name="index"),
    path("category", views.index),
    path("media", views.index),
    path("episode", views.index),
    path("watchlist/", views.index),

    path("api/content/", views.content, name="content"),
    path("api/category/<int:category_id>/", views.category, name="category"),
    path("api/media/<int:media_id>/", views.media, name="media"),
    path("api/episode/<int:episode_id>/", views.episode, name="episode"),
    path("api/login/", views.loginRoute, name="login"),
    path("api/logout/", views.logoutRoute, name="logout"),
    path("api/register/", views.register, name="register"),
    path("api/favorite/", views.favorite, name="favorite"),
    path("api/delete_favorite/<int:media_id>/", views.delete_favorite, name="delete_favorite"),
    path("api/watchlist/", views.watchlist, name="watchlist"),
    path("api/userinfo/", views.userInfo, name="userinfo"),
    path("api/search/", views.search, name="search"),
]