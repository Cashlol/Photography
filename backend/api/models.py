from django.db import models

# Create your models here.    
class Post(models.Model):
    post_title = models.CharField(max_length=255, blank=True, default="")
    post_caption = models.TextField(blank=True, null= True)
    date_uploaded = models.DateTimeField(auto_now_add = True)

    def __str__(self):
        return self.post_title
    
class Photo(models.Model):
    post = models.ForeignKey(Post, on_delete = models.CASCADE, related_name='post_photo', null=True,blank=True)
    image = models.ImageField(upload_to = 'photo_src', null = False, blank = False)
    
    def __str__(self):
        return self.image
