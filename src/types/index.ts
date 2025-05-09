import { UserType } from "../models";


export interface IUserSignUp {
  username: string;
  email: string;
  first_name: string;
  last_name: string;
  password: string;
  admin_secret?: string;
}

export interface EmailData {
  from: string;
  to: string;
  subject: string;
  html: string;
}

export type UserResponsePayload = {
  id: string;
  username: string;
  email: string;
  user_type: UserType;
};


export interface JwtPayload {
  user_id: string;
};

export type PollResponsePayload = {
  id: string;
  title: string;
  created_at: Date;

};

export type PollPayload = {

  id: string;
  title: string;
  created_at: Date;
  author: UserResponsePayload;

}

export type OptionResponsePayload = {
  id: string;
  text: string;
  created_at: Date;
  poll: PollResponsePayload

}  
 
