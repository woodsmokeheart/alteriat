import * as React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const UserSearch: React.FC = () => {
  const [address, setAddress] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (address.trim()) {
      navigate(`/user/${address.trim()}`);
    }
  };

  return (
    <form onSubmit={handleSearch} style={{ marginBottom: 24 }}>
      <input
        type="text"
        placeholder="Enter wallet address"
        value={address}
        onChange={e => setAddress(e.target.value)}
        style={{ padding: 8, width: 300, marginRight: 8 }}
      />
      <button type="submit">Find User</button>
    </form>
  );
};

export default UserSearch; 