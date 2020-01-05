import { AllowNull, BelongsTo, Column, DataType, Default, ForeignKey, HasMany, Model, PrimaryKey, Table, Unique } from 'sequelize-typescript';
import Trip from './trip.model';

export interface IDestinationAttributes {
  id?: string;
  name?: string;
  startDate?: string;
  endDate?: string;
  image?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

@Table({ timestamps: true, paranoid: true })
export default class Destination extends Model<IDestinationAttributes> {
  @PrimaryKey
  @Default(DataType.UUIDV4)
  @Column(DataType.UUID)
  public id!: string;

  @AllowNull(false)
  @Column(DataType.TEXT)
  public name!: string;

  @Column(DataType.DATEONLY)
  public startDate!: string;
  @Column(DataType.DATEONLY)
  public endDate!: string;

  @Column(DataType.TEXT)
  public image!: string;

  @Column(DataType.STRING)
  public todoItems!: string;

  @ForeignKey(() => Trip)
  @Column(DataType.UUID)
  public tripID!: string;

  @BelongsTo(() => Trip)
  public trip!: Trip;
}
