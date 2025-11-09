import { AuthState } from '@/context/auth-context/Auth-Context';
import React, { useContext, useEffect } from 'react'
import { Button } from '../ui/button';
import { LogOut } from 'lucide-react';

function InstructorLogout() {
    const { handleOnLogout } = useContext(AuthState);

    return (
        <>
            <Button onClick={handleOnLogout} className={""}>
                Logout
                <LogOut className='mr-2 h-4 w-4' />
            </Button>
        </>
    )
}

export default InstructorLogout