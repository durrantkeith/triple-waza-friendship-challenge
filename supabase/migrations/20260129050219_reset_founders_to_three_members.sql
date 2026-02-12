/*
  # Reset Founders Table to 3 Members
  
  1. Changes
    - Remove all existing founding members
    - Add 3 initial founding members as placeholders
    
  2. Notes
    - Allows for manual addition of members through admin interface
    - Keeps table structure intact
*/

-- Clear existing members
DELETE FROM founders;

-- Add 3 initial founding members
INSERT INTO founders (name, title, country, dojo_name, city, years_teaching, photo_url, quote, is_founding_member, order_index)
VALUES
  ('Andrea Ricci', '8th Dan Black Belt', 'Italy', 'Milano Judo Club', 'Milan', 35, '', 'Kata is the foundation of true judo mastery.', true, 1),
  ('Claire Moreau', '8th Dan Black Belt', 'France', 'Paris Judo Academy', 'Paris', 32, '', 'Traditional forms connect us to judo''s origins.', true, 2),
  ('Klaus Fischer', '8th Dan Black Belt', 'Germany', 'Berlin Kodokan', 'Berlin', 38, '', 'Through kata, we preserve the art for future generations.', true, 3);
