import { Entity, JoinColumn, ManyToOne, Column } from 'typeorm';
import ExtendedBaseEntity from "../base-entity";
import {Poll, User, Option} from "."; 

@Entity()
export class Vote extends ExtendedBaseEntity {

  @ManyToOne(() => User, (user) => user.votes)
  @JoinColumn({ name: "userId" })
  user: User;

  @ManyToOne(() => Poll, (poll) => poll.votes)
  @JoinColumn({ name: "pollId" })
  poll: Poll;

  @ManyToOne(() => Option, (option) => option.votes)
  @JoinColumn({ name: "optionId" })
  option: Option;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  voete_createdAt: Date;
}
