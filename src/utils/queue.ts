import Bull, { Job } from "bull";
import config from "../config";
import { EmailData } from "../types";
import log from "./logger";
import { Sendmail } from "./mail";

const retries: number = 2;
const delay: number = 1000 * 30;

  
const redisConfig = {
  host: config.REDIS_HOST,
  password: config.REDIS_PASSWORD,
  port: Number(config.REDIS_PORT),
};

function asyncHandler(fn: (job: Job) => Promise<void>) {
  return (job: Job, done: Bull.DoneCallback) => {
    Promise.resolve(fn(job))
      .then(() => done())
      .catch((err) => {
        log.error(err);
        done(err);
        job.moveToFailed({ message: err.message }, true);
      });
  };
}

const emailQueue = new Bull("MusicApp-Email", {
  redis: redisConfig,
  limiter: {
    max: 20,
    duration: 1000,
  },
});

const addEmailToQueue = async (data: EmailData) => {
  try {
    await emailQueue.add(data, {
      jobId: `email-${data.to}-${Date.now()}`,
      attempts: retries,
      backoff: {
        type: "fixed",
        delay,
      },
    });

    return {
      status: true,
      message: "Email sent!",
    };
  } catch (error) {
    log.error(error);
    return {
      status: false,
      message: error.message,
    };
  }
};

emailQueue.process(
  5,
  asyncHandler(async (job: Job) => {
    await Sendmail(job.data);
    job.log("Email sent successfully to " + job.data.to);
    log.info({
      message: `Email sent to ${job.data.to}`,
      jobId: job.id,
      timestamp: new Date().toISOString(),
    });
  }),
);

const handleJobCompletion = (queue: Bull.Queue, type: string) => {
  queue.on("completed", (job: Job) => {
    log.info(`${type} Job with id ${job.id} has been completed`);
  });

  queue.on("failed", (job: Job, error: Error) => {
    log.error(
      `${type} Job with id ${job.id} has failed with error: ${error.message}`,
    );
  });
};

handleJobCompletion(emailQueue, "Email");


export {
  addEmailToQueue,
  emailQueue,
};
