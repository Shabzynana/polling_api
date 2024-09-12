export type UserResponsePayload = {
    id: string;
    username: string;
    email: string;
  };

  export interface JwtPayload {
    user_id: string;
  }
