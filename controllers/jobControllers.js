const scheduler = require("../scheduler");

const pauseJob = (req, res) => {
  const success = scheduler.pauseJob(req.params.id);
  res.json(success ? { message: "Paused" } : { error: "Job not found" });
};

const resumeJob = (req, res) => {
  const success = scheduler.resumeJob(req.params.id);
  res.json(success ? { message: "Resumed" } : { error: "Job not found" });
};

const runNow = (req, res) => {
  const success = scheduler.runNow(req.params.id);
  res.json(success ? { message: "Executed now" } : { error: "Job not found" });
};

const deleteJob = (req, res) => {
  const success = scheduler.deleteJob(req.params.id);
  res.json(success ? { message: "Deleted" } : { error: "Job not found" });
};

// ✅ Export the handlers properly
module.exports = {
  pauseJob,
  resumeJob,
  runNow,
  deleteJob,
};


