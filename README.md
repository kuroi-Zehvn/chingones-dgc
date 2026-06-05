# Chingones DGC

Mini disc golf game for Chingones Disc Golf Club.

## How To Play

Drag from the player and release to throw the disc. Hit the basket to finish the hole. Lowest throws wins each hole.

## Includes

- 10 holes
- Basket, player, disc, and obstacles
- Water, trees, rocks, and logs
- Throw counter
- Best score per hole
- End-of-round hole score submission
- Global per-hole leaderboard with Supabase
- Responsive mobile layout

## Supabase Leaderboard

Create a Supabase project, open the SQL Editor, and run this for the main round leaderboard:

```sql
create table if not exists public.round_scores (
  id uuid primary key default gen_random_uuid(),
  name text not null check (char_length(name) between 1 and 18),
  throws integer not null check (throws > 0 and throws < 300),
  holes integer not null default 10 check (holes = 10),
  created_at timestamptz not null default now()
);

alter table public.round_scores enable row level security;

grant usage on schema public to anon;
grant select, insert on public.round_scores to anon;

drop policy if exists "Anyone can view round scores" on public.round_scores;
drop policy if exists "Anyone can submit round scores" on public.round_scores;

create policy "Anyone can view round scores"
on public.round_scores
for select
to anon
using (true);

create policy "Anyone can submit round scores"
on public.round_scores
for insert
to anon
with check (
  char_length(name) between 1 and 18
  and throws > 0
  and throws < 300
  and holes = 10
);
```

Optional per-hole table:

```sql
create table public.scores (
  id uuid primary key default gen_random_uuid(),
  name text not null check (char_length(name) between 1 and 18),
  hole integer not null check (hole between 1 and 10),
  throws integer not null check (throws > 0 and throws < 300),
  points integer not null check (points >= 0 and points <= 10),
  holes integer not null default 10,
  created_at timestamptz not null default now()
);

alter table public.scores enable row level security;

grant usage on schema public to anon;
grant select, insert on public.scores to anon;

create policy "Anyone can view scores"
on public.scores
for select
to anon
using (true);

create policy "Anyone can submit scores"
on public.scores
for insert
to anon
with check (
  char_length(name) between 1 and 18
  and hole between 1 and 10
  and throws > 0
  and throws < 300
  and points >= 0
  and points <= 10
  and holes = 10
);
```

If the `scores` table already exists from the first version, run this once:

```sql
alter table public.scores
add column if not exists hole integer;

update public.scores
set hole = 1
where hole is null;

alter table public.scores
alter column hole set not null;

alter table public.scores
drop constraint if exists scores_hole_check;

alter table public.scores
add constraint scores_hole_check check (hole between 1 and 10);

drop policy if exists "Anyone can submit scores" on public.scores;

create policy "Anyone can submit scores"
on public.scores
for insert
to anon
with check (
  char_length(name) between 1 and 18
  and hole between 1 and 10
  and throws > 0
  and throws < 300
  and points >= 0
  and points <= 10
  and holes = 10
);
```

Then paste your project values in `game.js`:

```js
const SUPABASE_URL = "https://YOUR-PROJECT.supabase.co";
const SUPABASE_ANON_KEY = "YOUR-PUBLISHABLE-OR-ANON-KEY";
```

## Files

- `index.html`
- `style.css`
- `game.js`
- `assets/chingones.png`
