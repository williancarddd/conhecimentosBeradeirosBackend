import { Injectable } from '@nestjs/common';
import { FonteInformacao, Prisma } from '@prisma/client';
import { PrismaService } from 'src/database/connections/prisma';

@Injectable()
export class FonteInformacaoService {
  constructor(private prisma: PrismaService) {}

  async criarFonteInformacao(
    data: Prisma.FonteInformacaoCreateInput,
  ): Promise<FonteInformacao> {
    return this.prisma.fonteInformacao.create({ data });
  }

  async buscarFonteInformacaoPorId(
    id: number,
  ): Promise<FonteInformacao | null> {
    return this.prisma.fonteInformacao.findUnique({ where: { id } });
  }

  async listarFontesInformacao(): Promise<FonteInformacao[]> {
    return this.prisma.fonteInformacao.findMany();
  }

  async atualizarFonteInformacao(
    id: number,
    data: Prisma.FonteInformacaoUpdateInput,
  ): Promise<FonteInformacao> {
    return this.prisma.fonteInformacao.update({
      where: { id },
      data,
    });
  }

  async deletarFonteInformacao(id: number): Promise<FonteInformacao> {
    return this.prisma.fonteInformacao.delete({ where: { id } });
  }
}
