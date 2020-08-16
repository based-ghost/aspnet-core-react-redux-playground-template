import React from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const StyledFooter = styled.footer`
  color: #fff;
  width: 100%;
  margin: auto;
  display: block;
  font-size: 1.15rem;
  background-color: #33363b;
  padding: 3rem 1.5rem 3rem;

  @media only screen and (max-width: 769px) {
    font-size: 1rem;
  }
`;

const BrandContent = styled.div`
  text-align: center;
  word-spacing: 0.05rem;
`;

const FooterButtons = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-bottom: 0rem;
  align-items: center;
  justify-content: flex-start;

  > a {
    :first-child {
      margin-left: auto !important;
    }

    :last-child {
      margin-right: auto !important;
    }
  }
`;

const FooterLink = styled.a`
  color: #fff;
  margin-bottom: 0;
  font-size: 1.25rem;
  padding-left: 0.5em;
  padding-right: 0.5em;
  padding-bottom: 0.75rem;
  border-color: transparent;
  margin-right: 0 !important;
  background-color: transparent;
  transition: color 0.2s ease-out;

  &:hover {
    color: #09d3ac;
  }

  .icon {
    align-items: baseline;
  }
`;

const Footer: React.FC = () => (
  <StyledFooter>
    <FooterButtons>
      <FooterLink
        target='_blank'
        aria-label='GitHub'
        rel='noopener noreferrer'
        href='https://github.com/based-ghost'
      >
        <FontAwesomeIcon icon={['fab', 'github']} />
      </FooterLink>
      <FooterLink href='#/' aria-label='Twitter'>
        <FontAwesomeIcon icon={['fab', 'twitter']} />
      </FooterLink>
      <FooterLink href='#/' aria-label='Medium'>
        <FontAwesomeIcon icon={['fab', 'medium-m']} />
      </FooterLink>
    </FooterButtons>
    <BrandContent>based-ghost LLC &copy; 2020</BrandContent>
  </StyledFooter>
);

export default Footer;