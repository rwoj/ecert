import React from 'react';

import Badge from '@material-ui/core/Badge';

const CertificatesList = ({certificates, showCert})=>{
    const noOfCert = certificates.length > 0
        ? certificates.length
        : 0
    const listOfCert = certificates.map((x)=>
                        <li key={x}>kod:{x} 
                            <button onClick={() => showCert(x)}>szczegóły</button> 
                        </li>)

    return (
        <div>
            <Badge color="primary" badgeContent={noOfCert}>
                <h2>Lista wystawionych certyfikatów:</h2>
            </Badge>
            <ol>
                {listOfCert}
            </ol>
        </div>
    )
}
export default CertificatesList;