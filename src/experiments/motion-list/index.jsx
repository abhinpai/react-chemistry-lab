import React from 'react';
import { lorem, random } from 'faker';
import './style.scss';
import { AnimatePresence, motion } from 'framer-motion';
import { upvoteIcon, closeIcon } from './icons';

const posts = [
  {
    id: random.uuid(),
    post: lorem.sentence(),
    vote: 0,
    completed: false,
  },
  {
    id: random.uuid(),
    post: lorem.sentence(),
    vote: 0,
    completed: false,
  },
  {
    id: random.uuid(),
    post: lorem.sentence(),
    vote: 0,
    completed: false,
  },
  {
    id: random.uuid(),
    post: lorem.sentence(),
    vote: 0,
    completed: false,
  },
  {
    id: random.uuid(),
    post: lorem.sentence(),
    vote: 0,
    completed: false,
  },
];

function MotionList() {
  const [postsList, setPostzlist] = React.useState(posts);
  const [completedPost, setCompletedPost] = React.useState(0);

  const onUpVote = (postId) => {
    setPostzlist(
      postsList.map((post) => {
        if (postId === post.id) post.vote++;
        return post;
      })
    );
  };

  const onCompleted = (postId) => {
    setPostzlist(
      postsList.map((post) => {
        if (postId === post.id) {
          post.completed = true;
          setCompletedPost(completedPost + 1);
        }
        return post;
      })
    );
  };

  return (
    console.log(completedPost),
    (
      <main className='motion-list'>
        <Reload />
        <motion.ul
          initial={{ y: 100, opacity: 0.2 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          {completedPost === postsList.length && <NoPendingItems />}
          {postsList
            .filter((post) => !post.completed)
            .sort((post1, post2) => post2.vote - post1.vote)
            .map((post) => (
              <motion.li layout key={post.id}>
                <button onClick={() => onUpVote(post.id)}>
                  {upvoteIcon}
                  <span className='votes'>
                    <AnimatePresence>
                      {/* <motion.span
                        key={post.vote}
                        className='number'
                        initial={{ y: 4, opacity: 0.5, scale: 0.5 }}
                        animate={{ y: 0, opacity: 1, scale: 1 }}
                        exit={{ y: -4, scale: 0.5, opacity: 0 }}
                        style={{ position: 'absolute' }}
                      > */}
                      <span>{post.vote}</span>
                      <motion.span
                        key={post.vote}
                        className='increment'
                        initial={{ x: 4, opacity: 0.5 }}
                        animate={{ x: -10, opacity: 0 }}
                        transition={{ duration: 0.5 }}
                        style={{ position: 'absolute' }}
                      >
                        +
                      </motion.span>
                      {/* </motion.span> */}
                    </AnimatePresence>
                  </span>
                </button>
                <p> {post.post}</p>
                <div
                  onClick={() => onCompleted(post.id)}
                  className='comple-task'
                >
                  {closeIcon}
                </div>
              </motion.li>
            ))}
        </motion.ul>
      </main>
    )
  );
}

const NoPendingItems = () => (
  <motion.div
    initial={{ y: 100, opacity: 0.2 }}
    animate={{ y: 0, opacity: 1 }}
    transition={{ duration: 0.5 }}
    className='no-pending-items'
  >
    Left with no pending item!
  </motion.div>
);

const Reload = () => (
  <div className='reload' onClick={() => window.location.reload()}>
    Reload
  </div>
);

export default MotionList;
