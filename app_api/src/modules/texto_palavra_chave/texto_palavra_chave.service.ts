import { Injectable } from '@nestjs/common';
import { TextoPalavraChave, Prisma } from '@prisma/client';
import { PrismaService } from 'src/database/connections/prisma';

@Injectable()
export class TextoPalavraChaveService {
  constructor(private prisma: PrismaService) {}

  async criarTextoPalavraChave(
    data: Prisma.TextoPalavraChaveCreateInput,
  ): Promise<TextoPalavraChave> {
    return this.prisma.textoPalavraChave.create({ data });
  }

  async buscarTextoPalavraChavePorId(
    id: number,
  ): Promise<TextoPalavraChave | null> {
    return this.prisma.textoPalavraChave.findUnique({ where: { id } });
  }

  async listarTextosPalavrasChave(): Promise<TextoPalavraChave[]> {
    return this.prisma.textoPalavraChave.findMany();
  }

  async atualizarTextoPalavraChave(
    id: number,
    data: Prisma.TextoPalavraChaveUpdateInput,
  ): Promise<TextoPalavraChave> {
    return this.prisma.textoPalavraChave.update({
      where: { id },
      data,
    });
  }

  async deletarTextoPalavraChave(id: number): Promise<TextoPalavraChave> {
    return this.prisma.textoPalavraChave.delete({ where: { id } });
  }
}
