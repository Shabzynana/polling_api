import { User, Poll, Option } from "../models";
import { UserResponsePayload, PollResponsePayload, PollPayload, OptionResponsePayload } from "../types";


export const formatUser = (user: User): UserResponsePayload => {
  return {
    id: user.id,
    username: user.username,
    email: user.email,
    user_type: user.user_type,
  };
};

export const formatPoll = (poll: Poll): PollResponsePayload => {
  return {
    id: poll.id,
    title: poll.title,
    created_at: poll.created_at,
  };
};

export const formatPollPayload = (poll: Poll): PollPayload => {
  return {
    id: poll.id,
    title: poll.title,
    created_at: poll.created_at,
    author: formatUser(poll.author),
  };
};

export const formatOption = (option: Option): OptionResponsePayload => {
  return {
    id: option.id,
    text: option.text,
    created_at: option.created_at,
    poll: formatPoll(option.poll),
  };
};


