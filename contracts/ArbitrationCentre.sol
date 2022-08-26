// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;
 contract ArbitrationCentre{
    uint public _idUser;
    address public ownerOfContract;

    address[] public arbitrationCentres;
     string[] public caseDetail;
     uint256[] public caseDetailId;

struct ArbitrationCentreCase{
    address arbitrationCentre;
    uint256 arbitrationCentreId;
    string caseDetail;
}

event ArbitrationCentreCasesEvent(
    address indexed arbitrationCentre,
    uint256 indexed ArbitrationCentreId,
    string caseDetail

);

mapping (address => ArbitrationCentreCase) public ArbitrationCentreCases;

constructor(){
    ownerOfContract = msg.sender;
}
function inc() internal {
    _idUser++;
}

function addCase(string calldata _message) external{
    inc();
    uint256 idNumber = _idUser;
    ArbitrationCentreCase storage caseData = ArbitrationCentreCases[msg.sender];


    caseData.arbitrationCentre = msg.sender;
    caseData.caseDetail = _message;
    caseData.arbitrationCentreId = idNumber;

    arbitrationCentres.push(msg.sender);
    caseDetail.push(_message);
    caseDetailId.push(idNumber);

emit ArbitrationCentreCasesEvent(msg.sender, caseData.arbitrationCentreId, _message);
}

function getArbitrationCentreData(address _address) public view returns(
    address, uint256,string memory
){
    ArbitrationCentreCase memory singleCaseData = ArbitrationCentreCases[_address];
    return (
        singleCaseData.arbitrationCentre,
        singleCaseData.arbitrationCentreId,
        singleCaseData.caseDetail
    );
}

function getAddress() external view returns (address[] memory){
    return arbitrationCentres;
}

function getCaseData() external view returns (string[] memory){
    return caseDetail;
}

 }