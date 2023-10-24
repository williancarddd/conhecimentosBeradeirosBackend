import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
} from '@nestjs/common';
import { FonteInformacao } from '@prisma/client';
import { FonteInformacaoService } from './fonte_informacao.service';

@Controller('fontes-informacao')
export class FonteInformacaoController {
  constructor(
    private readonly fonteInformacaoService: FonteInformacaoService,
  ) {}

  @Get()
  async listarFontesInformacao(): Promise<FonteInformacao[]> {
    return this.fonteInformacaoService.listarFontesInformacao();
  }

  @Get(':id')
  async buscarFonteInformacaoPorId(
    @Param('id') id: string,
  ): Promise<FonteInformacao | null> {
    return this.fonteInformacaoService.buscarFonteInformacaoPorId(+id);
  }

  @Post()
  async criarFonteInformacao(
    @Body() data: FonteInformacao,
  ): Promise<FonteInformacao> {
    return this.fonteInformacaoService.criarFonteInformacao(data);
  }

  @Put(':id')
  async atualizarFonteInformacao(
    @Param('id') id: string,
    @Body() data: FonteInformacao,
  ): Promise<FonteInformacao> {
    return this.fonteInformacaoService.atualizarFonteInformacao(+id, data);
  }

  @Delete(':id')
  async deletarFonteInformacao(
    @Param('id') id: string,
  ): Promise<FonteInformacao> {
    return this.fonteInformacaoService.deletarFonteInformacao(+id);
  }
}
