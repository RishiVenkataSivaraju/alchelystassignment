const schedule = require('node-schedule');
const helloWorldJob = require('./jobs/helloWorldJob');  // adjust path as needed

const jobStore = [];

const listJobs = () => 
    jobStore.map(j => ({
        name: j.name,
        type: j.type,
        nextRun: j.job.nextInvocation()
    }));


const scheduleJob = ({ name, type, time, dayOfWeek, output }) => {
    let job;

    const jobDetails = { name, type, time, dayOfWeek, output };

    if (type === 'hourly') {
        // 'time' = minute of each hour (e.g., 15 → runs at HH:15)
        job = schedule.scheduleJob(`${time} * * * *`, () => helloWorldJob(jobDetails));

    } else if (type === 'daily') {
        const [hour, minute] = time.split(':');
        job = schedule.scheduleJob(`${minute} ${hour} * * *`, () => helloWorldJob(jobDetails));

    } else if (type === 'weekly') {
        const [hour, minute] = time.split(':');
        job = schedule.scheduleJob(`${minute} ${hour} * * ${dayOfWeek}`, () => helloWorldJob(jobDetails));

    } else {
        throw new Error('Invalid job type');
    }

    jobStore.push({ name, type, schedule: job.nextInvocation(), job });
    return job;
};


// function runNow(name) {
//     const jobRecord = jobStore.find(j => j.name === name);
//     if (jobRecord) {
//         helloWorldJob(jobRecord);
//         return true;
//     }
//     return false;
// }

// function deleteJob(name) {
//     const index = jobStore.findIndex(j => j.name === name);
//     if (index === -1) return false;

//     const jobRecord = jobStore[index];
//     if (jobRecord.job) {
//         jobRecord.job.cancel();
//     }

//     jobStore.splice(index, 1);
//     return true;
// }
module.exports = { scheduleJob, listJobs };