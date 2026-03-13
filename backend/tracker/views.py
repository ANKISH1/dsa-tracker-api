from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status, generics
from.models import Problem, UserProblem, UserStats
from .serializers import ProblemSerializer, UserProblemSerializer
from rest_framework.permissions import IsAdminUser, AllowAny, IsAuthenticated
from rest_framework.exceptions import ValidationError
from .pagination import UserProblemPagination
from django.db import transaction
from django.db.models import F
# Create your views here.

# class ProblemListAPIView(APIView):

#     def get(self, request):
#         problems= Problem.objects.all()
#         serializer = ProblemSerializer(problems, many = True)
#         return Response(serializer.data, status = status.HTTP_200_OK)
    
#     def post(self, request):
#         serializer = ProblemSerializer(data = request.data)
#         if serializer.is_valid():
#             serializer.save()
#             return Response(serializer.data, status = status.HTTP_201_CREATED)
#         return Response(serializer.errors, status = status.HTTP_400_BAD_REQUEST)

class ProblemListCreateAPIView(generics.ListCreateAPIView):

    def get_queryset(self):
        from django.core.cache import cache

        problems = cache.get("problems_list")
        if not problems:
            problems = Problem.objects.all()
            cache.set("problems_list", problems, timeout = 300)

        return problems
    
    def perform_create(self, serializer):
        from django.core.cache import cache
        serializer.save()
        cache.delete("problems_list")
    
    serializer_class = ProblemSerializer

    def get_permissions(self):
        if self.request.method == "POST":
            return [IsAdminUser()]
        return [AllowAny()]
    

    

class UserProblemListCreateAPIView(generics.ListCreateAPIView):
    serializer_class = UserProblemSerializer
    permission_classes = [IsAuthenticated]
    pagination_class = UserProblemPagination

    def get_queryset(self):
        queryset = UserProblem.objects.filter(user = self.request.user).select_related("problem")
        status = self.request.query_params.get("status")
        difficulty = self.request.query_params.get("difficulty")
        if difficulty:
            valid_difficulties = [choice[0] for choice in Problem.Difficulty.choices]

            if difficulty not in valid_difficulties:
                raise ValidationError({"difficulty": "Invalid difficulty value."})
            queryset = queryset.filter(problem__difficulty = difficulty)

        if status:
            valid_statuses = [choice[0] for choice in UserProblem.Status.choices]

            if status not in valid_statuses:
                raise ValidationError({"status": "Invalid status value."})
            
            queryset = queryset.filter(status=status)

        return queryset


    
    def perform_create(self, serializer):
        with transaction.atomic():
            serializer.save(user = self.request.user)
            userstats = UserStats.objects.get(user = self.request.user)
            userstats.problems_attempted = F('problems_attempted')+1
            userstats.save()
        

        
    

class UserProblemDetailView(generics.RetrieveDestroyAPIView):
    serializer_class = UserProblemSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        queryset = UserProblem.objects.filter(user = self.request.user).select_related("problem")

        return queryset    

