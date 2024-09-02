import { Entity, PrimaryGeneratedColumn, ManyToOne, Column } from 'typeorm';
import ExtendedBaseEntity from "../base-entity";
import {Poll, User, Option} from "."; 

@Entity()
export class Vote extends ExtendedBaseEntity {

  @ManyToOne(() => User, (user) => user.votes)
  user: User;

  @ManyToOne(() => Poll, (poll) => poll.votes)
  poll: Poll;

  @ManyToOne(() => Option, (option) => option.votes)
  option: Option;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  voete_createdAt: Date;
}
