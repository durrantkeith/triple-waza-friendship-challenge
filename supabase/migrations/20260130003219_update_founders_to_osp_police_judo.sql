/*
  # Update Founders to OSP Police Judo Members
  
  1. Changes
    - Remove all existing founding members
    - Add 2 founding members from OSP Police Judo:
      - Chin-i Hsiang
      - Toby Hinton
    
  2. Notes
    - Both members are affiliated with OSP Police Judo
    - Order index set to maintain proper display order
*/

-- Clear existing members
DELETE FROM founders;

-- Add 2 founding members from OSP Police Judo
INSERT INTO founders (name, title, country, dojo_name, city, years_teaching, photo_url, quote, is_founding_member, order_index)
VALUES
  ('Chin-i Hsiang', 'OSP Police Judo', 'United States', 'OSP Police Judo', '', 0, '', '', true, 1),
  ('Toby Hinton', 'OSP Police Judo', 'United States', 'OSP Police Judo', '', 0, '', '', true, 2);
