-- Create custom types
CREATE TYPE room_type AS ENUM ('private', 'matched');
CREATE TYPE intensity_tier AS ENUM ('sweet', 'flirty', 'deep');
CREATE TYPE user_status AS ENUM ('active', 'suspended', 'banned');
CREATE TYPE room_state AS ENUM ('waiting', 'consent', 'playing', 'recap', 'ended');
CREATE TYPE question_type AS ENUM ('truth', 'dare');
CREATE TYPE report_status AS ENUM ('pending', 'reviewed', 'action_taken', 'dismissed');

-- Profiles (extends Supabase Auth users)
CREATE TABLE profiles (
    id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
    display_name TEXT NOT NULL,
    avatar_url TEXT,
    birthdate DATE NOT NULL,
    relationship_status TEXT,
    status user_status DEFAULT 'active',
    role TEXT DEFAULT 'user', -- 'user', 'moderator', 'admin'
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Rooms
CREATE TABLE rooms (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    type room_type NOT NULL,
    group_size INTEGER NOT NULL,
    intensity_tier intensity_tier NOT NULL,
    state room_state DEFAULT 'waiting',
    created_at TIMESTAMPTZ DEFAULT NOW(),
    ended_at TIMESTAMPTZ
);

-- Room Members
CREATE TABLE room_members (
    room_id UUID REFERENCES rooms(id) ON DELETE CASCADE,
    user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
    role TEXT DEFAULT 'player',
    joined_at TIMESTAMPTZ DEFAULT NOW(),
    PRIMARY KEY (room_id, user_id)
);

-- Questions (Content Bank)
CREATE TABLE questions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    type question_type NOT NULL,
    text TEXT NOT NULL,
    intensity_tier intensity_tier NOT NULL,
    mode TEXT NOT NULL, -- 'couple', 'group'
    active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Game Events (Audit/Recap)
CREATE TABLE game_events (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    room_id UUID REFERENCES rooms(id) ON DELETE CASCADE,
    user_id UUID REFERENCES profiles(id) ON DELETE SET NULL,
    question_id UUID REFERENCES questions(id) ON DELETE SET NULL,
    event_type TEXT NOT NULL, -- 'card_revealed', 'coin_toss', 'skip'
    event_data JSONB,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Matchmaking Queue
CREATE TABLE matchmaking_queue (
    user_id UUID REFERENCES profiles(id) ON DELETE CASCADE PRIMARY KEY,
    group_size INTEGER NOT NULL,
    intensity_tier intensity_tier NOT NULL,
    status TEXT DEFAULT 'searching', -- 'searching', 'matched'
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Reports
CREATE TABLE reports (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    reporter_id UUID REFERENCES profiles(id) ON DELETE SET NULL,
    reported_user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
    room_id UUID REFERENCES rooms(id) ON DELETE SET NULL,
    reason TEXT NOT NULL,
    status report_status DEFAULT 'pending',
    reviewed_by UUID REFERENCES profiles(id) ON DELETE SET NULL,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Admin Actions
CREATE TABLE admin_actions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    admin_id UUID REFERENCES profiles(id) ON DELETE SET NULL,
    target_user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
    action TEXT NOT NULL, -- 'suspend', 'ban', 'warn'
    reason TEXT NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- RLS Policies (simplified for the scaffold)
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE rooms ENABLE ROW LEVEL SECURITY;
ALTER TABLE room_members ENABLE ROW LEVEL SECURITY;
ALTER TABLE questions ENABLE ROW LEVEL SECURITY;
ALTER TABLE game_events ENABLE ROW LEVEL SECURITY;
ALTER TABLE matchmaking_queue ENABLE ROW LEVEL SECURITY;
ALTER TABLE reports ENABLE ROW LEVEL SECURITY;

-- Profiles: Users can read their own profile and profiles of users in their rooms
CREATE POLICY "Users can view their own profile" ON profiles FOR SELECT USING (auth.uid() = id);
-- Simplified: anyone can see profiles (update to be stricter in prod)
CREATE POLICY "Public profile view" ON profiles FOR SELECT USING (true);
CREATE POLICY "Users can update own profile" ON profiles FOR UPDATE USING (auth.uid() = id);

-- Rooms: Users can see rooms they are in
CREATE POLICY "Users can view their rooms" ON rooms FOR SELECT USING (
    EXISTS (SELECT 1 FROM room_members WHERE room_id = rooms.id AND user_id = auth.uid())
);
CREATE POLICY "Users can create rooms" ON rooms FOR INSERT WITH CHECK (auth.uid() IS NOT NULL);

-- Room Members: Users can see members of their rooms
CREATE POLICY "Users can view members of their rooms" ON room_members FOR SELECT USING (
    EXISTS (SELECT 1 FROM room_members rm WHERE rm.room_id = room_members.room_id AND rm.user_id = auth.uid())
);
CREATE POLICY "Users can join rooms" ON room_members FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Questions: Anyone can read active questions, only admins can modify
CREATE POLICY "Anyone can read active questions" ON questions FOR SELECT USING (active = TRUE);

-- Game Events: Room members can view events
CREATE POLICY "Room members can view events" ON game_events FOR SELECT USING (
    EXISTS (SELECT 1 FROM room_members WHERE room_id = game_events.room_id AND user_id = auth.uid())
);
CREATE POLICY "Room members can insert events" ON game_events FOR INSERT WITH CHECK (
    EXISTS (SELECT 1 FROM room_members WHERE room_id = game_events.room_id AND user_id = auth.uid())
);

-- Reports: Users can insert, only admins can read/update
CREATE POLICY "Users can submit reports" ON reports FOR INSERT WITH CHECK (auth.uid() = reporter_id);
-- Matchmaking: Users can manage their own queue status
CREATE POLICY "Users can view own queue" ON matchmaking_queue FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can manage own queue" ON matchmaking_queue FOR ALL USING (auth.uid() = user_id);
