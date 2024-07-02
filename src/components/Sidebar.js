import React from 'react';
import styled from 'styled-components';
import Link from 'next/link';

const SidebarContainer = styled.div`
  width: 250px;
  background-color: #2c3e50;
  color: #fff;
  display: flex;
  flex-direction: column;
  padding: 20px;
`;

const SidebarItem = styled.a`
  color: #fff;
  text-decoration: none;
  margin-bottom: 20px;
  font-size: 1.2rem;
  cursor: pointer;

  &:hover {
    font-weight: bold;
    color: #1abc9c;
  }
`;

const Sidebar = () => {
  return (
    <SidebarContainer>
      <Link href="/dashboard" passHref>
        <SidebarItem>Dashboard</SidebarItem>
      </Link>
      <Link href="/components" passHref>
        <SidebarItem>UI Components</SidebarItem>
      </Link>
      <Link href="/forms" passHref>
        <SidebarItem>Form Elements</SidebarItem>
      </Link>
      <Link href="/tables" passHref>
        <SidebarItem>Tables</SidebarItem>
      </Link>
      <Link href="/export" passHref>
        <SidebarItem>Export</SidebarItem>
      </Link>
    </SidebarContainer>
  );
};

export default Sidebar;
