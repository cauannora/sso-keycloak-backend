import { Controller, Get } from '@nestjs/common';
import { DiskHealthIndicator, HealthCheck, HealthCheckService, HttpHealthIndicator, MemoryHealthIndicator } from '@nestjs/terminus';
import { Public } from 'nest-keycloak-connect';

@Controller('health')
export class HealthController {
  constructor(
    private health: HealthCheckService,
    private http: HttpHealthIndicator,
    private disk: DiskHealthIndicator,
    private memory: MemoryHealthIndicator,
  ) {}

  @Get('live')
  @Public()
  @HealthCheck()
  checkLiveness() {
    return this.health.check([
      // Verifica se o Keycloak está disponível
      () => this.http.pingCheck('keycloak', process.env.KEYCLOAK_HEALTH_URL),
      
      // Verifica espaço em disco (mínimo 50MB disponíveis)
      async () =>
        this.disk.checkStorage('disk', {
          thresholdPercent: 0.9,
          path: '/',
        }),

      // Verifica se a memória heap disponível é suficiente (mínimo 150MB)
      async () => this.memory.checkHeap('memory_heap', 150 * 1024 * 1024),

      // Verifica memória do processo (mínimo 150MB livres)
      async () => this.memory.checkRSS('memory_rss', 150 * 1024 * 1024),
    ]);
  }

  @Get('ready')
  @Public()
  @HealthCheck()
  keycloakCheck() {
    return this.health.check([
      // Verifica se o Keycloak está disponível
      () => this.http.pingCheck('keycloak', process.env.KEYCLOAK_HEALTH_URL),

      // Verifica espaço em disco (mínimo 50MB disponíveis)
      async () =>
        this.disk.checkStorage('disk', {
          thresholdPercent: 0.9,
          path: '/',
        }),

      // Verifica se a memória heap disponível é suficiente (mínimo 150MB)
      async () => this.memory.checkHeap('memory_heap', 150 * 1024 * 1024),

      // Verifica memória do processo (mínimo 150MB livres)
      async () => this.memory.checkRSS('memory_rss', 150 * 1024 * 1024),
    ]);
  }
}
