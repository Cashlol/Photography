from django.shortcuts import render
from django.contrib.auth import authenticate, login
from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework import status
from .models import Photo, Post
from .serializer import PostSerializer, PhotoSerializer
from django.core.files.storage import default_storage

# Create your views here.
@api_view(['POST'])
def login(request):
    if request.method == 'POST':
        username = request.POST.get("username")
        password = request.POST.get("pass")
        user = authenticate(request, username = username, password = password)
        if user is None:
            return Response({"message":"Invalid credentials","user": request.data})
        return Response({"message":"Login Successful","user": request.data})
    
#return all data that is stored in the database
@api_view(['GET'])
def getPosts(request):
    post = Post.objects.all().order_by('-date_uploaded')
    serializer = PostSerializer(post, many = True)
    return Response(serializer.data,status=status.HTTP_200_OK)

#return a specific data detail based on the given id 
@api_view(['GET'])
def getPost(request,pk):
    post = Post.objects.get(id=pk)
    serializer = PostSerializer(post, many = False)
    return Response(serializer.data,status=status.HTTP_200_OK)

# creates new data and post it to the database
@api_view(['POST'])
def createPost(request):
    serializer = PostSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()    
        return Response(serializer.data,status=status.HTTP_200_OK)
    return Response(serializer.errors,status=status.HTTP_400_BAD_REQUEST)


#updates the existing data based on id given and return response 200 for successful request
@api_view(['PUT'])
def updatePost(request,pk):
    post = Post.objects.get(id=pk)
    serializer = PostSerializer(instance = post, data = request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data,status=status.HTTP_200_OK)
    else: 
        return Response(serializer.errors)

#deletes data from the database and media that was stored in the directory
@api_view(['DELETE'])
def deletePost(request,pk):
    post = Post.objects.get(id=pk)
    path = Post.photo_src.name
    if(path):
        default_storage.delete(path)
    post.delete()
    return Response('Photo is deleted!',status=status.HTTP_200_OK)