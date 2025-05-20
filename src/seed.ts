import { faker } from '@faker-js/faker';
import AppDataSource from './data-source';
import { Poll, User, Vote, Option } from './models';
import { hashPassword } from './utils';

async function seed() {
  await AppDataSource.initialize();

  const userRepo = AppDataSource.getRepository(User);
  const pollRepo = AppDataSource.getRepository(Poll);
  const optionRepo = AppDataSource.getRepository(Option);
  const voteRepo = AppDataSource.getRepository(Vote);

  // Create 50 users
  const users: User[] = [];
  for (let i = 0; i < 50; i++) {
    const plainPassword = 'password';
    const hashedPassword = await hashPassword(plainPassword);
    const user = userRepo.create({
      first_name: faker.person.firstName(),
      last_name: faker.person.lastName(),
      email: faker.internet.email(),
      username: faker.internet.username(),
      password: hashedPassword,
    });
    users.push(user);
  }
  await userRepo.save(users);

  // For each user, create 2 polls with 4 options each
  const polls: Poll[] = [];
  const options: Option[] = [];

  for (const user of users) {
    for (let i = 0; i < 2; i++) {
      const poll = pollRepo.create({
        title: faker.lorem.sentence(5),
        author: user,
        expiresAt: faker.date.future(),
      });
      polls.push(poll);
    }
  }
  await pollRepo.save(polls);

  // Create options for each poll
  for (const poll of polls) {
    for (let i = 0; i < 4; i++) {
      const option = optionRepo.create({
        text: faker.lorem.word(),
        poll: poll,
      });
      options.push(option);
    }
  }
  await optionRepo.save(options);

  // Create votes - let's create ~200 random votes
  const votes: Vote[] = [];
  for (let i = 0; i < 200; i++) {
    // random user
    const user = users[Math.floor(Math.random() * users.length)];
    // random poll
    const poll = polls[Math.floor(Math.random() * polls.length)];

    // filter options that belong to the poll
    const pollOptions = options.filter((opt) => opt.poll.id === poll.id);
    if (pollOptions.length === 0) continue;

    // random option from the poll
    const option = pollOptions[Math.floor(Math.random() * pollOptions.length)];

    // Create vote
    const vote = voteRepo.create({
      user,
      poll,
      option,
    });
    votes.push(vote);
  }
  await voteRepo.save(votes);

  console.log("Seeding lots of data done!");
  await AppDataSource.destroy();
}

seed().catch(console.error);
