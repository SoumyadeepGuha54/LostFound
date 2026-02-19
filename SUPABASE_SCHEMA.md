# Supabase Database Schema

## SQL Files

All SQL schema files are located in the `supabase/` folder:

- **schema.sql** - Users table schema with indexes and RLS policies

## Setup Instructions

1. Go to your Supabase project dashboard
2. Navigate to SQL Editor
3. Copy and paste the SQL from `supabase/schema.sql`
4. Run the query
5. Verify the table was created in the Table Editor

## Getting Your Supabase Credentials

1. Go to Project Settings > API
2. Copy the following:
   - Project URL (NEXT_PUBLIC_SUPABASE_URL)
   - anon/public key (NEXT_PUBLIC_SUPABASE_ANON_KEY)
3. Add these to your `.env.local` file

## Additional Considerations

- The password is hashed using bcrypt before storage
- RLS policies ensure users can only access their own data
- Email updates preference is stored for future newsletter features
- College field is restricted to 'Heritage' or 'Techno' at the application level
