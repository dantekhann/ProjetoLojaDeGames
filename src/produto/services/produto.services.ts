//REGRA DE NEGÓCIOS
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, ILike, Repository } from 'typeorm';
import { Produto } from '../entities/produto.entity';
import { CategoriaService } from '../../categoria/services/categoria.services';

@Injectable()
export class ProdutoService {
  
  constructor(
    @InjectRepository(Produto)
    private produtoRepository: Repository<Produto>,
    private categoriaService: CategoriaService,
  ) {}

  async findAll(): Promise<Produto[]> {
    return await this.produtoRepository.find({
      relations: {
        categoria: true,
      },
    });
  }

  async findById(id: number): Promise<Produto> {
    let buscaProduto = await this.produtoRepository.findOne({
      where: {
        id,
      },
      relations: {
        categoria: true,
      },
    });
    if (!buscaProduto)
      throw new HttpException('Produto não encontrado!', HttpStatus.NOT_FOUND);
    return buscaProduto;
  }

  async findByTitulo(nome: string): Promise<Produto[]> {
    return await this.produtoRepository.find({
      where: {
        nome: ILike(`%${nome}%`),
      },
      relations: {
        categoria: true,
      },
    });
  }

  async findByConsole(console: string): Promise<Produto[]> {
    return await this.produtoRepository.find({
      where: {
        console: ILike(`%${console}%`),
      },
      relations: {
        categoria: true,
      },
    });
  }

  async create(produto: Produto): Promise<Produto> {
    //criou no services, tem que criar na controller
    if (produto.categoria) {
      let categoria = await this.categoriaService.findById(
        produto.categoria.id,
      );
      if (!categoria)
        throw new HttpException(
          'Categoria não encontrada',
          HttpStatus.NOT_FOUND,
        );
      return await this.produtoRepository.save(produto);
    }
    return await this.produtoRepository.save(produto);
  }

  async update(produto: Produto): Promise<Produto> {
    //criou no services, tem que criar na controller
    let buscaProduto = await this.findById(produto.id);
    if (!buscaProduto || !produto.id)
      throw new HttpException(
        'O Produto não foi encontrado!',
        HttpStatus.NOT_FOUND,
      );
    if (produto.categoria) {
      let categoria = await this.categoriaService.findById(
        produto.categoria.id,
      );
      if (!categoria)
        throw new HttpException(
          'Categoria não encontrada',
          HttpStatus.NOT_FOUND,
        );
      return await this.produtoRepository.save(produto);
    }
    return await this.produtoRepository.save(produto);
  }

  async delete(id: number): Promise<DeleteResult> {
    //criou no services, tem que criar na controller
    let buscaProduto = await this.findById(id);
    if (!buscaProduto)
      throw new HttpException(
        'Postagem não foi encontrada!',
        HttpStatus.NOT_FOUND,
      );
    return await this.produtoRepository.delete(id);
  }
}
