import React from 'react';

const Certificate = ({certDetails, handleShowCert})=>{
    
    return (
        <div>
            {JSON.stringify(certDetails)}
            <button onClick={handleShowCert}>Powrót</button> 
            <button>tranfer - jeszcze nie działa</button>
        </div>
    )
}
export default Certificate;