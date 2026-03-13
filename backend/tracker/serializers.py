from rest_framework import serializers
from .models import UserProblem, Problem

class ProblemSerializer(serializers.ModelSerializer):
    class Meta:
        model = Problem
        fields= ['id', 'title', 'difficulty']

class UserProblemSerializer(serializers.ModelSerializer):
    problem = ProblemSerializer(read_only = True)
    problem_id = serializers.PrimaryKeyRelatedField(queryset = Problem.objects.all(), source = "problem", write_only = True)
    class Meta:
        model = UserProblem
        fields = ['id','problem_id','problem', 'status', 'updated_at']    


