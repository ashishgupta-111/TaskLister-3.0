import { useState } from "react";
import Navigation from "../components/Navigation";
const CreateJob =({state})=>{
    const [modalOpen, setModalOpen] = useState(false);
    const [modalContent, setModalContent] = useState("");

    const closeModal = () => {
        setModalOpen(false);
        setModalContent("");
      };
    const createJob = async(event)=>{
        event.preventDefault();
        const {contract,account}=state
        const jobName = document.querySelector('#jobName').value
        const jobDate = document.querySelector('#jobDate').value

        try{
            const res = await fetch("http://localhost:3000/api/ethereum/create-job",{
                method:"POST",
                headers:{
                    "content-type":"application/json"
                },
                body:JSON.stringify({jobDate:jobDate})
            })
            const data = await res.json()
            if(data.status === 200){
                if(contract && contract.methods){
                    await contract.methods
                    .createJob(jobName,jobDate)
                    .send({from:account})
                    setModalContent(`Task ${jobName} added at ${jobDate}`);
                }
            }else{
                alert("Job can not be added")
            }
        }catch(error){
            setModalContent(`Task already exists at ${jobDate}`);
          } finally {
            setModalOpen(true);
          }
    }
    return<>
        <Navigation/>
        <div className="create_task todo_btn">

        <form onSubmit={createJob}>
            <label>
            Name:
            <input id="jobName" />
            </label>
            <br />
            <label>
            Date:
            <input id="jobDate" type="date"/>
            </label>
            <button type="submit">Create Job</button>
        </form>
        {modalOpen && (
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

export default CreateJob;