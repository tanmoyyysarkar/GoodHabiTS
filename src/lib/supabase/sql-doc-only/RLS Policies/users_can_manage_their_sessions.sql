alter policy "Users can manage their own sessions"
on "public"."sessions"
to authenticated
using (
  (auth.uid() = user_id)
) with check (
  (auth.uid() = user_id)
);
