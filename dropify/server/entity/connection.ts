import { MaxLength, MinLength } from "class-validator";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";


@Entity()
export class Connection {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ unique: true, nullable: false })
  @MinLength(36, {message: 'Client ID must be at least 36 characters long'})
  @MaxLength(36, {message: 'Client ID must be at least 36 characters long'})
  clientId!: string;

  @Column({ nullable: false })
  @MinLength(7, {message: 'IP Address must be at least 7 characters long'})
  @MaxLength(15, {message: 'IP Address must be at most 15 characters long'})
  ipAdress!: string;

  @Column({ nullable: false })
  @MaxLength(50, {message: 'Name must be at most 50 characters long'})
  @MinLength(5, {message: 'Name must be at least 5 characters long'})
  name!: string;

  @Column({ nullable: true })
  avatar!: string;

  @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP', nullable: false })
  createdAt!: Date;
}