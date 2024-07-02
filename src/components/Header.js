import React from 'react';
import styled from 'styled-components';
import { useRouter } from 'next/router';

const HeaderContainer = styled.header`
  background-color: #333;
  color: #fff;
  display: flex;
  justify-content: space-between;
  padding: 10px 20px;
`;

const Title = styled.h1`
  font-size: 1.5rem;
`;

const LogoutButton = styled.button`
  background-color: #ff6b6b;
  color: #fff;
  border: none;
  padding: 10px 20px;
  cursor: pointer;
  font-size: 1rem;
  border-radius: 5px;
`;

const Header = () => {
  const router = useRouter();

  const handleLogout = () => {
    // Ajoutez ici la logique de déconnexion si nécessaire
    router.push('/');
  };

  return (
    <HeaderContainer>
      <Title>Dashboard</Title>
      <LogoutButton onClick={handleLogout}>Logout</LogoutButton>
    </HeaderContainer>
  );
};

export default Header;
