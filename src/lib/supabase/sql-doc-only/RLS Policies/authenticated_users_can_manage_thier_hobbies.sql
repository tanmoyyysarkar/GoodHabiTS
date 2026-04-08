alter policy "Authenticated users can manage their hobbies"
on "public"."hobbies"
to authenticated
using (
(auth.uid() = user_id)
) with check (
(auth.uid() = user_id)
);
