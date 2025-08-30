import { Table, Column, Model, DataType, PrimaryKey, AutoIncrement, ForeignKey, BelongsTo } from 'sequelize-typescript';
import { Usuario } from '../../usuarios/entities/usuario.entity';

@Table({
  tableName: 'treinos',
  timestamps: true,
})
export class Treino extends Model<Treino> {
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

  @ForeignKey(() => Usuario)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  usuarioId: number;

  @BelongsTo(() => Usuario)
  usuario: Usuario;

  @Column({
    type: DataType.INTEGER,
    allowNull: true,
  })
  duracao: number; // em minutos

  @Column({
    type: DataType.ENUM('segunda', 'terca', 'quarta', 'quinta', 'sexta', 'sabado', 'domingo'),
    allowNull: true,
  })
  diaSemana: string;

  @Column({
    type: DataType.BOOLEAN,
    allowNull: false,
    defaultValue: true,
  })
  ativo: boolean;
}
