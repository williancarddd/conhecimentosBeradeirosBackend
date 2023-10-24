import { Injectable } from '@nestjs/common';
import { Comunidade, Prisma } from '@prisma/client';
import { PrismaService } from 'src/database/connections/prisma';

@Injectable()
export class ComunidadeService {
  constructor(private prisma: PrismaService) {}

  async criarComunidade(
    data: Prisma.ComunidadeCreateInput,
  ): Promise<Comunidade> {
    return this.prisma.comunidade.create({ data });
  }

  async buscarComunidadePorId(id: number): Promise<Comunidade | null> {
    return this.prisma.comunidade.findUnique({ where: { id } });
  }

  async listarComunidades(): Promise<Comunidade[]> {
    return this.prisma.comunidade.findMany();
  }

  async atualizarComunidade(
    id: number,
    data: Prisma.ComunidadeUpdateInput,
  ): Promise<Comunidade> {
    return this.prisma.comunidade.update({
      where: { id },
      data,
    });
  }

  async deletarComunidade(id: number): Promise<Comunidade> {
    return this.prisma.comunidade.delete({ where: { id } });
  }
}
