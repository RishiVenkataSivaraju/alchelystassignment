const express = require('express');
const { scheduleJob, listJobs } = require('./scheduler'); // adjust path if needed

const app = express();
app.use(express.json());

process.env.TZ = 'Asia/Kolkata';  // For IST timezone



const jobRoutes = require('./routes/jobRoutes');

app.use("/jobs", jobRoutes);


app.post('/schedule', (req, res) => {
    try {
        const { name, type, time, dayOfWeek, output } = req.body;

        const job = scheduleJob({ name, type, time, dayOfWeek, output });
        res.status(201).json({ message: 'Job scheduled', nextRun: job.nextInvocation() });

    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

app.get('/jobs', (req, res) => {
    res.json(listJobs());
});

app.get('/', (req, res) => {
    res.send("Hello job scheduler");
});

console.log('Current system time:', new Date().toString());
console.log('Current timezone:', Intl.DateTimeFormat().resolvedOptions().timeZone);

const PORT = 3000;
app.listen(PORT, () => console.log(`Scheduler running on port ${PORT}`));

