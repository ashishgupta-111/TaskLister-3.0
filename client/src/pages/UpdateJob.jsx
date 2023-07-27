import Navigation from "../components/Navigation";
import {useState} from "react";
const UpdateJob = ({state}) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [modalContent, setModalContent] = useState("");

  const closeModal = () => {
    setModalVisible(false);
    setModalContent("");
  };
    const {contract,account}=state;
    const updateJob = async(event)=>{
        event.preventDefault()
        const jobName = document.querySelector("#jobName").value
        const jobDate = document.querySelector('#jobDate').value
        const jobID = document.querySelector("#jobID").value

        try{
            const res = await fetch("http://localhost:3000/api/ethereum/update-job",{
                method:"POST",
                headers:{
                    "content-type":"application/json"
                },
                body:JSON.stringify({jobDate:jobDate})
            })
            const data = await res.json()
            console.log(data)
            if(data.status === 200){
                await contract.methods.updateJob(jobID,jobName,jobDate).send({from:account})
                setModalContent(
                  `Job ID ${jobID} updated with Job name ${jobName} and date ${jobDate}`
                );
                setModalVisible(true);
            }else{
                throw new Error("Job Can not be updated because of dateclash")
            }
        }catch(error){
          setModalContent("Task cannot be updated");
          setModalVisible(true);
        }
    }
  return (
    <>
      <Navigation />
      <div className="update_task todo_btn">
      <form onSubmit={updateJob}>
          <label>
            ID:
            <input id="jobID" />
          </label>
          <label>
            Name:
            <input id="jobName" />
          </label>
          <label>
            Date:
            <input id="jobDate" type="date" />
          </label>
          <button type="submit">Update Job</button>
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
  );
};

export default UpdateJob;
