import React from 'react'
import { useNavigate } from 'react-router-dom'
import { CustomButton } from '../components'
import { useLogout } from '../hooks/useLogout'

const Profile = () => {
  const {logout} = useLogout()
  const navigate = useNavigate()

  const handleClick = () => {
    logout()
    navigate("/")
  }
  return (
    <div>
      Profile
      <CustomButton text="Log out" handleClick={handleClick} style="bg-black"/>
    </div>
  )
}

export default Profile
