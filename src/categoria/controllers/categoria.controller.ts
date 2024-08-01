import { Body, Controller, Delete, Get, HttpCode, HttpException, HttpStatus, Param, ParseIntPipe, Post, Put, UseGuards } from "@nestjs/common";
import { JwtAuthGuard } from "../../auth/guard/jwt-auth.guard";
import { Categoria } from "../entities/Categoria.entity";
import { CategoriaService } from "../services/categoria.services";

@UseGuards(JwtAuthGuard)
@Controller("/categorias")
export class CategoriaController {
  constructor(private readonly CategoriaService: CategoriaService) { }

  @Get()
  @HttpCode(HttpStatus.OK)
  findAll(): Promise<Categoria[]> {
    return this.CategoriaService.findAll();
  }

  @Get('/:id')
  @HttpCode(HttpStatus.OK)
  findById(@Param('id', ParseIntPipe) id: number): Promise<Categoria> {
    return this.CategoriaService.findById(id);
  }

  @Get('/descricao/:descricao')
  @HttpCode(HttpStatus.OK)
  findBydescricao(@Param('descricao') descricao: string): Promise<Categoria[]> {
    return this.CategoriaService.findByDescricao(descricao);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() Categoria: Categoria): Promise<Categoria> {
    return this.CategoriaService.create(Categoria);
  }

  @Put()
  @HttpCode(HttpStatus.OK)
  update(@Body() Categoria: Categoria): Promise<Categoria> {
    return this.CategoriaService.update(Categoria);
  }

  @Delete('/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  delete(@Param('id', ParseIntPipe) id: number){
    return this.CategoriaService.delete(id);
  }

}
