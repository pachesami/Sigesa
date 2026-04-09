"""
URLs raíz del proyecto SIGESA.

Endpoints base: /api/v1/
"""

from django.contrib import admin
from django.urls import path, include, re_path
from django.conf import settings
from django.conf.urls.static import static
from django.http import JsonResponse

from rest_framework_simplejwt.views import TokenRefreshView
from rest_framework import permissions

# 👉 IMPORTANTE (Swagger)
from drf_yasg.views import get_schema_view
from drf_yasg import openapi

from users.views import LoginView, LogoutView


# ─── Swagger Config ─────────────────────────────────────────
schema_view = get_schema_view(
    openapi.Info(
        title="SIGESA API",
        default_version='v1',
        description="Documentación de la API SIGESA",
    ),
    public=True,
    permission_classes=[permissions.AllowAny],
)


# ─── API ROOT ───────────────────────────────────────────────
def api_root(request):
    return JsonResponse({
        "message": "API SIGESA funcionando",
        "endpoints": {
            "api_docs": "/api/docs/",
            "api_redoc": "/api/redoc/",
            "auth_login": "/api/v1/auth/login/",
            "auth_logout": "/api/v1/auth/logout/",
            "auth_refresh": "/api/v1/auth/refresh/",
            "users": "/api/v1/users/",
            "academic": "/api/v1/academic/",
            "students": "/api/v1/students/",
            "enrollment": "/api/v1/enrollment/",
            "grades": "/api/v1/grades/",
            "payments": "/api/v1/payments/"
        }
    })


API = "api/v1/"


# ─── URLS ───────────────────────────────────────────────────
urlpatterns = [
    # Admin
    path("admin/", admin.site.urls),

    # Root API
    path("api/v1/", api_root),

    # Swagger 🔥
    path("api/docs/", schema_view.with_ui('swagger', cache_timeout=0)),
    path("api/redoc/", schema_view.with_ui('redoc', cache_timeout=0)),

    # Auth
    path(f"{API}auth/login/",   LoginView.as_view(), name="login"),
    path(f"{API}auth/logout/",  LogoutView.as_view(), name="logout"),
    path(f"{API}auth/refresh/", TokenRefreshView.as_view(), name="token_refresh"),

    # Módulos
    path(f"{API}users/",      include("users.urls")),
    path(f"{API}academic/",   include("academic.urls")),
    path(f"{API}students/",   include("students.urls")),
    path(f"{API}enrollment/", include("enrollment.urls")),
    path(f"{API}grades/",     include("grades.urls")),
    path(f"{API}payments/",   include("payments.urls")),
]


# Media en desarrollo
if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
