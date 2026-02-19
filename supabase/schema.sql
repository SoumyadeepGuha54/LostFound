-- Create users table
CREATE TABLE users (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  college VARCHAR(100) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  email_updates BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create index on email for faster lookups
CREATE INDEX idx_users_email ON users(email);

-- Create index on college for filtering
CREATE INDEX idx_users_college ON users(college);

-- Enable Row Level Security (RLS)
ALTER TABLE users ENABLE ROW LEVEL SECURITY;

-- Create policy to allow anyone to insert (sign up)
-- This is needed because we use NextAuth for authentication, not Supabase Auth
CREATE POLICY "Enable insert for everyone" ON users
  FOR INSERT
  WITH CHECK (true);

-- Create policy to allow reading user data for authentication
-- This allows the backend to verify credentials during login
CREATE POLICY "Enable read for everyone" ON users
  FOR SELECT
  USING (true);

-- Create policy to allow updates (for future features like profile updates)
CREATE POLICY "Enable update for everyone" ON users
  FOR UPDATE
  USING (true);
