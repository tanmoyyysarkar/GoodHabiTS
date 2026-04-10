CREATE OR REPLACE FUNCTION public.get_30_day_summary_for_insights_line_chart()
RETURNS TABLE (
  date date,
  completed_hobbies integer,
  total_hobbies integer,
  total_minutes integer
)
LANGUAGE sql
SECURITY DEFINER
AS $$
WITH dates AS (
  SELECT generate_series(
    CURRENT_DATE - INTERVAL '29 days',
    CURRENT_DATE,
    INTERVAL '1 day'
  )::date AS day
),

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

session_sum AS (
  SELECT
    s.session_date,
    s.hobby_id,
    SUM(s.minutes_logged)::int AS total_minutes
  FROM public.sessions s
  WHERE s.user_id = auth.uid()
    AND s.session_date >= CURRENT_DATE - INTERVAL '29 days'
  GROUP BY s.session_date, s.hobby_id
)

SELECT
  d.day AS date,

  COUNT(*) FILTER (
    WHERE COALESCE(s.total_minutes, 0) >= h.target_minutes
  )::int AS completed_hobbies,

  COUNT(*)::int AS total_hobbies,

  COALESCE(SUM(s.total_minutes), 0)::int AS total_minutes

FROM dates d
JOIN hobby_day h ON h.day = d.day
LEFT JOIN session_sum s
  ON s.session_date = h.day
 AND s.hobby_id = h.hobby_id

GROUP BY d.day
ORDER BY d.day;
$$;
