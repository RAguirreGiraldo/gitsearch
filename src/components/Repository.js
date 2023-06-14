import React from 'react'

function Repository(props) {

  const { repo } = props;
  return (
    <div className='repo'>
        <div>
            <a href={repo.url}>{repo.name}</a>
        </div>
        <div>
            <span>{repo.created_at}</span>
        </div>
    </div>
  )
}

export default Repository 