/*
  # Create calculations table

  1. New Tables
    - `calculations`
      - `id` (uuid, primary key)
      - `user_id` (uuid, foreign key to profiles)
      - `name` (text)
      - `type` (text) - 'instagram' or 'tiktok'
      - `data` (jsonb) - stores all calculation data
      - `created_at` (timestamp)

  2. Security
    - Enable RLS on `calculations` table
    - Add policies for users to manage their own calculations
    - Add policies for admins to view all calculations
*/

CREATE TABLE IF NOT EXISTS public.calculations (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id uuid REFERENCES public.profiles(id) ON DELETE CASCADE,
    name text NOT NULL,
    type text NOT NULL CHECK (type IN ('instagram', 'tiktok')),
    data jsonb NOT NULL,
    created_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.calculations ENABLE ROW LEVEL SECURITY;

-- Users can manage their own calculations
CREATE POLICY "Users can manage own calculations"
    ON public.calculations
    FOR ALL
    TO authenticated
    USING (auth.uid() = user_id)
    WITH CHECK (auth.uid() = user_id);

-- Admins can view all calculations
CREATE POLICY "Admins can view all calculations"
    ON public.calculations
    FOR SELECT
    TO authenticated
    USING (
        EXISTS (
            SELECT 1 FROM public.profiles
            WHERE id = auth.uid()
            AND role = 'admin'
        )
    );