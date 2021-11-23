// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.9;

contract HealthCare {

    address private hospitalAdmin;
    address private labAdmin;
    uint public imageCount = 0;
    mapping (uint => Record) public records;

    struct Record {
        uint id;
        uint signatureCount;
        string patientName;
        string date;
        string hospitalName;
        address pAddr;
        string Hash;
        bool HA;
        bool LA;
    }

    modifier signOnly {
        require (msg.sender == hospitalAdmin || msg.sender == labAdmin );
        _;
    }
    constructor() {
        hospitalAdmin = 0x06e8A48a3bDEc373a2b702A467D03bc4B1ac6146;
        labAdmin = 0x3a18eb97AbaFF86a088A218972Bd4B8F437b6B2e;
    }

    event recordCreated(uint ID, string patientName, string date, string hospitalName);
    event recordSigned(uint ID, string patientName, string date, string hospitalName);
    
    // Create new record
    function newRecord (string memory _imgHash,string memory _pName, string memory _hName, string memory _Date ) public{
         require(bytes(_imgHash).length > 0);
             imageCount ++;
             records[imageCount] = Record(imageCount,0,_pName,_Date,_hName,msg.sender,_imgHash,false,false);


        emit  recordCreated(imageCount, _pName, _Date, _hName);
    }

    // Function to sign a record 
    function signRecord(uint _id) signOnly public {
        require(_id > 0 && _id <= imageCount);
        Record memory record = records[_id];
        if(msg.sender == hospitalAdmin){
            require(!record.HA);
            record.HA = true;
        }
        if(msg.sender == labAdmin){
            require(!record.LA);
            record.LA = true;
        }
        record.signatureCount++;
        records[_id] = record;

        // Checks if the record has been signed by both the authorities to process insurance claim
        if(record.signatureCount == 2)
            emit  recordSigned(_id, record.patientName, record.date, record.hospitalName);

    }
}
