import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Producer {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  cpfCnpj: string;

  @Column()
  name: string;

  @Column()
  farmName: string;

  @Column()
  city: string;

  @Column()
  state: string;

  @Column('float')
  totalArea: number;

  @Column('float')
  arableArea: number;

  @Column('float')
  vegetationArea: number;

  @Column('simple-array')
  crops: string[];
}
