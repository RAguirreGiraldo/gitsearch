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
            //const token = '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';
            //const options = {headers: { Authorization: `Bearer ${token}`}};
            //const {data} = await axios.get(`${API_URL}${userName}`, options); 
            const {data} = await axios.get(`${API_URL}${userName}`); 
            console.log(data);
            /// redirect to user repos.
            redirect(`/gitsearch/user/${userName}`);            
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