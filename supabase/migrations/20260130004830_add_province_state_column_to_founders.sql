/*
  # Add Province/State Column to Founders Table
  
  1. Changes
    - Add province_state column to founders table
    - Update existing founders with location information:
      - Chin-i Hsiang: B.C., Canada
      - Toby Hinton: B.C., Canada
    
  2. Notes
    - province_state field stores region information (e.g., B.C., California, etc.)
    - Both current founders are from British Columbia, Canada
*/

-- Add province_state column
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'founders' AND column_name = 'province_state'
  ) THEN
    ALTER TABLE founders ADD COLUMN province_state text DEFAULT '';
  END IF;
END $$;

-- Update existing founders with correct location information
UPDATE founders
SET 
  country = 'Canada',
  province_state = 'B.C.',
  city = ''
WHERE name IN ('Chin-i Hsiang', 'Toby Hinton');
