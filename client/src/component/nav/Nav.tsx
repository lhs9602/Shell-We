import React, { useState } from 'react';
import { useRecoilValue } from 'recoil';
import { Link, useNavigate } from 'react-router-dom';
import Avatar from '../../common/avatar/Avatar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faPen,
  faMagnifyingGlass,
  faBox,
  faPersonRunning,
  faHandPointRight,
  faMessage,
  faArrowRightToBracket,
  faPeopleCarryBox,
} from '@fortawesome/free-solid-svg-icons';

import {
  NavWrapper,
  NavContainer,
  Logo,
  NavItemContentWrapper,
  NavItems,
  NavItem,
  NavItemContent,
} from './Nav.styled';
import { userStateWithExpiry } from '../../recoil/selector';
import { getMemberIdFromLocalStorage } from '../../utill/localstorageData';
import { useGetMember } from '../../hooks/profile/useGetMember';

const Nav: React.FC = () => {
  const [isNavItemContent, setIsNavItemContent] = useState(false);
  const [activeButtonId, setActiveButtonId] = useState('');
  const navigate = useNavigate();
  const myId = Number(getMemberIdFromLocalStorage());
  const { data } = useGetMember(myId);
  const isLogIn = useRecoilValue(userStateWithExpiry);

  const handleNavItemHover = () => {
    setIsNavItemContent(true);
  };

  const handleNavItemNotHover = () => {
    setIsNavItemContent(false);
  };

  const handleClick = () => {
    alert('로그인 후 접근할 수 있습니다.');
    navigate(`/login`);
  };

  const handleButtonClick = (id: string) => {
    setActiveButtonId(id);
    navigate(`/${id}`);
  };
  const handleShellClick = (id: string) => {
    setActiveButtonId(id);
    navigate(`/shelllist/${id}`);
  };
  const handleMemberClick = (id: string) => {
    setActiveButtonId(id);
    navigate(`/${id}/${myId}`);
  };

  return (
    <NavWrapper>
      <NavContainer>
        <Link to={isLogIn ? '/main' : '/'}>
          <Logo
            src="https://cdn-icons-png.flaticon.com/512/499/499857.png"
            alt="Logo"
          ></Logo>
        </Link>
        <NavItems>
          <NavItem
            className={activeButtonId === 'shellcreate' ? 'selectedTab' : ''}
            onClick={
              isLogIn ? () => handleButtonClick('shellcreate') : handleClick
            }
          >
            <FontAwesomeIcon icon={faPen} />
            Create Shells
          </NavItem>
          <NavItem
            onMouseEnter={handleNavItemHover}
            onMouseLeave={handleNavItemNotHover}
          >
            <FontAwesomeIcon icon={faMagnifyingGlass} />
            Find Shells
          </NavItem>
          {isNavItemContent && (
            <NavItemContentWrapper
              onMouseEnter={handleNavItemHover}
              onMouseLeave={handleNavItemNotHover}
            >
              <NavItemContent
                className={activeButtonId === 'product' ? 'selectedTab' : ''}
                onClick={() => handleShellClick('product')}
              >
                <FontAwesomeIcon icon={faBox} />
                Product
              </NavItemContent>
              <NavItemContent
                className={activeButtonId === 'talent' ? 'selectedTab' : ''}
                onClick={() => handleShellClick('talent')}
              >
                <FontAwesomeIcon icon={faPersonRunning} />
                Talent
              </NavItemContent>
            </NavItemContentWrapper>
          )}
          <NavItem
            className={activeButtonId === 'offer' ? 'selectedTab' : ''}
            onClick={isLogIn ? () => handleMemberClick('offer') : handleClick}
          >
            <FontAwesomeIcon icon={faHandPointRight} />
            Offered Shells
          </NavItem>
          <NavItem
            className={activeButtonId === 'dm' ? 'selectedTab' : ''}
            onClick={isLogIn ? () => handleMemberClick('dm') : handleClick}
          >
            <FontAwesomeIcon icon={faMessage} />
            Message
          </NavItem>
          <NavItem
            className={activeButtonId === 'member' ? 'selectedTab' : ''}
            onClick={isLogIn ? () => handleMemberClick('member') : handleClick}
          >
            {data.data && <Avatar avatartype={'icon'} member={data.data} />}
            My Page
          </NavItem>
          <NavItem
            className={activeButtonId === 'myshells' ? 'selectedTab' : ''}
            onClick={
              isLogIn ? () => handleMemberClick('myshells') : handleClick
            }
          >
            <FontAwesomeIcon icon={faPeopleCarryBox} />
            My Shells
          </NavItem>
          {isLogIn ? null : (
            <NavItem
              className={activeButtonId === 'login' ? 'selectedTab' : ''}
              onClick={() => {
                handleButtonClick('login');
              }}
            >
              <FontAwesomeIcon icon={faArrowRightToBracket} />
              Login
            </NavItem>
          )}
        </NavItems>
      </NavContainer>
    </NavWrapper>
  );
};

export default Nav;
