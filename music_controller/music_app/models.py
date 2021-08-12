from django.db import models
import string
import random

def generate_unique_code():
    length = 6

    while True:
        ## generate a random code that is k length(6)  only uppercase asking characters
        code = ''.join(random.choices(string.ascii_uppercase, k=length))
        ## give all room objects and filters by code and checks if code is the same as code given
        if Room.objects.filter(code=code).count() == 0:
            break
    return code

class Room(models.Model):
    code = models.CharField(max_length=8, default="", unique=True)
    host = models.CharField(max_length=50, unique=True)
    guest_can_pause = models.BooleanField(null=False)
    votes_to_skip = models.IntegerField(null=False, default=1)
    created_at = models.DateTimeField(auto_now_add=True)


