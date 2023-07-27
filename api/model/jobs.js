const {contract} = require('../contract/contract')
const dateclashCheck = async (jobDate) => {
    const jobs = await contract.methods.allJob().call();
    const foundJob = jobs.find(job => job.date === jobDate);
    if(foundJob){
      return foundJob.name;
    }
    return "No Job Found";
    
  };
  
  const priorityCheck = async (id) => {
    const jobs = await contract.methods.allJob().call();
    const result = jobs[id - 1].name.includes("priority");
    return result;
  };

  module.exports={dateclashCheck,priorityCheck}