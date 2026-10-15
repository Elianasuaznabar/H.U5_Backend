import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
  JoinColumn,
} from 'typeorm';

// --- USUARIO (Egresado) ---
@Entity('usuario')
export class Usuario {
  @PrimaryGeneratedColumn('uuid')
  usuario_id: string;

  @Column({ length: 45 })
  nombre: string;

  @Column({ length: 20 })
  rol: string;
}

// --- VACANTE ---
@Entity('vacante')
export class Vacante {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 150 })
  titulo: string;

  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: true })
  salario: number;

  @Column({ length: 50, nullable: true })
  modalidad: string;

  @Column({ length: 30, default: 'Abierta' })
  estado: string;

  @OneToMany(() => VacanteRequerimientoLaboral, (vrl) => vrl.vacante)
  vacanteRequerimientos: VacanteRequerimientoLaboral[];
}

// --- REQUERIMIENTO LABORAL (Competencias / Habilidades de la vacante) ---
@Entity('requerimiento_laboral')
export class RequerimientoLaboral {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 45 })
  titulo: string;

  @Column({ type: 'text', nullable: true })
  descripcion: string;

  @Column({ length: 100, nullable: true })
  experiencia_requerida: string;

  @Column({ length: 20, default: 'Intermedio' })
  nivel_requerido: string;

  @OneToMany(() => VacanteRequerimientoLaboral, (vrl) => vrl.requerimientoLaboral)
  vacanteRequerimientos: VacanteRequerimientoLaboral[];
}

// --- TABLA INTERMEDIA: vacante_requerimiento_laboral ---
// --- TABLA INTERMEDIA: vacante_requerimiento_laboral ---
@Entity('vacante_requerimiento_laboral')
export class VacanteRequerimientoLaboral {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  id_vacante: string;

  @Column()
  id_requerimiento_laboral: string;

  @ManyToOne(() => Vacante, (v) => v.vacanteRequerimientos, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'id_vacante' })
  vacante: Vacante;

  @ManyToOne(() => RequerimientoLaboral, (rl) => rl.vacanteRequerimientos, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'id_requerimiento_laboral' })
  requerimientoLaboral: RequerimientoLaboral; // <-- Esta propiedad es la que busca 'relations'
}
