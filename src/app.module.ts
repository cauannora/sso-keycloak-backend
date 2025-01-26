import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthGuard, KeycloakConnectModule, PolicyEnforcementMode, ResourceGuard, RoleGuard, TokenValidation } from 'nest-keycloak-connect';
import { APP_GUARD } from '@nestjs/core';
import { AuthModule } from './auth/auth.module';
import { TaskModule } from './task/task.module';
import { HealthModule } from './health/health.module';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [
    ConfigModule.forRoot(),
    HttpModule,
    HealthModule,
    KeycloakConnectModule.register({
      authServerUrl: process.env.KEYCLOAK_URL,
      realm: process.env.KEYCLOAK_REALM,
      clientId: process.env.KEYCLOAK_CLIENT_ID,
      secret: process.env.KEYCLOAK_SECRET,
      policyEnforcement: PolicyEnforcementMode.PERMISSIVE,
      tokenValidation: TokenValidation.ONLINE,
    }),
    AuthModule,
    TaskModule
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
    {
      provide: APP_GUARD,
      useClass: ResourceGuard,
    },
    {
      provide: APP_GUARD,
      useClass: RoleGuard,
    },
  ],
})
export class AppModule {}
