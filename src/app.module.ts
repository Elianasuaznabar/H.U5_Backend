import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import {
  Usuario,
  Vacante,
  RequerimientoLaboral,
  VacanteRequerimientoLaboral,
} from './entities/app.entities';
import { CompetenciasAfinModule } from './competencias-afin/competencias-afin.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DATABASE_HOST,
      port: parseInt(process.env.DATABASE_PORT || '5432'),
      username: process.env.DATABASE_USER,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE_NAME,
      entities: [
        Usuario,
        Vacante,
        RequerimientoLaboral,
        VacanteRequerimientoLaboral,
      ],
      autoLoadEntities: true,
      synchronize: true,
    }),
    CompetenciasAfinModule,
  ],
})
export class AppModule {}