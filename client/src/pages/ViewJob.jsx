import { useState } from "react";
import Navigation from "../components/Navigation";
const ViewJob =()=>{
    const [job,setJob]= useState([])
    const [modalVisible, setModalVisible] = useState(false);
    const [modalContent, setModalContent] = useState("");
    const viewJob = async(event)=>{
        try{
            event.preventDefault()
            const jobID = document.querySelector("#jobID").value;
            const res = await fetch(`http://localhost:3000/api/ethereum/view-job/${jobID}`,{
                method:"GET",
                headers:{
                    "content-type":"application/json"
                }
            })
            const data = await res.json()
            if(data.status===200){
                setJob(data.jobObj)
            }else{
                throw new Error
            }
        }catch(error){
            setModalContent("Task does not exist");
            setModalVisible(true);
        }
    }
    const closeModal = () => {
        setModalVisible(false);
        setModalContent("");
      };
    return<>
        <Navigation/>
        <div className="view_task todo_btn">
        {job.numId!==null && job.name!==null && job.date!==null ? (
          <div className="view_task_by_id  view_all_tasks_card">
            <p>Task ID: {job.numId}</p>
            <p>Task Name: {job.name}</p>
            <p>Task Date: {job.date}</p>
          </div>
        ) : (
          <div className="empty_div"></div>
        )}
        <form onSubmit={viewJob}>
          <label>
            ID:
            <input id="jobID" />
          </label>
          <button type="submit">View Task</button>
        </form>
        {modalVisible && (
          <div className="modal">
            <div className="modal-content">
              <span className="close" onClick={closeModal}>
                &times;
              </span>
              <p>{modalContent}</p>
            </div>
          </div>
        )}
        </div>
    </>
}

export default ViewJob;