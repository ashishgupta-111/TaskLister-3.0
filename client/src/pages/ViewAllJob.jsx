import { useState, useEffect } from "react";
import Navigation from "../components/Navigation";
const ViewAllJob = () => {
  const [jobList, setJobList] = useState([]);
  useEffect(() => {
    const allJobs = async () => {
      try {
        const res = await fetch(
          "http://localhost:3000/api/ethereum/view-all-job",
          {
            method: "GET",
            headers: {
              "content-type": "application/json",
            },
          }
        );
        const data = await res.json();
        if (data.status === 200) {
          setJobList(data.jobList);
        }
      } catch (error) {
        console.error(error);
      }
    };
    allJobs();
  }, []);
  return (
    <>
      <Navigation />
      <div className="view_all_tasks">
      {jobList.map((job) => {
        return (
          <div className="view_all_tasks_card" key={job.id}
          style={job.id!=="" && job.name!=="" && job.date!=="" ? {} : {display:"none"}}>
            <p>{job.jobId}</p>
            <p>{job.name}</p>
            <p>{job.date}</p>
          </div>
        );
      })}
      </div>
    </>
  );
};

export default ViewAllJob;
