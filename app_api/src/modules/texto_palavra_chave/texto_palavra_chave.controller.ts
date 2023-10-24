import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
} from '@nestjs/common';
import { TextoPalavraChave } from '@prisma/client';
import { TextoPalavraChaveService } from './texto_palavra_chave.service';

@Controller('textos-palavras-chave')
export class TextoPalavraChaveController {
  constructor(
    private readonly textoPalavraChaveService: TextoPalavraChaveService,
  ) {}

  @Get()
  async listarTextosPalavrasChave(): Promise<TextoPalavraChave[]> {
    return this.textoPalavraChaveService.listarTextosPalavrasChave();
  }

  @Get(':id')
  async buscarTextoPalavraChavePorId(
    @Param('id') id: string,
  ): Promise<TextoPalavraChave | null> {
    return this.textoPalavraChaveService.buscarTextoPalavraChavePorId(+id);
  }

  @Post()
  async criarTextoPalavraChave(
    @Body() data: TextoPalavraChave,
  ): Promise<TextoPalavraChave> {
    return this.textoPalavraChaveService.criarTextoPalavraChave({
      textoColetado: { connect: { id: data.textoColetadoId } },
      palavraChave: data.palavraChave,
    });
  }

  @Put(':id')
  async atualizarTextoPalavraChave(
    @Param('id') id: string,
    @Body() data: TextoPalavraChave,
  ): Promise<TextoPalavraChave> {
    return this.textoPalavraChaveService.atualizarTextoPalavraChave(+id, data);
  }

  @Delete(':id')
  async deletarTextoPalavraChave(
    @Param('id') id: string,
  ): Promise<TextoPalavraChave> {
    return this.textoPalavraChaveService.deletarTextoPalavraChave(+id);
  }
}
