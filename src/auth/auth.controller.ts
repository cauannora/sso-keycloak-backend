import { Body, Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import { Public } from 'nest-keycloak-connect';
import { AuthGuard } from '@nestjs/passport';

@Controller('auth')
export class AuthController {
    @Post()
    @Public()
    @UseGuards(AuthGuard('keycloak'))
    login(@Request() req: any): any {
      return {
        message: 'Login bem-sucedido!',
        accessToken: req.user.accessToken,
        refreshToken: req.user.refreshToken,
        expiresIn: req.user.expiresIn,
      };
    }
}
