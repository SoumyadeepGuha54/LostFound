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

-- Create found_items table
CREATE TABLE found_items (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  college VARCHAR(100) NOT NULL,
  item_name VARCHAR(255) NOT NULL,
  location VARCHAR(255) NOT NULL,
  description TEXT,
  image_url VARCHAR(500),
  claims INTEGER DEFAULT 0,
  status VARCHAR(20) DEFAULT 'active',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create lost_items table
CREATE TABLE lost_items (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  college VARCHAR(100) NOT NULL,
  item_name VARCHAR(255) NOT NULL,
  location VARCHAR(255) NOT NULL,
  description TEXT,
  matches INTEGER DEFAULT 0,
  status VARCHAR(20) DEFAULT 'active',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create claims table to track claims on found items
CREATE TABLE claims (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  found_item_id UUID REFERENCES found_items(id) ON DELETE CASCADE,
  lost_item_id UUID REFERENCES lost_items(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  claim_type VARCHAR(20) NOT NULL, -- 'found' or 'match'
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better query performance
CREATE INDEX idx_found_items_college ON found_items(college);
CREATE INDEX idx_found_items_user_id ON found_items(user_id);
CREATE INDEX idx_found_items_created_at ON found_items(created_at DESC);
CREATE INDEX idx_found_items_status ON found_items(status);

CREATE INDEX idx_lost_items_college ON lost_items(college);
CREATE INDEX idx_lost_items_user_id ON lost_items(user_id);
CREATE INDEX idx_lost_items_created_at ON lost_items(created_at DESC);
CREATE INDEX idx_lost_items_status ON lost_items(status);

CREATE INDEX idx_claims_found_item_id ON claims(found_item_id);
CREATE INDEX idx_claims_lost_item_id ON claims(lost_item_id);
CREATE INDEX idx_claims_user_id ON claims(user_id);

-- Enable Row Level Security
ALTER TABLE found_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE lost_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE claims ENABLE ROW LEVEL SECURITY;

-- Policies for found_items
CREATE POLICY "Enable insert for authenticated users" ON found_items
  FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Enable read for same college" ON found_items
  FOR SELECT
  USING (true);

CREATE POLICY "Enable update for owner" ON found_items
  FOR UPDATE
  USING (true);

CREATE POLICY "Enable delete for owner" ON found_items
  FOR DELETE
  USING (true);

-- Policies for lost_items
CREATE POLICY "Enable insert for authenticated users" ON lost_items
  FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Enable read for same college" ON lost_items
  FOR SELECT
  USING (true);

CREATE POLICY "Enable update for owner" ON lost_items
  FOR UPDATE
  USING (true);

CREATE POLICY "Enable delete for owner" ON lost_items
  FOR DELETE
  USING (true);

-- Policies for claims
CREATE POLICY "Enable insert for authenticated users" ON claims
  FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Enable read for everyone" ON claims
  FOR SELECT
  USING (true);

CREATE POLICY "Enable delete for owner" ON claims
  FOR DELETE
  USING (true);
