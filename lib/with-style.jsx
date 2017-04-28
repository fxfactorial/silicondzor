import colors from './colors';
import styled from 'styled-components';
import { NavLink } from 'react-router-dom';

const StyledLink = styled(NavLink)`
  padding-left: 20px;
  font-weight: 300;
  color: ${colors.site_colors.title};
`;

const NavLinks = styled.ul`
  display: flex;
  list-style-type: none;
`;

const NewsWrapper = styled.div`
  padding-top: 20px;
  padding-left: 20px;
  padding-right: 20px;
  min-height: 625px;
  overflow-y: scroll;
  background-color: ${colors.site_colors.cards};
`;

const NavBar = styled.nav`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding-top: 20px;
  padding-bottom: 20px;
  background-color: ${colors.site_colors.bg};
`;

const SiteTitle = styled.li`
  padding-left: 20px;
  font-weight: 300;
`;

const BottomFooter = styled.footer`
  padding-top: 20px;
  padding-bottom: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: ${colors.site_colors.bg};
`;

const SearchBar = styled.div`
  display: flex;
  padding-top: 10px;
  flex-direction: row;
`;

export { StyledLink, NavLinks, NavBar,
         SiteTitle, BottomFooter, SearchBar, NewsWrapper }