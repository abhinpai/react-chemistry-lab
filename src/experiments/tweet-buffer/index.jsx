import React, { useEffect, useState } from 'react';
import useSwr from 'swr';
import './style.scss';
import server from './server';
import { Route, Switch, useRouteMatch } from 'react-router';
import { Link } from 'react-router-dom';
import { format, parseISO } from 'date-fns';
import {
  Message,
  Home,
  Notification,
  Search,
  Twitter,
} from '../../assets/icons/index';

const fetcher = (url) => fetch(url).then((res) => res.json());

const useBufferedTweets = (url) => {
  const { error, data } = useSwr(url, fetcher, {
    refreshInterval: 3000,
  });
  let [buffer, setBuffer] = useState(data);
  if (data && !buffer) setBuffer(data);

  return {
    data: buffer,
    error,
    stale: buffer !== data,
    update: () => setBuffer(data),
  };
};

const TweetBuffer = () => {
  let { path } = useRouteMatch();
  let { data, error, stale, update } = useBufferedTweets('/api/tweets');

  useEffect(() => {
    setInterval(() => {
      server.create('tweet');
    }, 3000);
  }, []);

  return (
    <section className='tweerbuffer'>
      <div className='mobile-frame'>
        <header className='mobile-frame__header'>
          <img height='20px' src={Twitter} alt='home' />
        </header>
        {!data ? (
          <p className='center'>Loading...</p>
        ) : (
          <Switch>
            <Route exact path={path}>
              <div>
                {stale && <NewPostButton onClick={update} />}
                <div>
                  {data?.tweets.map((tweet, index) => (
                    <Tweet
                      avatarUrl={tweet.avatarUrl}
                      name={tweet.name}
                      date={tweet.date}
                      text={tweet.text}
                      useName={tweet.username}
                      key={index}
                    />
                  ))}
                </div>
              </div>
            </Route>
            <Route path={`${path}/search`}>
              <p className='center'>Search</p>
            </Route>
            <Route path={`${path}/notification`}>
              <p className='center'>Notification</p>
            </Route>
            <Route path={`${path}/message`}>
              <p className='center'>Message</p>
            </Route>
          </Switch>
        )}
        <Footer />
      </div>
    </section>
  );
};

const NewPostButton = ({ onClick }) => (
  <div className='new-post' onClick={onClick}>
    <span>New Post</span>
  </div>
);

const Footer = () => {
  let { url } = useRouteMatch();
  return (
    <footer className='mobile-frame__footer'>
      <Link to={`${url}`}>
        <img src={Home} alt='home' />
      </Link>
      <Link to={`${url}/search`}>
        <img src={Search} alt='search' />
      </Link>
      <Link to={`${url}/notification`}>
        <img src={Notification} alt='notification' />
      </Link>
      <Link to={`${url}/message`}>
        <img src={Message} alt='Message' />
      </Link>
    </footer>
  );
};

const Tweet = ({ avatarUrl, date, name, text, useName }) => (
  <div className='tweet'>
    <img src={avatarUrl} alt={name} loading='lazy' />
    <div className='tweet__content'>
      <h3>
        {name} <span> {format(parseISO(date), 'MMM d')}</span>
      </h3>
      <p>{text}</p>
    </div>
  </div>
);

export default TweetBuffer;
