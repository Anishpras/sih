import { createContext, ReactNode, useState } from "react";
import Web3Modal from "web3modal";
import { ethers } from "ethers";
import { create as ipfsHttpClient } from "ipfs-http-client";

import {
  arbitrationCentreAddress,
  arbitrationCentreABI,
} from "../utils/constants";
//@ts-ignore
const client = ipfsHttpClient("https://ipfs.infura.io:5001/api/v0");

const fetchContract = (
  signerOrProvider: ethers.Signer | ethers.providers.Provider | undefined
) =>
  new ethers.Contract(
    arbitrationCentreAddress,
    arbitrationCentreABI,
    signerOrProvider
  );

export const ArbitrationCentreCasesContext = createContext<
  null | undefined | any
>(null);

export const ArbitrationCentreBlockchainCasesProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [currentAccount, setCurrentAccount] = useState("");
  const [error, setError] = useState("");

  const [arbitrationCentreCases, setArbitrationCentreCases] = useState([]);
  const [myCase, setMyCases] = useState([]);

  const [allAddress, setAllAddress] = useState([]);

  const checkIfWalletIsConnected = async () => {
    if (!window.ethereum) return setError("Please Install MetaMask");

    const account = await window.ethereum.request({ method: "eth_accounts" });

    if (account.length) {
      setCurrentAccount(account[0]);
    } else {
      setError("Please Install MetaMask & Connect, Reload");
    }
  };

  const connectWallet = async () => {
    if (!window.ethereum) return setError("Please Install MetaMask");

    const account = await window.ethereum.request({
      method: "eth_requestAccounts",
    });

    setCurrentAccount(account[0]);
  };

  const caseDetails = async (message: any) => {
    try {
      //CONNECTING SMART CONTRACT
      const web3Modal = new Web3Modal();
      const connection = await web3Modal.connect();
      const provider = new ethers.providers.Web3Provider(connection);
      const signer = provider.getSigner();
      const contract = await fetchContract(signer);

      const data = JSON.stringify({ message });
      const added = await client.add(data);

      const url = `https://ipfs.infura.io/ipfs/${added.path}`;
      console.log(url);

      const addCase = await contract.addCase(message);
      addCase.wait();
      console.log(addCase);
    } catch (error) {
      setError("something wrong creating list");
    }
  };

  const getCaseDetailsList = async () => {
    try {
      //CONNECTING SMART CONTRACT
      const web3Modal = new Web3Modal();
      const connection = await web3Modal.connect();
      const provider = new ethers.providers.Web3Provider(connection);
      const signer = provider.getSigner();
      const contract = await fetchContract(signer);

      //GET DATA
      const getAllAddress = await contract.getAddress();
      setAllAddress(getAllAddress);
      console.log(getAllAddress);

      const allMessage = await contract.getCaseData();
      setMyCases(allMessage);
    } catch (error) {
      setError("Something wrong while getting the data");
    }
  };
  return (
    <ArbitrationCentreCasesContext.Provider
      value={{
        checkIfWalletIsConnected,
        connectWallet,
        caseDetails,
        arbitrationCentreCases,
        currentAccount,
        getCaseDetailsList,
        error,
        allAddress,
        myCase,
      }}>
      {children}
    </ArbitrationCentreCasesContext.Provider>
  );
};
