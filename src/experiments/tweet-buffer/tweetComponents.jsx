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

export const Tweet = ({ avatarUrl, date, name, text, useName }) => (
  <li className='tweet'>
    <img src={avatarUrl} alt={name} loading='lazy' />
    <div className='tweet__content'>
      <h3>
        {name} <span> {format(parseISO(date), 'MMM d')}</span>
      </h3>
      <p>{text}</p>
    </div>
  </li>
);

export const NewPostButton = ({ onClick, className = 'new-post' }) => (
  <div onClick={onClick} className={className}>
    <span>New Post</span>
  </div>
);

export const Header = () => (
  <header className='mobile-frame__header'>
    <img height='20px' src={Twitter} alt='home' />
  </header>
);

export const Loader = () => (
  <div className="loader center"></div>
)

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
