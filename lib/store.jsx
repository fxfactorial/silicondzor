import { extendObservable } from 'mobx';

export default new (class {

  constructor() {
    extendObservable(this, {
      credentials: {
        username: '', password: ''
      },
      logged_in: false,
      karma_points: 0,
      user_articles: []
    });
  }
});
