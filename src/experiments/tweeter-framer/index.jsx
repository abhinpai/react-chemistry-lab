import React from 'react';
import { format } from 'date-fns';
import { Twitter } from '../../assets/icons/index';
import './style.scss';
import Avatar from '../../assets/avatar.png';
import { add, parseISO } from 'date-fns';
import faker, { image, name, internet, lorem, random, fake } from 'faker';
import { Route, Switch, useRouteMatch } from 'react-router';
let startingDate = parseISO('2021-03-26');

let tweets = [];

for (let i = 0; i < 10; i++) {
  tweets.push({
    id: random.uuid(),
    name: name.firstName(),
    username: internet.userName(),
    post: lorem.sentence(),
    date: startingDate.toISOString(),
  });
}

const TweeterFramer = () => {
  let { path } = useRouteMatch();

  return (
    <main className='tweeter-clone'>
      <div className='mobile-frame'>
        <header className='mobile-frame__header'>
          <img height='20px' src={Twitter} alt='home' />
        </header>

        <Switch>
          <Route exact path={path}>
            <ul>
              {tweets.map((tweet) => (
                <Tweet
                  onClick={() =>
                    console.log('Hello')
                    // window.history.pushState(
                    //   // { scrollPosition: mainRef.current.scrollTop },
                    //   null,
                    //   '/tweetermotion/' + tweet.id
                    // )
                  }
                  key={tweet.id}
                  {...tweet}
                />
              ))}
            </ul>
          </Route>
          <Route path={`${path}/:tweetId`}>
            <p>Hello</p>
          </Route>
        </Switch>
      </div>
    </main>
  );
};

const Tweet = ({ id, avatar, date, name, post, onClick }) => (
  <li className='tweet' data-id={id} onClick={onClick}>
    <img src={Avatar} alt={name} loading='lazy' />
    <div className='tweet__content'>
      <h3>
        {name} <span> {format(parseISO(date), 'MMM d')}</span>
      </h3>
      <p>{post}</p>
    </div>
  </li>
);

export default TweeterFramer;
