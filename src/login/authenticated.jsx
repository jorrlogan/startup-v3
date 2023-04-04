import React from 'react';
import { useNavigate } from 'react-router-dom';

import { Search } from '../search/search'

export function Authenticated(props) {
  const navigate = useNavigate();

  function logout() {
    fetch(`/api/auth/logout`, {
      method: 'delete',
    }).then(() => props.onLogout());
  }

  return (
    <Search />
  );
}
