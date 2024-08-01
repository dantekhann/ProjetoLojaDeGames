import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Produto } from './produto/entities/produto.entity';
import { Categoria } from './categoria/entities/categoria.entity';
import { ProdutoModule } from './produto/produto.module';
import { CategoriaModule } from './categoria/categoria.module';
import { AuthModule } from './auth/auth.module';
import { Usuario } from './auth/usuario/entities/usuario.entity';
import { UsuarioModule } from './auth/usuario/usuario.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'root',
      database: 'db_lojadegames',
      entities: [Produto, Categoria, Usuario],
      synchronize: true,
      logging: true,
    }),
    ProdutoModule,
    CategoriaModule,
    AuthModule,
    UsuarioModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}

