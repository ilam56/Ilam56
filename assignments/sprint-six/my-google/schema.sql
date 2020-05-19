CREATE TABLE user (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT UNIQUE NOT NULL,
  profile_pic TEXT NOT NULL,
  quest1 TEXT DEFAULT 'No ANS',
  quest2 TEXT DEFAULT 'No ANS',
  quest3 TEXT DEFAULT 'No ANS'
);
