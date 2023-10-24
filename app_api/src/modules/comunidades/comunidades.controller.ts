import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
} from '@nestjs/common';
import { Comunidade } from '@prisma/client';
import { ComunidadeService } from './comunidades.service';

@Controller('comunidades')
export class ComunidadeController {
  constructor(private readonly comunidadeService: ComunidadeService) {}

  @Get()
  async listarComunidades(): Promise<Comunidade[]> {
    return this.comunidadeService.listarComunidades();
  }

  @Get(':id')
  async buscarComunidadePorId(
    @Param('id') id: string,
  ): Promise<Comunidade | null> {
    return this.comunidadeService.buscarComunidadePorId(+id);
  }

  @Post()
  async criarComunidade(@Body() data: Comunidade): Promise<Comunidade> {
    return this.comunidadeService.criarComunidade(data);
  }

  @Put(':id')
  async atualizarComunidade(
    @Param('id') id: string,
    @Body() data: Comunidade,
  ): Promise<Comunidade> {
    return this.comunidadeService.atualizarComunidade(+id, data);
  }

  @Delete(':id')
  async deletarComunidade(@Param('id') id: string): Promise<Comunidade> {
    return this.comunidadeService.deletarComunidade(+id);
  }
}
