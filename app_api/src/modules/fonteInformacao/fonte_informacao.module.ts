import { Module } from '@nestjs/common';
import { FonteInformacaoController } from './fonte_informacao.controller';
import { FonteInformacaoService } from './fonte_informacao.service';
import { PrismaService } from 'src/database/connections/prisma';

@Module({
  controllers: [FonteInformacaoController],
  providers: [FonteInformacaoService, PrismaService],
})
export class FonteInformacaoModule {}
