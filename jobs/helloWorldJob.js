const fs = require("fs");
const path = require("path");

// function helloWorldJob(job) {
//   const message = `Hello from ${job.name} - ${new Date().toISOString()}`;
//   if (job.output === "console") {
//     console.log(message);
//   } else if (job.output === "file") {
//     const logDir = path.join(__dirname, "../logs");

//     // Ensure logs directory exists (create if not)
//     if (!fs.existsSync(logDir)) {
//       fs.mkdirSync(logDir, { recursive: true });
//     }

//     const logPath = path.join(logDir, "hello.log");
//     fs.appendFileSync(logPath, message + "\n");
//   }
// }

function helloWorldJob(job) {
  const message = `Hello from ${job.name} - ${new Date().toISOString()}`;
  const logDir = path.join(__dirname, "../logs");

  if (!fs.existsSync(logDir)) {
    fs.mkdirSync(logDir, { recursive: true });
  }

  const logPath = path.join(logDir, "hello.log");
  const historyPath = path.join(logDir, "job-history.log");

  if (job.output === "console") {
    console.log(message);
  } else if (job.output === "file") {
    fs.appendFileSync(logPath, message + "\n");
  }

  fs.appendFileSync(historyPath, `[${new Date().toISOString()}] Executed job: ${job.name} (${job.type})\n`);
}

module.exports = helloWorldJob;


