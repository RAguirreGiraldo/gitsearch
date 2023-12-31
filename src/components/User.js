import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Repository from './Repository';

const API_URL = 'https://api.github.com/users/';

function User() {
  const { userName } = useParams();

  const [githubUser, setgithubUser] = useState({});
  const [repositories, setRepositories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {

    //const token = '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';
    //const options = {headers: { Authorization: `Bearer ${token}`}};

     const getGithubUser = async () => {
         try {
            // const {data} = await axios.get(`${API_URL}${userName}`, options); 
             const {data} = await axios.get(`${API_URL}${userName}`); 
             setgithubUser(data); 
             
         } catch (error) {
             setgithubUser({});
         }
     } 

     const getUserRepos = async () => {
        try {
            //const {data} = await axios.get(`${API_URL}${userName}/repos`, options); 
            const {data} = await axios.get(`${API_URL}${userName}/repos`); 
            setRepositories(data);            
        } catch (error) {
            setgithubUser([]);
        }
      } 
 
     if (userName) 
     {
        getGithubUser();
        getUserRepos();
        setIsLoading(false);
     }
   }, [userName]);

  return (   
    <div className="user">
      { !isLoading && 
        <div className="user-profile">
          <div className="user-avatar">
            <img src={githubUser.avatar_url}></img>
          </div>  
            <div className ="user-name">
              <h2>{githubUser.name}</h2>
            </div>
            <div className='user-stats'>
              <div>
                <span>{githubUser.public_repos}</span>
                <h3>Repositories</h3>
              </div>
              <div>
                <span>{githubUser.followers}</span>
                <h3>Followers</h3>
              </div>
              <div>
                <span>{githubUser.following}</span>
                <h3>Following</h3>
              </div>
            </div>
          
          <div className='user-repos'>
            <h2>My Repositories</h2>
            <div>          
              {repositories.map( repository => (
                <Repository 
                    key={repository.id} 
                    repo={repository} 
                />     
              ))}
             </div>
          </div>
        </div>
      }
      { isLoading && <h2>Loading User data...</h2>}
    </div>   
  )
}

export default User