const {dateclashCheck,priorityCheck} = require('../model/jobs')
const {contract}= require('../contract/contract')
const createJob = async(req,res)=>{
    const { jobDate } = req.body;
    const job = await dateclashCheck(jobDate);
    try {
      if (job !== "No Job Found") {
        res
          .status(409)
          .json({ status: 409, message: "Date clash:Job cannot be added" });
      } else {
        res.status(200).json({ status: 200, message: "Job can be added" });
      }
    } catch (error) {
      console.error(error);
    }
}
const updateJob = async(req,res)=>{
    const { jobDate } = req.body;
    const job = await dateclashCheck(jobDate)
    try {
      if (job !== "No Job Found") {
        res
          .status(409)
          .json({ status: 409, message: "Date clash:job cannot be updated" });
      } else {
        res.status(200).json({ status: 200, message: "job can be updated" });
      }
    } catch (error) {
      console.error(error);
    }
}
const deleteJob = async(req,res)=>{
    try {
        const { jobId } = req.params;
        const isTrue = await priorityCheck(jobId);
        if (isTrue) {
          res.status(403).json({ status: 403, message: "Job cannot be deleted" });
        } else {
          res.status(200).json({ status: 200, message: "Job can be deleted" });
        }
      } catch (error) {
        console.error(error);
      }
}
const viewJob = async(req,res)=>{
    try {
        const { jobId } = req.params;
        const job = await contract.methods.viewJob(jobId).call();
        const { id, name, date } = job;
        const numId = Number(id);
        const jobObj = {
          numId,
          name,
          date,
        };
        console.log(job);
        res.status(200).json({ status: 200, jobObj, message: "Job Exist" });
      } catch (error) {
        res.status(404).json({ status: 500, message: "Job ID does not Exist" });
        console.error(error);
      }
}
const allJobs = async(req,res)=>{
    try {
        const jobs = await contract.methods.allJob().call();
        if (jobs.length < 0) {
          res.status(404).json({ status: 404, message: "Job list does not exist" });
        } else {
          const jobList = jobs.map(({ id, name, date }) => {
            const jobId = Number(id);
            return { jobId, name, date };
          });
          res.status(200).json({ status: 200, jobList, message: "Job Exist" });
        }
      } catch (error) {
        console.error(error);
      }
}

module.exports={createJob,updateJob,deleteJob,viewJob,allJobs}