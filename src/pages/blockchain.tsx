import React, { useContext, useEffect } from "react";
import { ArbitrationCentreCasesContext } from "../context/ArbitrationCentreBlockchain";

const Blockchain = () => {
  const {
    checkIfWalletIsConnected,
    connectWallet,
    caseDetails,
    arbitrationCentreCases,
    currentAccount,
    getCaseDetailsList,
    error,
    allAddress,
    myCase,
  } = useContext(ArbitrationCentreCasesContext);

  useEffect(() => {
    checkIfWalletIsConnected();
    getCaseDetailsList();
    console.log(arbitrationCentreCases);
  }, []);

  return (
    <div>
      blockchain
      {!currentAccount ? (
        <button onClick={() => {}}>Connect Wallet</button>
      ) : (
        <button onClick={() => connectWallet()}>
          {currentAccount.slice(0, 20)}..
        </button>
      )}
    </div>
  );
};

export default Blockchain;
