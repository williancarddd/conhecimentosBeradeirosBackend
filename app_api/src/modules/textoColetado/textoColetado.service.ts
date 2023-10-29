import { Injectable } from '@nestjs/common';
import { TextoColetado, Prisma } from '@prisma/client';
import { PrismaService } from 'src/database/connections/prisma';

@Injectable()
export class TextoColetadoService {
  constructor(private prisma: PrismaService) {}

  async criarTextoColetado(
    data: Prisma.TextoColetadoCreateInput,
  ): Promise<TextoColetado> {
    return this.prisma.textoColetado.create({ data });
  }

  async buscarTextoColetadoPorId(id: number): Promise<TextoColetado[] | null> {
    return this.prisma.textoColetado.findMany({
      where: {
        comunidadeId: id,
      },
    });
  }

  async listarTextosColetados(): Promise<TextoColetado[]> {
    return this.prisma.textoColetado.findMany();
  }

  async atualizarTextoColetado(
    id: number,
    data: Prisma.TextoColetadoUpdateInput,
  ): Promise<TextoColetado> {
    return this.prisma.textoColetado.update({
      where: { id },
      data,
    });
  }

  async deletarTextoColetado(id: number): Promise<TextoColetado> {
    return this.prisma.textoColetado.delete({ where: { id } });
  }
}
