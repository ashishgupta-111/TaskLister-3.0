import Navigation from "../components/Navigation";
import {useState} from "react";
const DeleteJob = ({state})=>{
    const [modalVisible, setModalVisible] = useState(false);
    const [modalContent, setModalContent] = useState("");
   
    const{contract,account}=state
    const deleteJob = async(event)=>{
        event.preventDefault()
        const jobID = document.querySelector("#jobID").value
        try{
            const res = await fetch(`http://localhost:3000/api/ethereum/delete-job/${jobID}`,{
                method:"DELETE",
                headers:{
                    "content-type":"application/json"
                }
            })
            const data = await res.json()
            if(data.status === 200){
                await contract.methods.deleteJob(jobID).send({from:account})
                setModalContent(
                    `Job ID ${jobID} deleted from Job list`
                  );
                  setModalVisible(true);
            }else{
                throw new Error("Job can not be deleted because it is a priority job")
            }
        }catch(error){
            setModalContent("Task cannot be updated");
            setModalVisible(true);
        }
    }
    const closeModal = () => {
        setModalVisible(false);
        setModalContent("");
      };
  return (
    <>
      <Navigation />
      <div className="delete_task todo_btn">
      <form onSubmit ={deleteJob}>
            <label>
                ID:
                <input id="jobID"/>
            </label>    
            <button type="submit">Delete Job</button>
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

export default DeleteJob;
