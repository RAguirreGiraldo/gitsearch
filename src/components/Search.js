import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useNavigate } from "react-router-dom";

const API_URL = 'https://api.github.com/users/';

function Search() {
  const [userName, setUserName] = useState('');
  const [message, setMessage] = useState('');
  const redirect = useNavigate()

  function findUser(event)
  {
     event.preventDefault();
     setUserName(event.target.user.value.trim());
     event.target.user.value = '';    
  }

  useEffect(() => {
   const getGithubUser = async () => {
        try {
            const token = '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';
            const options = {headers: { Authorization: `Bearer ${token}`}};
            const {data} = await axios.get(`${API_URL}${userName}`, options); 
            console.log(data);
            /// redirect to user repos.
            redirect(`/user/${userName}`);            
        } catch (error) {
            console.error(error);
            setMessage('User not found');
        }
    } 

    if (userName) getGithubUser();
  }, [userName]);

  return (
    <div className='search'>
        <h1>
          Search for a github user to find the repos!
        </h1>
        <div>
            <form onSubmit={findUser}>
                <input type="text" name='user' placeholder='Github User Name...'/>
                <input type="submit" value="Search"/>
            </form>
        </div>
        <h2>{message}</h2>
    </div>
  )
}

export default Search