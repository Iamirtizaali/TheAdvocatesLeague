-- Create the applications table
create table applications (
  id uuid default gen_random_uuid() primary key,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  selected_drive text not null,
  name text not null,
  father_name text not null,
  cnic text not null,
  contact_number text not null,
  email text not null,
  institution text not null,
  semester_year text not null,
  position text not null,
  reason text not null,
  professional_picture_url text,
  student_card_url text
);

-- Enable RLS
alter table applications enable row level security;

-- Create policy for anon inserts (so the API route can insert if using anon key, though we use service role key so it bypasses RLS anyway)
create policy "Enable insert for anonymous users" on applications for insert with check (true);

-- Policy to allow admins to read (if using supabase auth for admin, but we use service role key in our own API so this is just for safety)
create policy "Enable read access for all users" on applications for select using (true);
