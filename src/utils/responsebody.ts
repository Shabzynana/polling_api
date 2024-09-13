import { User, Poll } from "../models";
import { UserResponsePayload, PollResponsePayload } from "../types";


export const formatUser = (user: User): UserResponsePayload => {
  return {
    id: user.id,
    username: user.username,
    email: user.email,
  };
};

export const formatPoll = (poll: Poll): PollResponsePayload => {
  return {
    id: poll.id,
    title: poll.title,
    created_at: poll.created_at,
  };
};


