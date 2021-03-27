import React from 'react';
import { useRouteMatch } from 'react-router';
import {
  Message,
  Home,
  Notification,
  Search,
  Twitter,
} from '../../assets/icons/index';
import { Link } from 'react-router-dom';
import { format, parseISO } from 'date-fns';
import { motion } from 'framer-motion';

export const Tweet = ({ avatarUrl, date, name, text }) => (
  <motion.li layout transition={{ duration: 0.5 }} className='tweet'>
    <img src={avatarUrl} alt={name} loading='lazy' />
    <div className='tweet__content'>
      <h3>
        {name} <span> {format(parseISO(date), 'MMM d')}</span>
      </h3>
      <p>{text}</p>
    </div>
  </motion.li>
);

export const NewPostButton = ({ onClick, className = 'new-post' }) => (
  <motion.div
    initial={{ y: -40, opacity: 0.2 }}
    animate={{ y: 0, opacity: 1 }}
    transition={{ duration: 0.3 }}
    onClick={onClick}
    className={className}
  >
    <span>New Post</span>
  </motion.div>
);

export const Header = () => (
  <header className='mobile-frame__header'>
    <img height='20px' src={Twitter} alt='home' />
  </header>
);

export const Loader = () => <div className='loader center'></div>;

export const Footer = () => {
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
