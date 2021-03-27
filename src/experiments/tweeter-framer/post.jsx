import React from 'react';

const Post = ({ tweet }) => {
  return (
    <div className='tweet'>
      <img src={Avatar} alt={name} loading='lazy' />
      <div className='tweet__content'>
        <h3>
          {name} <span> {format(parseISO(date), 'MMM d')}</span>
        </h3>
        <p>{post}</p>
      </div>
    </div>
  );
};

export default Post;
