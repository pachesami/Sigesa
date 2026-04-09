from django.contrib.auth import authenticate
from rest_framework import serializers
from rest_framework_simplejwt.tokens import RefreshToken
from .models import Rol, Usuario, UsuarioRol


class RolSerializer(serializers.ModelSerializer):
    class Meta:
        model  = Rol
        fields = ["id_rol", "nombre"]


class UsuarioRolSerializer(serializers.ModelSerializer):
    rol = RolSerializer(source="id_rol", read_only=True)

    class Meta:
        model  = UsuarioRol
        fields = ["id_usuario_rol", "id_rol", "rol"]


class UsuarioSerializer(serializers.ModelSerializer):
    roles = UsuarioRolSerializer(many=True, read_only=True)

    class Meta:
        model  = Usuario
        fields = ["id_usuario", "username", "estado", "fecha_creacion", "is_staff", "roles"]
        read_only_fields = ["id_usuario", "fecha_creacion"]


class UsuarioCreateSerializer(serializers.ModelSerializer):
    password  = serializers.CharField(write_only=True, min_length=8)
    roles_ids = serializers.ListField(
        child=serializers.IntegerField(), write_only=True, required=False
    )

    class Meta:
        model  = Usuario
        fields = ["username", "password", "estado", "is_staff", "roles_ids"]

    def create(self, validated_data):
        roles_ids = validated_data.pop("roles_ids", [])
        usuario = Usuario.objects.create_user(**validated_data)
        for rol_id in roles_ids:
            try:
                rol = Rol.objects.get(pk=rol_id)
                UsuarioRol.objects.create(id_usuario=usuario, id_rol=rol)
            except Rol.DoesNotExist:
                pass
        return usuario


class UsuarioUpdateSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, min_length=8, required=False)

    class Meta:
        model  = Usuario
        fields = ["username", "estado", "password", "is_staff"]

    def update(self, instance, validated_data):
        password = validated_data.pop("password", None)
        for attr, value in validated_data.items():
            setattr(instance, attr, value)
        if password:
            instance.set_password(password)
        instance.save()
        return instance


class LoginSerializer(serializers.Serializer):
    username = serializers.CharField()
    password = serializers.CharField(write_only=True)

    def validate(self, data):
        user = authenticate(username=data["username"], password=data["password"])
        if not user:
            raise serializers.ValidationError("Credenciales inválidas.")
        if not user.is_active:
            raise serializers.ValidationError("Usuario inactivo.")
        refresh = RefreshToken.for_user(user)
        return {
            "access":  str(refresh.access_token),
            "refresh": str(refresh),
            "usuario": UsuarioSerializer(user).data,
        }
