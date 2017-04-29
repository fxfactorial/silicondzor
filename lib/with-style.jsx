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

const ContentWrapper = styled.div`
  padding-top: 10px;
  padding-left: 20px;
  padding-right: 20px;
  min-height: 650px;
  overflow-y: scroll;
  box-shadow: 3px 3px 5px 6px #ccc;
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

const NewsHeadLine = styled.article`
  padding-bottom: 5px;
  padding-top: 20px;
  font-weight: 300;
`;

const ByLine = styled.p`
  font-weight: 300;
  padding-left: 20px;
  font-size: 14px;
  display: flex;
  width: 35rem;
  justify-content: space-around;
`;

const TextArea = styled.textarea`
  min-width: 200px;
`;

const PostSubmission = styled.section`
  padding-top: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const RowField = styled.div`
  display: flex;
  flex-direction: row;
  font-size: 1.5em;
  font-weight: 300;
  justify-content: space-between;
  min-width: 370px;
`;

const Input = styled.input`
  min-width:300px
`;

const Message = styled.p`
  padding-top: 10px;
  font-weight: 300;
`;

const SubmissionButton = styled.button`
  padding: 7px;
  min-width: 120px;
  margin-top: 10px;
  margin-bottom: 10px;
`;

export {
  StyledLink, NavLinks, NavBar, NewsHeadLine,
  SiteTitle, BottomFooter, SearchBar, ContentWrapper,
  TextArea, PostSubmission, RowField, Input, Message,
  SubmissionButton, ByLine
}
