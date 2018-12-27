pragma solidity ^0.5.0;

import "./Certificate.sol";

contract CertificateCreator{
    //dynamic array with addresses of deployed certificates
    address[] public certificates; 

    function createCertificate(uint _quantity, string memory _descr, uint _liczba) public {
        address newCertificate = address(new Certificate(msg.sender, _quantity, _descr, _liczba));
        certificates.push(newCertificate);
    }
    function getCertAddress(uint _index) public view returns(address certAddress){
        return certificates[_index];
    }
    function howManyCert() public view returns (uint length){
        return certificates.length;
    }
}