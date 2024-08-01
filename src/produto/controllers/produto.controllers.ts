//CONTROLE DE ACESSO DOS DADOS
import { Controller, Get, Post, Put, Delete, HttpCode, HttpStatus, Param, Body, HttpException, UseGuards, ParseIntPipe } from "@nestjs/common";
import { JwtAuthGuard } from "../../auth/guard/jwt-auth.guard";
import { Produto } from "../entities/produto.entity";
import { ProdutoService } from "../services/produto.services";

@UseGuards(JwtAuthGuard)
@Controller("/produtos")
export class ProdutoController {
  constructor(private readonly ProdutoService: ProdutoService) { }

  @Get()
  @HttpCode(HttpStatus.OK)
  findAll(): Promise<Produto[]> {
    return this.ProdutoService.findAll();
  }

  @Get('/:id')
  @HttpCode(HttpStatus.OK)
  findById(@Param('id', ParseIntPipe) id: number): Promise<Produto> {
    return this.ProdutoService.findById(id);
  }

  @Get('/titulo/:titulo')
  @HttpCode(HttpStatus.OK)
  findByTitulo(@Param('titulo') titulo: string): Promise<Produto[]> {
    return this.ProdutoService.findByTitulo(titulo);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() Produto: Produto): Promise<Produto> {
    return this.ProdutoService.create(Produto);
  }

  @Put()
  @HttpCode(HttpStatus.OK)
  update(@Body() Produto: Produto): Promise<Produto> {
    return this.ProdutoService.update(Produto);
  }

  @Delete('/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  delete(@Param('id', ParseIntPipe) id: number){
    return this.ProdutoService.delete(id);
  }

}