//REGRA DE NEGÓCIOS
import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { DeleteResult, ILike, Repository } from "typeorm";
import { CategoriaService } from "../../categoria/services/categoria.services";
import { Produto } from "../entities/produto.entity";

@Injectable()
export class ProdutoService {
    findByConsole(console: string): Promise<Produto[]> {
      throw new Error('Method not implemented.');
    }
    constructor(
        @InjectRepository(Produto)
        private ProdutoRepository: Repository<Produto>,
        private categoriaService:CategoriaService
    ) { }

    async findAll(): Promise<Produto[]> {
        return await this.ProdutoRepository.find({
            relations:{
                categoria: true,
                usuario: true
            }
        });
    }

    async findById(id: number): Promise<Produto> {

        let Produto = await this.ProdutoRepository.findOne({
            where: {
                id
            },
            relations:{
                categoria: true,
                usuario: true
            }
        });

        if (!Produto)
            throw new HttpException('Produto não encontrada!', HttpStatus.NOT_FOUND);

        return Produto;
    }

    async findByTitulo(titulo: string): Promise<Produto[]> {
        return await this.ProdutoRepository.find({
            where:{
                titulo: ILike(`%${titulo}%`)
            },
            relations:{
                categoria: true,
                usuario: true
            }
        })
    }

    async create(Produto: Produto): Promise<Produto> {
       
        if (Produto.categoria){
            
            let categoria = await this.categoriaService.findById(Produto.categoria.id)

            if (!categoria)
                throw new HttpException('categoria não encontrado!', HttpStatus.NOT_FOUND);
            
            return await this.ProdutoRepository.save(Produto);

        }

        return await this.ProdutoRepository.save(Produto);
    }

    async update(Produto: Produto): Promise<Produto> {
        
        let buscaProduto: Produto = await this.findById(Produto.id);

        if (!buscaProduto || !Produto.id)
            throw new HttpException('Produto não encontrada!', HttpStatus.NOT_FOUND);

        if (Produto.categoria){
            
            let categoria = await this.categoriaService.findById(Produto.categoria.id)
                
            if (!categoria)
                throw new HttpException('categoria não encontrado!', HttpStatus.NOT_FOUND);
                
            return await this.ProdutoRepository.save(Produto);
    
        }
        
        return await this.ProdutoRepository.save(Produto);
    }

    async delete(id: number): Promise<DeleteResult> {
        
        let buscaProduto = await this.findById(id);

        if (!buscaProduto)
            throw new HttpException('Produto não encontrada!', HttpStatus.NOT_FOUND);

        return await this.ProdutoRepository.delete(id);

    }

}