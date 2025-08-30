import { Table, Column, Model, DataType, PrimaryKey, AutoIncrement } from 'sequelize-typescript';

@Table({
  tableName: 'exercicios',
  timestamps: true,
})
export class Exercicio extends Model<Exercicio> {
  @PrimaryKey
  @AutoIncrement
  @Column({
    type: DataType.INTEGER,
  })
  declare id: number;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  nome: string;

  @Column({
    type: DataType.TEXT,
    allowNull: true,
  })
  descricao: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  grupoMuscular: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  equipamento: string;

  @Column({
    type: DataType.ENUM('iniciante', 'intermediario', 'avancado'),
    allowNull: false,
    defaultValue: 'iniciante',
  })
  dificuldade: string;

  @Column({
    type: DataType.TEXT,
    allowNull: true,
  })
  instrucoes: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  videoUrl: string;

  @Column({
    type: DataType.BOOLEAN,
    allowNull: false,
    defaultValue: true,
  })
  ativo: boolean;
}
