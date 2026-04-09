CREATE OR REPLACE FUNCTION get_today_hobby_and_session_stats()
RETURNS TABLE (
  id uuid,
  name text,
  color text,
  target_minutes numeric,
  minutes_today numeric,
  sessions_today bigint
)
LANGUAGE sql
STABLE
AS $$
  WITH today_sessions AS (
    SELECT *
    FROM public.sessions
    WHERE session_date = CURRENT_DATE
  )
  SELECT
    h.id,
    h.name,
    h.color,
    h.target_minutes,
    COALESCE(SUM(ts.minutes_logged), 0) AS minutes_today,
    COUNT(ts.id) AS sessions_today
  FROM public.hobbies h
  LEFT JOIN today_sessions ts
    ON ts.hobby_id = h.id
    AND ts.user_id = h.user_id
  WHERE h.is_active = true
  GROUP BY h.id, h.name, h.color, h.target_minutes
  ORDER BY h.name;
$$;
