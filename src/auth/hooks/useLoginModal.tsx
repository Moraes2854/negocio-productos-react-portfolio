import React, { useState } from 'react'

export const useLoginModal = () => {
    
    const [loginForm, setLoginForm] = useState({
        email:'',
        password:''
    })

    const handleFormChange = (e:React.ChangeEvent<HTMLInputElement>) => {
        setLoginForm({
          ...loginForm,
          [e.target.name]:e.target.value,
        });
    }

    return {
        loginForm,
        handleFormChange,
    }
}
