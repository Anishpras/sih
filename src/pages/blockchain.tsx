import React, { useContext, useEffect, useState } from "react";
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

  const [caseValue, setCaseValue] = useState("");

  useEffect(() => {
    checkIfWalletIsConnected();
    getCaseDetailsList();
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
      <input
        type="text"
        value={caseValue}
        onChange={(e) => setCaseValue(e.target.value)}
      />
      <button onClick={() => caseDetails(caseValue)}>Submit</button>
      <button onClick={() => console.log(myCase)}>Get Case Detail</button>
    </div>
  );
};

export default Blockchain;
