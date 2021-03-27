import React, { useEffect, useState } from 'react';
import './style.scss';
import server from './server';
import { Route, Switch, useRouteMatch } from 'react-router';
import { motion } from 'framer-motion';
import useBufferedTweets from './useBufferTweets';
import {
  Footer,
  Header,
  Loader,
  NewPostButton,
  Tweet,
} from './tweetComponents';

const TweetBuffer = () => {
  let { path } = useRouteMatch();
  let { mainRef, data, error, stale, update } = useBufferedTweets(
    '/api/tweets'
  );

  useEffect(() => {
    setInterval(() => {
      server.create('tweet');
    }, 3000);
  }, []);

  return (
    <section className='tweerbuffer'>
      <div className='mobile-frame' ref={mainRef}>
        <Header />
        {!data ? (
          <Loader />
        ) : (
          <Switch>
            <Route exact path={path}>
              {stale && <NewPostButton onClick={update} />}
              <motion.ul
                initial={{ y: -50 }}
                animate={{ y: 0 }}
                transition={{ duration: 0.5 }}
                className='tweet-list'
              >
                {[...data?.tweets].reverse().map((tweet) => (
                  <Tweet {...tweet} key={tweet.id} />
                ))}
              </motion.ul>
            </Route>
            <Routes path={`${path}/search`} content='Search' />
            <Routes path={`${path}/notification`} content='Notification' />
            <Routes path={`${path}/message`} content='Message' />
          </Switch>
        )}
        <Footer />
      </div>
    </section>
  );
};

const Routes = ({ path, content }) => (
  <Route path={path}>
    <p className='center'>{content}</p>
  </Route>
);

export default TweetBuffer;
