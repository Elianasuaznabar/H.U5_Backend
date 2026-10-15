import { Controller, Get, Param } from '@nestjs/common';
import { CompetenciasAfinService } from './competencias-afin.service';

@Controller('competencias-afin')
export class CompetenciasAfinController {
  constructor(private readonly competenciasAfinService: CompetenciasAfinService) {}

  @Get(':vacanteId/:usuarioId')
  async obtenerAfinidad(
    @Param('vacanteId') vacanteId: string,
    @Param('usuarioId') usuarioId: string,
  ) {
    return await this.competenciasAfinService.calcularAfinidad(vacanteId, usuarioId);
  }
}
