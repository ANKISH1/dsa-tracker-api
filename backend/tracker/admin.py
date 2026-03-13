from django.contrib import admin
from .models import UserProblem, Problem

# Register your models here.
admin.site.register(UserProblem)
admin.site.register(Problem)