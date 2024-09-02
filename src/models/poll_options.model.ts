import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from 'typeorm';
import ExtendedBaseEntity from "../base-entity";
import {Poll, Vote} from "."; 

@Entity()
export class Option extends ExtendedBaseEntity {
  
  @Column()
  text: string;

  @ManyToOne(() => Poll, (poll) => poll.options)
  poll: Poll;

  @OneToMany(() => Vote, (vote) => vote.option)
  votes: Vote[];
}
