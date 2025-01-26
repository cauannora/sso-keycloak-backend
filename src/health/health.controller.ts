import { Controller, Get } from '@nestjs/common';
import { HealthCheck, HealthCheckService, HttpHealthIndicator } from '@nestjs/terminus';
import { Public } from 'nest-keycloak-connect';

@Controller('health')
export class HealthController {
  constructor(
    private health: HealthCheckService,
    private http: HttpHealthIndicator,
  ) {}

  @Get()
  @Public()
  @HealthCheck()
  keycloakCheck() {
    return this.health.check([
      () => this.http.pingCheck('keycloak', process.env.KEYCLOAK_HEALTH_URL)
    ]);
  }

}
