import { Transform, TransformFnParams } from 'class-transformer';
import { IsNotEmpty, IsNumber } from 'class-validator';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Categoria } from '../../categoria/entities/categoria.entity';
import { Usuario } from '../../auth/usuario/entities/usuario.entity';

@Entity({ name: 'tb_produtos' })
export class Produto {
  static id: any;
  [x: string]: any;
  @PrimaryGeneratedColumn()
  id: number;

  @Transform(({ value }: TransformFnParams) => value?.trim())
  @IsNotEmpty()
  @Column({ length: 100, nullable: false })
  nome: string;

  @Transform(({ value }: TransformFnParams) => value?.trim())
  @IsNotEmpty()
  @Column({ length: 1000, nullable: false })
  descricao: string;

  @Transform(({ value }: TransformFnParams) => value?.trim())
  @Column({ length: 100, nullable: false })
  console: string;

  @IsNotEmpty()
  @Column({ type: 'int' })
  quantidade: number;
  
  @IsNumber({maxDecimalPlaces:2})
  @IsNotEmpty()
  @Column({ type: 'decimal', precision: 10, scale: 2 })
  preco: number;

  @IsNotEmpty()
  @Column()
  foto: string;
  
  @ManyToOne(() => Categoria, (categoria) => categoria.produto, {
    onDelete: "CASCADE"
})
categoria: Categoria;

  @ManyToOne(() => Usuario, (usuario) => usuario.produto, {
    onDelete: "CASCADE"
})
usuario: Usuario

}
