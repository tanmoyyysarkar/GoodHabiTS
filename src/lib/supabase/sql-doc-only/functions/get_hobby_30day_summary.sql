create or replace function public.get_hobby_30day_summary()
returns table (
  hobby_id uuid,
  name text,
  icon text,
  color text,
  streak_score numeric,
  target_minutes numeric,
  last_30_days_minutes numeric[]
)
language sql
stable
as $$
with days as (
  select generate_series(
    current_date - interval '29 days',
    current_date,
    interval '1 day'
  )::date as day
),
hobby_base as (
  select
    h.id,
    h.name,
    h.icon,
    h.color,
    h.streak_score,
    h.target_minutes
  from public.hobbies h
  where h.user_id = auth.uid()
    and h.is_active = true
),
session_agg as (
  select
    s.hobby_id,
    s.session_date as day,
    sum(s.minutes_logged) as total_minutes
  from public.sessions s
  where s.user_id = auth.uid()
    and s.session_date >= current_date - interval '29 days'
  group by s.hobby_id, s.session_date
)
select
  hb.id as hobby_id,
  hb.name,
  hb.icon,
  hb.color,
  hb.streak_score,
  hb.target_minutes,
  array_agg(
    coalesce(sa.total_minutes, 0)
    order by d.day
  ) as last_30_days_minutes
from hobby_base hb
cross join days d
left join session_agg sa
  on sa.hobby_id = hb.id
  and sa.day = d.day
group by
  hb.id, hb.name, hb.icon, hb.color, hb.streak_score, hb.target_minutes
order by hb.name;
$$;
