import { Injectable } from '@nestjs/common';
import { Categoria, Prisma } from '@prisma/client';
import { PrismaService } from 'src/database/connections/prisma';

@Injectable()
export class CategoriaService {
  constructor(private prisma: PrismaService) {}

  async criarCategoria(data: Prisma.CategoriaCreateInput): Promise<Categoria> {
    return this.prisma.categoria.create({ data });
  }

  async buscarCategoriaPorId(id: number): Promise<Categoria | null> {
    return this.prisma.categoria.findUnique({ where: { id } });
  }

  async listarCategorias(): Promise<Categoria[]> {
    return this.prisma.categoria.findMany();
  }

  async atualizarCategoria(
    id: number,
    data: Prisma.CategoriaUpdateInput,
  ): Promise<Categoria> {
    return this.prisma.categoria.update({
      where: { id },
      data,
    });
  }

  async deletarCategoria(id: number): Promise<Categoria> {
    return this.prisma.categoria.delete({ where: { id } });
  }
}
