import { PartialType } from '@nestjs/mapped-types';
import { CreateCompetenciasAfinDto } from './create-competencias-afin.dto';

export class UpdateCompetenciasAfinDto extends PartialType(CreateCompetenciasAfinDto) {}
