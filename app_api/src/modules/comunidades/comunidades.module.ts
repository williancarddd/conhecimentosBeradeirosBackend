import { Module } from '@nestjs/common';
import { ComunidadeController } from './comunidades.controller';
import { ComunidadeService } from './comunidades.service';
import { PrismaService } from 'src/database/connections/prisma';

@Module({
  controllers: [ComunidadeController],
  providers: [ComunidadeService, PrismaService],
})
export class CommunityModule {}
