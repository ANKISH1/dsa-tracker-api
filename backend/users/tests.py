from django.test import TestCase
from django.urls import reverse
from rest_framework.test import APIClient
from django.contrib.auth import get_user_model
from tracker.models import UserStats
# Create your tests here.

class RegisterAPIViewTest(TestCase):
    def setUp(self):
        self.client = APIClient()
        self.url =reverse("register")

    def test_register_creates_user_and_stats(self):
        data = {
            "username":"testuser",
            "password":"testpass123",
            "email":"test@test.com"
        }

        response = self.client.post(self.url,data)

        self.assertEqual(response.status_code,201)
        User = get_user_model()
        user = User.objects.get(username = "testuser")
        self.assertTrue(User.objects.filter(username ="testuser").exists())
        self.assertTrue(UserStats.objects.filter(user = user).exists())

    def test_duplicate_username_fails(self):
        data = {
            "username":"testuser",
            "password":"testpassword",
            "email":"testemail@test.com"
        }
        response = self.client.post(self.url,data)
        self.assertEqual(response.status_code, 201)

        response = self.client.post(self.url,data)
        self.assertEqual(response.status_code,400 )


