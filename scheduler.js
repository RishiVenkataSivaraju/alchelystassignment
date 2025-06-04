const schedule = require('node-schedule');
const helloWorldJob = require('./jobs/helloWorldJob');  // adjust path as needed

const jobStore = [];

function listJobs() {
  return jobStore.map(j => ({
    name: j.name,
    type: j.type,
    nextRun: j.job.nextInvocation()
  }));
}

function scheduleJob({ name, type, time, dayOfWeek, output }) {
    let job;

    const jobDetails = { name, type, time, dayOfWeek, output };

    if (type === 'hourly') {
        // time = minute of the hour (0–59)
        job = schedule.scheduleJob(`${time} * * * *`, () => {
            helloWorldJob(jobDetails);
        });

    } else if (type === 'daily') {
        const [hour, minute] = time.split(':');
        job = schedule.scheduleJob(`${minute} ${hour} * * *`, () => {
            helloWorldJob(jobDetails);
        });

    } else if (type === 'weekly') {
        const [hour, minute] = time.split(':');
        job = schedule.scheduleJob(`${minute} ${hour} * * ${dayOfWeek}`, () => {
            helloWorldJob(jobDetails);
        });

    } else {
        throw new Error('Invalid job type');
    }

    jobStore.push({ name, type, schedule: job.nextInvocation(), job });
    return job;
}

module.exports = { scheduleJob, listJobs };