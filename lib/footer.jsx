import React from 'react';
import styled from 'styled-components';

import colors from './colors';
import { StyledLink, BottomFooter, SearchBar } from './with-style';

const source_s = {
  paddingLeft: '20px', fontWeight: 300, color: colors.site_colors.title
};

export default () => (
  <BottomFooter>
    <section>

      <section>
        <StyledLink to={'/guidelines'}>Guidelines</StyledLink>
        <StyledLink to={'/faq'}>FAQ</StyledLink>
        <a style={source_s}
           href={'https://github.com/fxfactorial/silicondzor'}>
          Source code
        </a>
      </section>

    </section>

    <SearchBar>
      <p>Search: </p>
      <input type={'search'}/>
    </SearchBar>
  </BottomFooter>
);
