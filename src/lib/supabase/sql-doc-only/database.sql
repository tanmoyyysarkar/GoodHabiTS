-- WARNING: This schema is for context only and is not meant to be run.
-- Table order and constraints may not be valid for execution.

CREATE TABLE public.hobbies (
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  user_id uuid NOT NULL DEFAULT auth.uid(),
  name text NOT NULL,
  icon text NOT NULL,
  color text NOT NULL,
  target_minutes numeric NOT NULL,
  is_daily boolean NOT NULL DEFAULT true,
  days_of_week ARRAY NOT NULL DEFAULT '{''Sun'',''Mon'',''Tue'',''Wed'',''Thu'',''Fri'',''Sat''}'::text[],
  is_active boolean NOT NULL DEFAULT true,
  updated_at timestamp with time zone NOT NULL DEFAULT now(),
  streak_score numeric NOT NULL DEFAULT '0'::numeric CHECK (streak_score > '-1'::integer::numeric),
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  CONSTRAINT hobbies_pkey PRIMARY KEY (id),
  CONSTRAINT hobbies_user_id_fkey FOREIGN KEY (user_id) REFERENCES auth.users(id)
);
CREATE TABLE public.sessions (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  hobby_id uuid NOT NULL,
  user_id uuid NOT NULL DEFAULT auth.uid(),
  feeling smallint NOT NULL DEFAULT '5'::smallint,
  session_date date NOT NULL,
  notes text NOT NULL DEFAULT ''::text,
  minutes_logged numeric NOT NULL,
  CONSTRAINT sessions_pkey PRIMARY KEY (id),
  CONSTRAINT sessions_hobby_id_fkey FOREIGN KEY (hobby_id) REFERENCES public.hobbies(id),
  CONSTRAINT sessions_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.user_profiles(id)
);
CREATE TABLE public.user_profiles (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  avatar_url text NOT NULL,
  full_name text NOT NULL DEFAULT ''::text,
  CONSTRAINT user_profiles_pkey PRIMARY KEY (id),
  CONSTRAINT user_profiles_id_fkey FOREIGN KEY (id) REFERENCES auth.users(id)
);
