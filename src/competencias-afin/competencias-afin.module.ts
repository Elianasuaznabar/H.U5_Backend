import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CompetenciasAfinService } from './competencias-afin.service';
import { CompetenciasAfinController } from './competencias-afin.controller';
import {
  Vacante,
  VacanteRequerimientoLaboral,
  Usuario,
  RequerimientoLaboral,
} from '../entities/app.entities';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Vacante,
      VacanteRequerimientoLaboral,
      Usuario,
      RequerimientoLaboral,
    ]),
  ],
  controllers: [CompetenciasAfinController],
  providers: [CompetenciasAfinService],
})
export class CompetenciasAfinModule {}
