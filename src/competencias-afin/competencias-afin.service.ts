import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {
  Vacante,
  VacanteRequerimientoLaboral,
  Usuario,
} from '../entities/app.entities';

@Injectable()
export class CompetenciasAfinService {
  constructor(
    @InjectRepository(Vacante)
    private readonly vacanteRepository: Repository<Vacante>,
    @InjectRepository(VacanteRequerimientoLaboral)
    private readonly vrlRepository: Repository<VacanteRequerimientoLaboral>,
    @InjectRepository(Usuario)
    private readonly usuarioRepository: Repository<Usuario>,
  ) {}

  async calcularAfinidad(vacanteId: string, usuarioId: string) {
    // 1. Verificar si la vacante existe
    const vacante = await this.vacanteRepository.findOne({
      where: { id: vacanteId },
    });
    if (!vacante) {
      throw new NotFoundException(`La vacante con ID ${vacanteId} no fue encontrada.`);
    }

    // 2. Verificar si el usuario existe
    const usuario = await this.usuarioRepository.findOne({
      where: { usuario_id: usuarioId },
    });
    if (!usuario) {
      throw new NotFoundException(`El usuario con ID ${usuarioId} no fue encontrado.`);
    }

    // 3. Obtener los requerimientos de la vacante uniendo con el catálogo mediante QueryBuilder
    const requerimientosVacante = await this.vrlRepository
      .createQueryBuilder('vrl')
      .leftJoinAndSelect('vrl.requerimientoLaboral', 'rl')
      .where('vrl.id_vacante = :vacanteId', { vacanteId })
      .getMany();

    if (requerimientosVacante.length === 0) {
      return {
        vacante: vacante.titulo,
        usuario: usuario.nombre,
        porcentajeAfinidad: 100,
        coincidentes: [],
        faltantes: [],
        mensaje: 'La vacante no especifica requerimientos laborales.',
      };
    }

    const idsRequerimientosUsuario: string[] = []; // Competencias del perfil del usuario

    const coincidentes = [];
    const faltantes = [];

    for (const req of requerimientosVacante) {
      const competencia = req.requerimientoLaboral;
      if (!competencia) continue;

      const poseeCompetencia = idsRequerimientosUsuario.includes(req.id_requerimiento_laboral);

      if (poseeCompetencia) {
        coincidentes.push({
          id: competencia.id,
          nombre: competencia.titulo,
          nivelRequerido: competencia.nivel_requerido,
        });
      } else {
        faltantes.push({
          id: competencia.id,
          nombre: competencia.titulo,
          nivelRequerido: competencia.nivel_requerido,
          experienciaRequerida: competencia.experiencia_requerida,
        });
      }
    }

    const totalRequeridos = requerimientosVacante.length;
    const totalCoincidentes = coincidentes.length;
    const porcentajeAfinidad = Number(((totalCoincidentes / totalRequeridos) * 100).toFixed(2));

    return {
      vacanteId: vacante.id,
      tituloVacante: vacante.titulo,
      usuarioId: usuario.usuario_id,
      nombreUsuario: usuario.nombre,
      porcentajeAfinidad,
      totalRequeridos,
      totalCoincidentes,
      totalFaltantes: faltantes.length,
      coincidentes,
      faltantes,
    };
  }
}