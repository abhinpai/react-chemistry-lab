import { createServer, Model, Factory, trait } from 'miragejs';
import { add, parseISO } from 'date-fns';
import faker, { name, internet, lorem, random } from 'faker';
import Avatar from '../../assets/avatar.png';

faker.seed(123);

let startingDate = parseISO('2021-03-26');
let server = createServer({
  timing: 1000,
  models: {
    tweet: Model,
  },

  factories: {
    tweet: Factory.extend({
      id() {
        return random.uuid();
      },
      name() {
        return name.findName();
      },

      username() {
        return internet.userName();
      },

      text() {
        return lorem.sentence();
      },

      avatarUrl() {
        return Avatar;
      },

      date(i) {
        return add(startingDate, { days: i }).toISOString();
      },

      fromAbhin: trait({
        name: 'Abhin Pai',
        username: 'abhinpai',
        avatarUrl: 'https://avatars0.githubusercontent.com/u/15942876',
      }),
    }),
  },

  routes() {
    this.namespace = 'api';
    this.get('tweets');

    this.passthrough();
  },

  seeds(server) {
    server.create('tweet', 'fromAbhin', { text: 'just setting up my twttr' });
    server.create('tweet', 'fromAbhin', { text: 'Hi' });
    server.create('tweet', 'fromAbhin', {
      text: "I still don't understand useEffect",
    });
  },
});

// setInterval(() => {
//   server.create('tweet');
// }, 200);

export default server;
