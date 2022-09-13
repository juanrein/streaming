from django.urls import path

from . import views

app_name = "streaming_app"

urlpatterns = [
    path("", views.index, name="index"),
    path("content/", views.content, name="content")
]