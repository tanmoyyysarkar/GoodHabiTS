CREATE OR REPLACE FUNCTION public.get_365_day_heatmap()
RETURNS TABLE (
  date date,
  total_minutes_logged integer,
  total_target_minutes integer
)
LANGUAGE sql
SECURITY DEFINER
AS $$
WITH dates AS (
  SELECT generate_series(
    CURRENT_DATE - INTERVAL '364 days',
    CURRENT_DATE,
    INTERVAL '1 day'
  )::date AS day
),

-- all applicable hobbies per day
hobby_day AS (
  SELECT
    d.day,
    h.id AS hobby_id,
    h.target_minutes
  FROM dates d
  JOIN public.hobbies h
    ON h.user_id = auth.uid()
   AND h.is_active = true
   AND (
        h.is_daily = true
        OR to_char(d.day, 'Dy') = ANY(h.days_of_week)
   )
),

-- pre-aggregated sessions
session_sum AS (
  SELECT
    s.session_date,
    s.hobby_id,
    SUM(s.minutes_logged)::int AS total_minutes
  FROM public.sessions s
  WHERE s.user_id = auth.uid()
    AND s.session_date >= CURRENT_DATE - INTERVAL '364 days'
  GROUP BY s.session_date, s.hobby_id
),

-- total target per day
target_per_day AS (
  SELECT
    day,
    SUM(target_minutes)::int AS total_target_minutes
  FROM hobby_day
  GROUP BY day
),

-- total logged per day
logged_per_day AS (
  SELECT
    session_date AS day,
    SUM(total_minutes)::int AS total_minutes_logged
  FROM session_sum
  GROUP BY session_date
)

SELECT
  d.day AS date,
  COALESCE(l.total_minutes_logged, 0)::int AS total_minutes_logged,
  COALESCE(t.total_target_minutes, 0)::int AS total_target_minutes

FROM dates d
LEFT JOIN target_per_day t ON t.day = d.day
LEFT JOIN logged_per_day l ON l.day = d.day

ORDER BY d.day;
$$;
