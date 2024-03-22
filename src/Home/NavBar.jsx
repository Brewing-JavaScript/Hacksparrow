

import React from 'react'
import { useNavigate } from 'react-router'



const NavBar = () => {

    const navigate = useNavigate()
    return (
        <div className=' p-4 w-full flex items-center justify-between h-[32]'>
            <div>
                Logo
            </div>
            <div className='flex gap-4'>
                {
                    JSON.parse(sessionStorage.getItem('status')) == 'college' && <button onClick={() => navigate('/college-portal/add-company')} className='btn'>Add placement</button>}
                {
                    JSON.parse(sessionStorage.getItem('status')) == 'college' && <button onClick={() => navigate('/college-portal/register-company')} className='btn'>Register Company</button>}

            </div>
        </div>

    )
}

export default NavBar