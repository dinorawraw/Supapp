/*
  # Add news table and profile role

  1. Changes to Profiles Table
    - Add role column to profiles table

  2. New Tables
    - `news`
      - `id` (uuid, primary key)
      - `title` (text, not null)
      - `content` (text, not null)
      - `image` (text)
      - `video` (text)
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)

  3. Security
    - Enable RLS on `news` table
    - Add policies for:
      - Public read access
      - Admin write access
*/

-- Add role column to profiles table
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS role text DEFAULT 'user';

-- Create news table
CREATE TABLE IF NOT EXISTS public.news (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    title text NOT NULL,
    content text NOT NULL,
    image text,
    video text,
    created_at timestamptz DEFAULT now(),
    updated_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.news ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Allow public read access"
    ON public.news
    FOR SELECT
    TO public
    USING (true);

CREATE POLICY "Allow admin write access"
    ON public.news
    FOR ALL
    TO authenticated
    USING (
        EXISTS (
            SELECT 1 FROM public.profiles
            WHERE id = auth.uid()
            AND role = 'admin'
        )
    )
    WITH CHECK (
        EXISTS (
            SELECT 1 FROM public.profiles
            WHERE id = auth.uid()
            AND role = 'admin'
        )
    );