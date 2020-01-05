import { AllowNull, Column, DataType, Default, HasMany, Model, PrimaryKey, Table, Unique } from 'sequelize-typescript';
import Trip from './trip.model';

export interface IUserAttributes {
  id?: string;
  name?: string;
  email?: string;
  password?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

@Table({ timestamps: true, paranoid: true })
export default class User extends Model<IUserAttributes> {
  @PrimaryKey
  @Default(DataType.UUIDV4)
  @Column(DataType.UUID)
  public id!: string;

  @Unique
  @AllowNull(false)
  @Column(DataType.TEXT)
  public email!: string;

  @AllowNull(false)
  @Column(DataType.TEXT)
  public password!: string;

  @HasMany(() => Trip)
  public trips!: Trip[];
}
