import { AllowNull, BelongsTo, Column, DataType, Default, ForeignKey, HasMany, Model, PrimaryKey, Table, Unique } from 'sequelize-typescript';
import Destination from './destination.model';
import User from './user.model';

export interface ITripAttributes {
  id?: string;
  name?: string;
  destinations?: Destination[];
  createdAt?: Date;
  updatedAt?: Date;
}

@Table({ timestamps: true, paranoid: true })
export default class Trip extends Model<ITripAttributes> {
  @PrimaryKey
  @Default(DataType.UUIDV4)
  @Column(DataType.UUID)
  public id!: string;

  @Column(DataType.TEXT)
  public name!: string;

  @HasMany(() => Destination)
  public destinations!: Destination[];

  @ForeignKey(() => User)
  @Column(DataType.UUID)
  public userID!: string;

  @BelongsTo(() => User)
  public user!: User;
}
