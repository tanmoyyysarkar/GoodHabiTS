CREATE OR REPLACE FUNCTION public.get_category_distribution()
RETURNS TABLE (
  category text,
  total_minutes integer
)
LANGUAGE sql
SECURITY DEFINER
AS $$
SELECT
  h.category,
  COALESCE(SUM(s.minutes_logged), 0)::int AS total_minutes
FROM public.sessions s
JOIN public.hobbies h
  ON h.id = s.hobby_id
WHERE s.user_id = auth.uid()
GROUP BY h.category
ORDER BY total_minutes DESC;
$$;
