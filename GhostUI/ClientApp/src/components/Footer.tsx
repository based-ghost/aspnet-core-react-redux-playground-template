import React from 'react';
import styled from 'styled-components';

const Content = styled.div`
  text-align: center;
`;

const Hr = styled.hr`
  height: 1px;
  margin: 2rem 0 .75rem 0;
  background-color: rgba(0, 0, 0, 0.15);
`;

const StyledFooter = styled.footer`
  width: 40%;
  margin: auto;
  padding: 3rem 1.5rem 3rem;
  background-color: #f7f7f7;

  @media only screen and (max-width: 900px) {
    width: 100%;
  }
`;

const Footer: React.FC = () => (
  <StyledFooter>
    <Hr />
    <Content>&copy; 2019 based-ghost LLC</Content>
  </StyledFooter>
);

export default Footer;