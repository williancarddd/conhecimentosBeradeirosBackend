import { Module } from '@nestjs/common';
import { PrismaService } from 'src/database/connections/prisma';
import { TextoColetadoService } from './textoColetado.service';
import { TextoColetadoController } from './textoColetado.controller';

@Module({
  controllers: [TextoColetadoController],
  providers: [TextoColetadoService, PrismaService],
})
export class TextoColetadoModule {}
