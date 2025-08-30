import { Table, Column, Model, DataType, PrimaryKey, AutoIncrement } from 'sequelize-typescript';

@Table({
  tableName: 'usuarios',
  timestamps: true,
})
export class Usuario extends Model<Usuario> {
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
    type: DataType.STRING,
    allowNull: false,
    unique: true,
  })
  email: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  senha: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  telefone: string;

  @Column({
    type: DataType.DATEONLY,
    allowNull: true,
  })
  dataNascimento: Date;

  @Column({
    type: DataType.ENUM('aluno', 'instrutor', 'admin'),
    allowNull: false,
    defaultValue: 'aluno',
  })
  tipo: string;

  @Column({
    type: DataType.BOOLEAN,
    allowNull: false,
    defaultValue: true,
  })
  ativo: boolean;
}
