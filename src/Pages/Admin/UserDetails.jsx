import React from 'react'
import UserDetailComponent from '../../Components/Admin/UserDetails/UserDetailsComponent'
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import axios from '../../utils/axios';
import Courses from '../../Components/Admin/Courses/Courses';

const UserDetails = () => {
  const { id } = useParams();
  const [user, setUser] = useState({});
  const token = useSelector(state => state.token);

  const getUser = async () => {
    try {
      const { data } = await axios.get(`admin/user_profile/${id}`, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${token}`,
        },
      })
      setUser(data);
    } catch (err) {
      
    }
  }
  useEffect(() => {
    getUser()
  },[id])

  return (
    <>
    <UserDetailComponent user={user}/>
    <Courses />
    </>
  )
}

export default UserDetails