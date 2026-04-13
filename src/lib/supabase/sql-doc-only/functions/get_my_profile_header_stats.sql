create or replace function get_my_profile_header_stats()
returns table (
  total_minutes bigint,
  streak integer,
  total_hobbies bigint
)
language sql
security definer
as $$
  select
    (select coalesce(sum(minutes_logged), 0)
     from sessions
     where user_id = auth.uid()) as total_minutes,

    (select coalesce(streak_score, 0)
     from user_profiles
     where id = auth.uid()) as streak,

    (select count(*)
     from hobbies
     where user_id = auth.uid()) as total_hobbies;
$$;
