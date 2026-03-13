from django.db import models
from django.conf import settings

# Create your models here.
class Problem(models.Model):
    class Difficulty(models.TextChoices):
        EASY = "EASY", "Easy"
        MEDIUM = "MEDIUM", "Medium"
        HARD = "HARD", "Hard"

    title = models.CharField(max_length=225, unique=True)
    difficulty =  models.CharField(max_length=10, choices= Difficulty.choices)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.title

class UserProblem(models.Model):
    class Status(models.TextChoices):
        IN_PROGRESS =  "IN_PROGRESS", "In Progress"
        SOLVED  = "SOLVED", "Solved"
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    problem = models.ForeignKey(Problem, on_delete=models.CASCADE)
    status = models.CharField(max_length=20, choices=Status.choices, default=Status.IN_PROGRESS)
    updated_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        unique_together = ('user', 'problem')

    def __str__(self):
        return f"{self.user.username} - {self.problem.title}"    
    

class UserStats(models.Model):
    user = models.OneToOneField(settings.AUTH_USER_MODEL,on_delete=models.CASCADE )
    problems_attempted = models.IntegerField(default=0)

    




