import React from 'react';
import styled from 'styled-components';

const StyledContent = styled.div`
  text-align: center;
`;

const StyledHr = styled.hr`
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
    <StyledHr />
    <StyledContent>&copy; 2019 based-ghost LLC</StyledContent>
  </StyledFooter>
);

export default Footer;