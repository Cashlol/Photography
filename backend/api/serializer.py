from rest_framework import serializers
from .models import Photo, Post
from django.core.files.storage import default_storage

class PhotoSerializer(serializers.ModelSerializer):

    class Meta:
        model = Photo
        fields = '__all__'

class PostSerializer(serializers.ModelSerializer):

    # image = serializers.ListField(
    #     child = serializers.ImageField(allow_empty_file = False, use_url = False), write_only = True
    # )

    post_photo = PhotoSerializer(many = True)
    
    class Meta:
        model = Post
        # photo_src = serializers.ImageField(required = False, allow_empty_file=True, use_url=True)
        fields = '__all__'

    #overwrite the create function by removing photo_src and create subsequent object for each photo_src
    def create(self, validated_data):
        print('Here')
        photos_data = validated_data.pop('post_photo')
        post = Post.objects.create(**validated_data)
        for photo in photos_data:
            Photo.objects.create(post=post, **photo)
        return post
    
    def update(self, instance, validated_data):

        instance.post_title = validated_data.get('post_title', instance.post_title)
        instance.post_caption = validated_data.get('post_caption', instance.post_caption)
        instance.save()
        
        photos_data = validated_data.pop("post_photo")

        photos_with_same_post_instance = Photo.objects.filter(post=instance.pk).values_list('id',flat= True)

        photos_id_pool = []

        for photo in photos_data:
            if "id" in photo.keys():
                if Photo.objects.filter(id=photo['id']).exists():
                    photo_instance = Photo.objects.get(id=photo['id'])
                    photo_instance.image = photo.get('image', photo_instance.image)
                    photo_instance.save()
                    photos_id_pool.append(photo_instance.id)
                else:
                    continue
            else:
                photos_instance = Photo.objects.create(post=instance, **photo)
                photos_id_pool.append(photos_instance.id)
        
        for photo_id in photos_with_same_post_instance:
            if photo_id not in photos_id_pool:
                stupid = Photo.objects.filter(pk=photo_id)
                for photo in stupid:
                    path = photo.image.name
                    if(path):
                        default_storage.delete(path)
                stupid.delete()
        return instance

        

        

    