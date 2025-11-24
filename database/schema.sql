-- Users table (با auth_id از نوع uuid)
CREATE TABLE IF NOT EXISTS users (
  id serial PRIMARY KEY,
  name text,
  auth_id uuid UNIQUE,
  created_at timestamptz DEFAULT now()
);

-- Messages table برای ذخیره گفتگو (اختیاری)
CREATE TABLE IF NOT EXISTS messages (
  id serial PRIMARY KEY,
  user_auth uuid,
  role text,
  content text,
  created_at timestamptz DEFAULT now()
);
