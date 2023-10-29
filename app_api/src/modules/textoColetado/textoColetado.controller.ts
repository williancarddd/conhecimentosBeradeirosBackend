import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
} from '@nestjs/common';
import { TextoColetado } from '@prisma/client';
import { TextoColetadoService } from './textoColetado.service';

@Controller('textos-coletados')
export class TextoColetadoController {
  constructor(private readonly textoColetadoService: TextoColetadoService) {}

  @Get()
  async listarTextosColetados(): Promise<TextoColetado[]> {
    return this.textoColetadoService.listarTextosColetados();
  }

  @Get(':id')
  async buscarTextoColetadoPorId(
    @Param('id') id: string,
  ): Promise<TextoColetado[] | null> {
    return this.textoColetadoService.buscarTextoColetadoPorId(+id);
  }

  @Post()
  async criarTextoColetado(
    @Body() data: TextoColetado,
  ): Promise<TextoColetado> {
    return this.textoColetadoService.criarTextoColetado(data);
  }

  @Put(':id')
  async atualizarTextoColetado(
    @Param('id') id: string,
    @Body() data: TextoColetado,
  ): Promise<TextoColetado> {
    return this.textoColetadoService.atualizarTextoColetado(+id, data);
  }

  @Delete(':id')
  async deletarTextoColetado(@Param('id') id: string): Promise<TextoColetado> {
    return this.textoColetadoService.deletarTextoColetado(+id);
  }
}
