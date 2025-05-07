# Social Chat Application

A mobile-first social chat application built with React, Supabase, and Solana wallet integration.

## Features

- Phantom wallet authentication
- User profiles with unique usernames
- Real-time chat functionality
- Social feed with posts
- Mobile-first responsive design

## Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- Phantom wallet browser extension
- Supabase account

## Setup

1. Clone the repository:
```bash
git clone <repository-url>
cd social-chat
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the root directory with your Supabase credentials:
```
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

4. Set up your Supabase database with the following tables:

### profiles
```sql
create table profiles (
  id uuid default uuid_generate_v4() primary key,
  wallet_address text unique not null,
  username text unique not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);
```

### posts
```sql
create table posts (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references profiles(id) not null,
  content text not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);
```

### messages
```sql
create table messages (
  id uuid default uuid_generate_v4() primary key,
  sender_id uuid references profiles(id) not null,
  receiver_id uuid references profiles(id) not null,
  content text not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);
```

5. Start the development server:
```bash
npm run dev
```

## Usage

1. Install the Phantom wallet browser extension
2. Connect your wallet to the application
3. Create a profile with a unique username
4. Start chatting with other users and posting on your profile

## Development

The application is built with:
- React + TypeScript
- Vite for build tooling
- Supabase for backend and real-time features
- Solana wallet adapter for authentication
- CSS Modules for styling

## License

MIT
# alteriat
