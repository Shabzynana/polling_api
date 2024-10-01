import { IsEmail } from "class-validator";
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne} from "typeorm";
import { getIsInvalidMessage } from "../utils";
import {Poll, Vote} from "."; 
import ExtendedBaseEntity from "../base-entity";

export enum UserType {
  ADMIN = "admin",
  USER = "user",
}


@Entity({ name: "users" })
export class User extends ExtendedBaseEntity {

  @Column({ unique: true })
  username: string;

  @Column({ nullable: false })
  first_name: string;

  @Column({ nullable: false })
  last_name: string;

  @Column({ unique: true, nullable: false })
  @IsEmail(undefined, { message: getIsInvalidMessage("Email") })
  email: string;

  @Column()
  password: string;

  @OneToMany(() => Poll, (poll) => poll.author)
  polls: Poll[];

  @OneToMany(() => Vote, (vote) => vote.user)
  votes: Vote[];

  @Column({
    type: "enum",
    enum: UserType,
    default: UserType.USER,
  })
  user_type: UserType;
}
