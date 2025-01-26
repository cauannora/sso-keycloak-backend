import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class KeycloakStrategy extends PassportStrategy(Strategy, 'keycloak') {
  constructor() {
    super({
      usernameField: 'username', // Campo esperado no body para o nome do usuário
      passwordField: 'password', // Campo esperado no body para a senha
    });
  }

  async validate(username: string, password: string): Promise<any> {
    const keycloakUrl = `${process.env.KEYCLOAK_URL}/realms/master/protocol/openid-connect/token`;

    try {
      // Faz a chamada à API do Keycloak para autenticar o usuário
      const response = await axios.post(
        keycloakUrl,
        new URLSearchParams({
          client_id: process.env.KEYCLOAK_CLIENT_ID,
          client_secret: process.env.KEYCLOAK_SECRET,
          username,
          password,
          grant_type: 'password',
        }),
        {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
        },
      );

      const { access_token, refresh_token, expires_in } = response.data;

      // Retorna o token e dados relevantes
      return {
        accessToken: access_token,
        refreshToken: refresh_token,
        expiresIn: expires_in,
      };
    } catch (error) {
      throw new Error('Usuário ou senha inválidos.');
    }
  }
}