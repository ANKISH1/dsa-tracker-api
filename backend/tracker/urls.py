from django.urls import path
from .views import ProblemListCreateAPIView,UserProblemListCreateAPIView, UserProblemDetailView

urlpatterns = [
    path('problems/', ProblemListCreateAPIView.as_view(), name='problem-list'),
    path('users-problems/', UserProblemListCreateAPIView.as_view(),name = 'user-problem-list'),
    path('users-problems/<int:pk>/', UserProblemDetailView.as_view(), name = 'user-problem-detail'),
]