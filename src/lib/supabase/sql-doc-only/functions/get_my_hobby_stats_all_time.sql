create or replace function get_my_hobby_stats_all_time()
returns table (
  hobby_id uuid,
  hobby_name text,
  color text,
  total_minutes bigint
)
language sql
security definer
as $$
  select
    h.id,
    h.name,
    h.color,
    coalesce(sum(s.minutes_logged), 0) as total_minutes
  from public.hobbies h
  left join public.sessions s
    on s.hobby_id = h.id
  where h.user_id = auth.uid()
  group by h.id, h.name, h.color
  order by total_minutes desc;
$$;
