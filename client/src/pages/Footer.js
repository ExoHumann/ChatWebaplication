import React from 'react'
import AcUnitIcon from '@mui/icons-material/AcUnit';

function Footer() {
    return (
        <div style={{
            height: '80px', display: 'flex',
            flexDirection: 'column', alignItems: 'center',
            justifyContent: 'center', fontSize:'2rem',
            color :'red'
        }}>
           <p> Happy Coding   <AcUnitIcon type="smile" /></p>
        </div>
    )
}

export default Footer