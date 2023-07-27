import Web3 from "web3";
import ABI from "./ABI.json";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
const Wallet = ({ saveState }) => {
  const navigateTo = useNavigate();
  const connectWallet = async () => {
    try {
      if (window.ethereum) {
        const web3 = new Web3(window.ethereum);
        const accounts = await window.ethereum.request({
          method: "eth_requestAccounts",
        });
        const contractAdress = "0x628cb87b50f7b5eec6141e0abdae54ecb75ad69d";
        const contract = new web3.eth.Contract(ABI, contractAdress);
        saveState({ web3: web3, contract: contract, account: accounts[0] });
        navigateTo("/view-all-Jobs");
      } else {
        throw new Error();
      }
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <>
      <div className="wallet_header ">
          <span>WELCOME TO</span> <p>TaskLister 3.0</p>
        </div>
        <div className="connect_wallet_section todo_btn">
          <p> Please connect metamask wallet to access the app </p>
          <button onClick={connectWallet}>Connect Wallet</button>
      </div>
    </>
  );
};
Wallet.propTypes = {
  saveState: PropTypes.func.isRequired,
};
export default Wallet;
