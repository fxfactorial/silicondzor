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

const SubmissionContent = styled(ContentWrapper)`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const SubmitBanner = styled.h1`
  padding-top: 10px;
  font-weight: 300;
  font-size: 34px;
  padding-bottom: 10px;
`;

const SubmissionBox = styled.div`
  padding-top: 10px;
  box-shadow: 3px 3px 0px 0px ${colors.site_colors.banner};
  background-color: ${colors.site_colors.bg};
  min-height: 500px;
  min-width: 620px;
`;

const TabBar = styled.nav`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  margin-left: 5px;
  margin-right: 5px;
  padding: 5px;
  background-color: ${colors.site_colors.bg};
`;

const TabItem = styled.p`
  border-style: ${props => props.selected ? 'inset' : 'outset'};
  border-width: 2px;
  padding-top: 5px;
  padding-bottom: 5px;
  padding-left: 20px;
  padding-right: 20px;
  cursor: pointer;
  color: ${colors.site_colors.title};
`;

export {
  StyledLink, NavLinks, NavBar, NewsHeadLine,
  SiteTitle, BottomFooter, SearchBar, ContentWrapper,
  TextArea, PostSubmission, RowField, Input, Message,
  SubmissionButton, ByLine, SubmissionContent, SubmitBanner,
  SubmissionBox, TabBar, TabItem
}
