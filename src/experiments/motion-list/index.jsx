import React from 'react';
import { lorem, random } from 'faker';
import './style.scss';
import { motion } from 'framer-motion';

const posts = [
  {
    id: random.uuid(),
    post: lorem.sentence(),
    vote: 0,
  },
  { id: random.uuid(), post: lorem.sentence(), vote: 0 },
  { id: random.uuid(), post: lorem.sentence(), vote: 0 },
  { id: random.uuid(), post: lorem.sentence(), vote: 0 },
  { id: random.uuid(), post: lorem.sentence(), vote: 0 },
];

function index() {
  return (
    <main className='motion-list center'>
      <Reload />
      <ul>
        {posts.map((post, key) => (
          <li key={post.id}>
            <button>
              <span>{post.vote}</span>
            </button>
            <p> {post.post}</p>
          </li>
        ))}
      </ul>
    </main>
  );
}

const Reload = () => (
  <button className='reload' onClick={() => window.location.reload()}>
    Reload
  </button>
);

export default index;
