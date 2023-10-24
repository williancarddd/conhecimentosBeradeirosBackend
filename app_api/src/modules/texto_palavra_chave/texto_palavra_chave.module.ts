import { Module } from '@nestjs/common';
import { TextoPalavraChaveController } from './texto_palavra_chave.controller';
import { TextoPalavraChaveService } from './texto_palavra_chave.service';
import { PrismaService } from 'src/database/connections/prisma';

@Module({
  controllers: [TextoPalavraChaveController],
  providers: [TextoPalavraChaveService, PrismaService],
})
export class TextoPalavraChaveModule {}
