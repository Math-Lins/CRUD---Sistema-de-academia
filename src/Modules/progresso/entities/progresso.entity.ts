import { Table, Column, Model, DataType, PrimaryKey, AutoIncrement, ForeignKey, BelongsTo } from 'sequelize-typescript';
import { Usuario } from '../../usuarios/entities/usuario.entity';

@Table({
  tableName: 'progressos',
  timestamps: true,
})
export class Progresso extends Model<Progresso> {
  @PrimaryKey
  @AutoIncrement
  @Column({
    type: DataType.INTEGER,
  })
  declare id: number;

  @ForeignKey(() => Usuario)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  usuarioId: number;

  @BelongsTo(() => Usuario)
  usuario: Usuario;

  @Column({
    type: DataType.DECIMAL(5, 2),
    allowNull: true,
  })
  peso: number;

  @Column({
    type: DataType.DECIMAL(5, 2),
    allowNull: true,
  })
  altura: number;

  @Column({
    type: DataType.DECIMAL(5, 2),
    allowNull: true,
  })
  imc: number;

  @Column({
    type: DataType.DECIMAL(5, 2),
    allowNull: true,
  })
  percentualGordura: number;

  @Column({
    type: DataType.DECIMAL(5, 2),
    allowNull: true,
  })
  massaMuscular: number;

  @Column({
    type: DataType.DATE,
    allowNull: false,
  })
  dataRegistro: Date;

  @Column({
    type: DataType.TEXT,
    allowNull: true,
  })
  observacoes: string;
}
