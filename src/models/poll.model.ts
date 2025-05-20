import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, CreateDateColumn } from 'typeorm';
import ExtendedBaseEntity from "../base-entity";
import {Option, User, Vote} from "."; 


@Entity()
export class Poll extends ExtendedBaseEntity{

  @Column()
  title: string;

  @Column({ type: 'timestamp', nullable: true })
  expiresAt: Date;

  @ManyToOne(() => User, (user) => user.polls)
  author: User;

  @OneToMany(() => Option, (option) => option.poll, { cascade: true })
  options: Option[];

  @OneToMany(() => Vote, (vote) => vote.poll)
  votes: Vote[];
}
