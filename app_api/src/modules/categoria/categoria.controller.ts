import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
} from '@nestjs/common';
import { CategoriaService } from './categoria.service';
import { Categoria } from '@prisma/client';

@Controller('categorias')
export class CategoriaController {
  constructor(private readonly categoriaService: CategoriaService) {}

  @Get()
  async listarCategorias(): Promise<Categoria[]> {
    return this.categoriaService.listarCategorias();
  }

  @Get(':id')
  async buscarCategoriaPorId(
    @Param('id') id: string,
  ): Promise<Categoria | null> {
    return this.categoriaService.buscarCategoriaPorId(+id);
  }

  @Post()
  async criarCategoria(@Body() data: Categoria): Promise<Categoria> {
    return this.categoriaService.criarCategoria(data);
  }

  @Put(':id')
  async atualizarCategoria(
    @Param('id') id: string,
    @Body() data: Categoria,
  ): Promise<Categoria> {
    return this.categoriaService.atualizarCategoria(+id, data);
  }

  @Delete(':id')
  async deletarCategoria(@Param('id') id: string): Promise<Categoria> {
    return this.categoriaService.deletarCategoria(+id);
  }
}
