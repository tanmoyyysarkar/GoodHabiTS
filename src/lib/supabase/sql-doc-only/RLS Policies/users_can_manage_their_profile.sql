alter policy "Users can manage their profile"
on "public"."user_profiles"
to authenticated
using (
  (auth.uid() = id)
) with check (
  (auth.uid() = id)
);
