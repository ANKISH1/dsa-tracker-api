from rest_framework.pagination import PageNumberPagination, CursorPagination

# class UserProblemPagination(PageNumberPagination):
#     page_size = 5
#     page_size_query_param = "page_size"
#     max_page_size = 50

class UserProblemPagination(CursorPagination):
    page_size = 5
    ordering = "id"