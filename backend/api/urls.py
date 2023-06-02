from django.urls import path
from . import views
from rest_framework_simplejwt import views as jwt_views

urlpatterns = [
    path('token/', 
        jwt_views.TokenObtainPairView.as_view(), 
        name ='token_obtain_pair'),
    path('token/refresh/', 
        jwt_views.TokenRefreshView.as_view(), 
        name ='token_refresh'),
    path('login/', views.login, name = 'login'),
    path('posts/', views.getPosts, name = 'posts'),
    path('post/create/', views.createPost, name = 'create-post'),
    path('post/<str:pk>/update/', views.updatePost, name = 'update-post'),
    path('post/<str:pk>/delete/', views.deletePost, name = 'delete-post'),
    path('post/<str:pk>/', views.getPost, name = 'post'),

]