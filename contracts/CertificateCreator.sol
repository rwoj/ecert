pragma solidity ^0.4.24;

import "./Certificate.sol";

contract CertificateCreator{
    //dynamic array with addresses of deployed certificates
    address[] public certificates; 

    function createCertificate(uint _quantity) public {
        address newCertificate = new Certificate(msg.sender, _quantity);
        certificates.push(newCertificate);
    }
    function getCertAddress(uint _index) public view returns(address certAddress){
        return certificates[_index];
    }
    function howManyCert() public view returns (uint length){
        return certificates.length;
    }
}