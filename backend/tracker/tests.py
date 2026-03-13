from django.test import TestCase
from django.urls import reverse
from rest_framework.test import APIClient, force_authenticate
from .models import UserProblem, Problem, UserStats
from django.contrib.auth import get_user_model

# Create your tests here.
class UserProblemListCreateAPIViewTest(TestCase):
    def setUp(self):
        self.client = APIClient()
        self.url = reverse('user-problem-list')
        User = get_user_model()
        self.user = User.objects.create_user(username = "testuser", password = "testpassword")
        self.client.force_authenticate(user = self.user)
        self.problem = Problem.objects.create(title = "Two Sum", difficulty = "EASY")
        self.userstats = UserStats.objects.create(user = self.user, problems_attempted = 1)


    def test_userproblem_record_created(self):
        data = {
            "problem_id":self.problem.id,
            "status":"SOLVED"
        }
        response = self.client.post(self.url, data)
        self.assertEqual(response.status_code, 201)
        self.assertTrue(UserProblem.objects.filter(user = self.user, problem =self.problem).exists())

