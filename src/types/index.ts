export type UserResponsePayload = {
    id: string;
    username: string;
    email: string;
  };

  export interface JwtPayload {
    user_id: string;
  }

  export type PollResponsePayload = {
    id: string;
    title: string;
    created_at: Date;
  };
