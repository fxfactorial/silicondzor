import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import colors from './colors';

export default class Footer extends Component {
  render () {
    return (
      <footer>
        <div/>
        <section>

          <section>
            <Link to={'/guidelines'}>Guidelines</Link> |
            <Link to={'/faq'}>FAQ</Link> |
            <a href={'https://github.com/fxfactorial/silicondzor'}>Source code</a>
          </section>

        </section>

        <section>
          <p>Search:</p>
          <input type={'search'}/>
        </section>
      </footer>
    );
  }
};
