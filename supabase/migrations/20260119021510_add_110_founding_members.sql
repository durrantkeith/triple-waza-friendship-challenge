/*
  # Add 110 Founding Members

  1. Data Changes
    - Insert 110 founding sensei circle members
    - Members are numbered 5-114 (after the 4 existing members)
    - Diverse international representation
    - Various ranks and teaching experience

  2. Notes
    - This is sample data for demonstration
    - All members are marked as founding members
    - Order index determines display position
*/

INSERT INTO founders (name, title, dojo_name, city, country, years_teaching, photo_url, quote, is_founding_member, order_index)
VALUES
  -- Row 1 (5-14)
  ('Yuki Yamamoto', '6th Dan Black Belt', 'Osaka Kodokan Dojo', 'Osaka', 'Japan', 28, '', 'Through repetition and dedication, we build not just technique, but character.', true, 5),
  ('Carlos Garcia', '5th Dan Black Belt', 'Madrid Judo Academy', 'Madrid', 'Spain', 22, '', 'Judo teaches us to fall seven times and stand up eight.', true, 6),
  ('Emma Johnson', '7th Dan Black Belt', 'London Budokwai', 'London', 'United Kingdom', 32, '', 'The way of judo is the way of harmony and mutual respect.', true, 7),
  ('Pierre Dubois', '6th Dan Black Belt', 'Paris Traditional Judo Club', 'Paris', 'France', 27, '', 'Every student teaches us as much as we teach them.', true, 8),
  ('Hans Müller', '5th Dan Black Belt', 'Berlin Olympic Judo Center', 'Berlin', 'Germany', 20, '', 'Kata is the foundation of all judo excellence.', true, 9),
  ('Francesca Rossi', '8th Dan Black Belt', 'Rome Samurai Dojo', 'Rome', 'Italy', 35, '', 'In judo, we seek perfection of character.', true, 10),
  ('Vladimir Ivanov', '6th Dan Black Belt', 'Moscow Warriors Dojo', 'Moscow', 'Russia', 25, '', 'The gentle way leads to the strongest path.', true, 11),
  ('Li Chen', '7th Dan Black Belt', 'Beijing Elite Judo Academy', 'Beijing', 'China', 30, '', 'Maximum efficiency, minimum effort.', true, 12),
  ('Priya Patel', '5th Dan Black Belt', 'Mumbai Champions Club', 'Mumbai', 'India', 18, '', 'Mutual welfare and benefit for all.', true, 13),
  ('João Silva', '6th Dan Black Belt', 'São Paulo Harmony Dojo', 'São Paulo', 'Brazil', 24, '', 'Respect is earned on the tatami.', true, 14),

  -- Row 2 (15-24)
  ('Kenji Suzuki', '5th Dan Black Belt', 'Tokyo Zenith Judo', 'Tokyo', 'Japan', 21, '', 'Technique is nothing without heart.', true, 15),
  ('Sofia Martinez', '7th Dan Black Belt', 'Barcelona Victory Dojo', 'Barcelona', 'Spain', 29, '', 'We preserve tradition while embracing the future.', true, 16),
  ('Oliver Williams', '6th Dan Black Belt', 'Manchester Phoenix Martial Arts', 'Manchester', 'United Kingdom', 26, '', 'Judo is a way of life, not just a sport.', true, 17),
  ('Marie Bernard', '5th Dan Black Belt', 'Lyon Dragon Judo Club', 'Lyon', 'France', 19, '', 'Through kata, we connect with generations past.', true, 18),
  ('Klaus Schmidt', '8th Dan Black Belt', 'Munich Imperial Dojo', 'Munich', 'Germany', 34, '', 'Excellence is not an act, but a habit.', true, 19),
  ('Giulia Ferrari', '6th Dan Black Belt', 'Milan Rising Sun Judo', 'Milan', 'Italy', 23, '', 'The dojo is where we forge our spirit.', true, 20),
  ('Anastasia Petrov', '7th Dan Black Belt', 'St Petersburg Golden Belt Academy', 'St Petersburg', 'Russia', 31, '', 'In every throw, there is a lesson.', true, 21),
  ('Wang Zhang', '5th Dan Black Belt', 'Shanghai Mountain Peak Dojo', 'Shanghai', 'China', 20, '', 'Discipline today, victory tomorrow.', true, 22),
  ('Amit Kumar', '6th Dan Black Belt', 'Delhi River Flow Judo', 'Delhi', 'India', 25, '', 'The path of judo is endless learning.', true, 23),
  ('Ana Santos', '7th Dan Black Belt', 'Rio de Janeiro Thunder Dojo', 'Rio de Janeiro', 'Brazil', 28, '', 'Honor the art, respect the opponent.', true, 24),

  -- Row 3 (25-34)
  ('Takeshi Watanabe', '6th Dan Black Belt', 'Kyoto Lightning Judo Club', 'Kyoto', 'Japan', 24, '', 'Through repetition and dedication, we build not just technique, but character.', true, 25),
  ('Diego Lopez', '5th Dan Black Belt', 'Valencia Peaceful Warrior Dojo', 'Valencia', 'Spain', 17, '', 'Judo teaches us to fall seven times and stand up eight.', true, 26),
  ('Sophia Brown', '8th Dan Black Belt', 'Edinburgh Spirit Judo Academy', 'Edinburgh', 'United Kingdom', 33, '', 'The way of judo is the way of harmony and mutual respect.', true, 27),
  ('Jean Durand', '7th Dan Black Belt', 'Marseille Honor Dojo', 'Marseille', 'France', 30, '', 'Every student teaches us as much as we teach them.', true, 28),
  ('Peter Fischer', '6th Dan Black Belt', 'Hamburg Kodokan Dojo', 'Hamburg', 'Germany', 22, '', 'Kata is the foundation of all judo excellence.', true, 29),
  ('Valentina Esposito', '5th Dan Black Belt', 'Naples Budokwai', 'Naples', 'Italy', 19, '', 'In judo, we seek perfection of character.', true, 30),
  ('Dmitri Volkov', '7th Dan Black Belt', 'Moscow Judo Academy', 'Moscow', 'Russia', 29, '', 'The gentle way leads to the strongest path.', true, 31),
  ('Liu Huang', '6th Dan Black Belt', 'Hong Kong Martial Arts Center', 'Hong Kong', 'China', 26, '', 'Maximum efficiency, minimum effort.', true, 32),
  ('Deepa Singh', '5th Dan Black Belt', 'Bangalore Traditional Judo Club', 'Bangalore', 'India', 21, '', 'Mutual welfare and benefit for all.', true, 33),
  ('Pedro Costa', '6th Dan Black Belt', 'Brasilia Olympic Judo Center', 'Brasilia', 'Brazil', 25, '', 'Respect is earned on the tatami.', true, 34),

  -- Row 4 (35-44)
  ('Hiroshi Kobayashi', '7th Dan Black Belt', 'Osaka Samurai Dojo', 'Osaka', 'Japan', 31, '', 'Technique is nothing without heart.', true, 35),
  ('Ana Rodriguez', '6th Dan Black Belt', 'Madrid Warriors Dojo', 'Madrid', 'Spain', 27, '', 'We preserve tradition while embracing the future.', true, 36),
  ('William Jones', '5th Dan Black Belt', 'London Elite Judo Academy', 'London', 'United Kingdom', 18, '', 'Judo is a way of life, not just a sport.', true, 37),
  ('Claire Moreau', '8th Dan Black Belt', 'Paris Champions Club', 'Paris', 'France', 36, '', 'Through kata, we connect with generations past.', true, 38),
  ('Michael Weber', '7th Dan Black Belt', 'Berlin Harmony Dojo', 'Berlin', 'Germany', 32, '', 'Excellence is not an act, but a habit.', true, 39),
  ('Chiara Bianchi', '6th Dan Black Belt', 'Rome Zenith Judo', 'Rome', 'Italy', 24, '', 'The dojo is where we forge our spirit.', true, 40),
  ('Igor Sokolov', '5th Dan Black Belt', 'St Petersburg Victory Dojo', 'St Petersburg', 'Russia', 20, '', 'In every throw, there is a lesson.', true, 41),
  ('Zhang Zhao', '7th Dan Black Belt', 'Beijing Phoenix Martial Arts', 'Beijing', 'China', 28, '', 'Discipline today, victory tomorrow.', true, 42),
  ('Ravi Sharma', '6th Dan Black Belt', 'Mumbai Dragon Judo Club', 'Mumbai', 'India', 23, '', 'The path of judo is endless learning.', true, 43),
  ('Mariana Oliveira', '5th Dan Black Belt', 'São Paulo Imperial Dojo', 'São Paulo', 'Brazil', 19, '', 'Honor the art, respect the opponent.', true, 44),

  -- Row 5 (45-54)
  ('Akira Tanaka', '6th Dan Black Belt', 'Tokyo Rising Sun Judo', 'Tokyo', 'Japan', 25, '', 'Through repetition and dedication, we build not just technique, but character.', true, 45),
  ('Maria Gonzalez', '7th Dan Black Belt', 'Barcelona Golden Belt Academy', 'Barcelona', 'Spain', 30, '', 'Judo teaches us to fall seven times and stand up eight.', true, 46),
  ('Henry Miller', '5th Dan Black Belt', 'Manchester Mountain Peak Dojo', 'Manchester', 'United Kingdom', 17, '', 'The way of judo is the way of harmony and mutual respect.', true, 47),
  ('Luc Laurent', '6th Dan Black Belt', 'Lyon River Flow Judo', 'Lyon', 'France', 22, '', 'Every student teaches us as much as we teach them.', true, 48),
  ('Thomas Meyer', '8th Dan Black Belt', 'Munich Thunder Dojo', 'Munich', 'Germany', 35, '', 'Kata is the foundation of all judo excellence.', true, 49),
  ('Elena Romano', '7th Dan Black Belt', 'Milan Lightning Judo Club', 'Milan', 'Italy', 29, '', 'In judo, we seek perfection of character.', true, 50),
  ('Alexei Kozlov', '6th Dan Black Belt', 'Moscow Peaceful Warrior Dojo', 'Moscow', 'Russia', 26, '', 'The gentle way leads to the strongest path.', true, 51),
  ('Chen Wu', '5th Dan Black Belt', 'Shanghai Spirit Judo Academy', 'Shanghai', 'China', 21, '', 'Maximum efficiency, minimum effort.', true, 52),
  ('Kavita Gupta', '7th Dan Black Belt', 'Delhi Honor Dojo', 'Delhi', 'India', 27, '', 'Mutual welfare and benefit for all.', true, 53),
  ('Miguel Pereira', '6th Dan Black Belt', 'Rio de Janeiro Kodokan Dojo', 'Rio de Janeiro', 'Brazil', 24, '', 'Respect is earned on the tatami.', true, 54),

  -- Row 6 (55-64)
  ('Yuki Suzuki', '5th Dan Black Belt', 'Kyoto Budokwai', 'Kyoto', 'Japan', 18, '', 'Technique is nothing without heart.', true, 55),
  ('Carlos Martinez', '7th Dan Black Belt', 'Valencia Judo Academy', 'Valencia', 'Spain', 31, '', 'We preserve tradition while embracing the future.', true, 56),
  ('Ava Davis', '6th Dan Black Belt', 'Edinburgh Martial Arts Center', 'Edinburgh', 'United Kingdom', 23, '', 'Judo is a way of life, not just a sport.', true, 57),
  ('Sophie Simon', '5th Dan Black Belt', 'Marseille Traditional Judo Club', 'Marseille', 'France', 20, '', 'Through kata, we connect with generations past.', true, 58),
  ('Lars Wagner', '8th Dan Black Belt', 'Hamburg Olympic Judo Center', 'Hamburg', 'Germany', 34, '', 'Excellence is not an act, but a habit.', true, 59),
  ('Matteo Colombo', '7th Dan Black Belt', 'Naples Samurai Dojo', 'Naples', 'Italy', 28, '', 'The dojo is where we forge our spirit.', true, 60),
  ('Svetlana Novikov', '6th Dan Black Belt', 'St Petersburg Warriors Dojo', 'St Petersburg', 'Russia', 25, '', 'In every throw, there is a lesson.', true, 61),
  ('Li Zhou', '5th Dan Black Belt', 'Hong Kong Elite Judo Academy', 'Hong Kong', 'China', 19, '', 'Discipline today, victory tomorrow.', true, 62),
  ('Anjali Khan', '6th Dan Black Belt', 'Bangalore Champions Club', 'Bangalore', 'India', 22, '', 'The path of judo is endless learning.', true, 63),
  ('Rafael Rodrigues', '7th Dan Black Belt', 'Brasilia Harmony Dojo', 'Brasilia', 'Brazil', 29, '', 'Honor the art, respect the opponent.', true, 64),

  -- Row 7 (65-74)
  ('Kenji Yamamoto', '6th Dan Black Belt', 'Osaka Zenith Judo', 'Osaka', 'Japan', 24, '', 'Through repetition and dedication, we build not just technique, but character.', true, 65),
  ('Sofia Garcia', '5th Dan Black Belt', 'Madrid Victory Dojo', 'Madrid', 'Spain', 16, '', 'Judo teaches us to fall seven times and stand up eight.', true, 66),
  ('Lucas Wilson', '7th Dan Black Belt', 'London Phoenix Martial Arts', 'London', 'United Kingdom', 30, '', 'The way of judo is the way of harmony and mutual respect.', true, 67),
  ('Antoine Michel', '6th Dan Black Belt', 'Paris Dragon Judo Club', 'Paris', 'France', 26, '', 'Every student teaches us as much as we teach them.', true, 68),
  ('Anna Becker', '5th Dan Black Belt', 'Berlin Imperial Dojo', 'Berlin', 'Germany', 21, '', 'Kata is the foundation of all judo excellence.', true, 69),
  ('Andrea Ricci', '8th Dan Black Belt', 'Rome Rising Sun Judo', 'Rome', 'Italy', 33, '', 'In judo, we seek perfection of character.', true, 70),
  ('Sergei Morozov', '7th Dan Black Belt', 'Moscow Golden Belt Academy', 'Moscow', 'Russia', 27, '', 'The gentle way leads to the strongest path.', true, 71),
  ('Wang Xu', '6th Dan Black Belt', 'Beijing Mountain Peak Dojo', 'Beijing', 'China', 23, '', 'Maximum efficiency, minimum effort.', true, 72),
  ('Meera Nair', '5th Dan Black Belt', 'Mumbai River Flow Judo', 'Mumbai', 'India', 18, '', 'Mutual welfare and benefit for all.', true, 73),
  ('André Almeida', '6th Dan Black Belt', 'São Paulo Thunder Dojo', 'São Paulo', 'Brazil', 22, '', 'Respect is earned on the tatami.', true, 74),

  -- Row 8 (75-84)
  ('Takeshi Kobayashi', '7th Dan Black Belt', 'Tokyo Lightning Judo Club', 'Tokyo', 'Japan', 28, '', 'Technique is nothing without heart.', true, 75),
  ('Diego Rodriguez', '6th Dan Black Belt', 'Barcelona Peaceful Warrior Dojo', 'Barcelona', 'Spain', 25, '', 'We preserve tradition while embracing the future.', true, 76),
  ('Isabella Moore', '5th Dan Black Belt', 'Manchester Spirit Judo Academy', 'Manchester', 'United Kingdom', 19, '', 'Judo is a way of life, not just a sport.', true, 77),
  ('Camille Lefebvre', '8th Dan Black Belt', 'Lyon Honor Dojo', 'Lyon', 'France', 35, '', 'Through kata, we connect with generations past.', true, 78),
  ('Hans Schulz', '7th Dan Black Belt', 'Munich Kodokan Dojo', 'Munich', 'Germany', 31, '', 'Excellence is not an act, but a habit.', true, 79),
  ('Giulia Marino', '6th Dan Black Belt', 'Milan Budokwai', 'Milan', 'Italy', 24, '', 'The dojo is where we forge our spirit.', true, 80),
  ('Olga Pavlov', '5th Dan Black Belt', 'St Petersburg Judo Academy', 'St Petersburg', 'Russia', 20, '', 'In every throw, there is a lesson.', true, 81),
  ('Liu Yang', '7th Dan Black Belt', 'Shanghai Martial Arts Center', 'Shanghai', 'China', 26, '', 'Discipline today, victory tomorrow.', true, 82),
  ('Arjun Desai', '6th Dan Black Belt', 'Delhi Traditional Judo Club', 'Delhi', 'India', 23, '', 'The path of judo is endless learning.', true, 83),
  ('Carolina Nascimento', '5th Dan Black Belt', 'Rio de Janeiro Olympic Judo Center', 'Rio de Janeiro', 'Brazil', 17, '', 'Honor the art, respect the opponent.', true, 84),

  -- Row 9 (85-94)
  ('Hiroshi Watanabe', '6th Dan Black Belt', 'Kyoto Samurai Dojo', 'Kyoto', 'Japan', 22, '', 'Through repetition and dedication, we build not just technique, but character.', true, 85),
  ('Ana Lopez', '7th Dan Black Belt', 'Valencia Warriors Dojo', 'Valencia', 'Spain', 29, '', 'Judo teaches us to fall seven times and stand up eight.', true, 86),
  ('Oliver Taylor', '5th Dan Black Belt', 'Edinburgh Elite Judo Academy', 'Edinburgh', 'United Kingdom', 18, '', 'The way of judo is the way of harmony and mutual respect.', true, 87),
  ('Louis Leroy', '6th Dan Black Belt', 'Marseille Champions Club', 'Marseille', 'France', 21, '', 'Every student teaches us as much as we teach them.', true, 88),
  ('Lisa Hoffmann', '8th Dan Black Belt', 'Hamburg Harmony Dojo', 'Hamburg', 'Germany', 32, '', 'Kata is the foundation of all judo excellence.', true, 89),
  ('Alessandro Greco', '7th Dan Black Belt', 'Naples Zenith Judo', 'Naples', 'Italy', 27, '', 'In judo, we seek perfection of character.', true, 90),
  ('Vladimir Fedorov', '6th Dan Black Belt', 'Moscow Victory Dojo', 'Moscow', 'Russia', 24, '', 'The gentle way leads to the strongest path.', true, 91),
  ('Zhang Lin', '5th Dan Black Belt', 'Hong Kong Phoenix Martial Arts', 'Hong Kong', 'China', 16, '', 'Maximum efficiency, minimum effort.', true, 92),
  ('Suresh Reddy', '7th Dan Black Belt', 'Bangalore Dragon Judo Club', 'Bangalore', 'India', 28, '', 'Mutual welfare and benefit for all.', true, 93),
  ('Juliana Lima', '6th Dan Black Belt', 'Brasilia Imperial Dojo', 'Brasilia', 'Brazil', 23, '', 'Respect is earned on the tatami.', true, 94),

  -- Row 10 (95-104)
  ('Akira Suzuki', '5th Dan Black Belt', 'Osaka Rising Sun Judo', 'Osaka', 'Japan', 19, '', 'Technique is nothing without heart.', true, 95),
  ('Maria Gonzalez', '7th Dan Black Belt', 'Madrid Golden Belt Academy', 'Madrid', 'Spain', 30, '', 'We preserve tradition while embracing the future.', true, 96),
  ('Emma Brown', '6th Dan Black Belt', 'London Mountain Peak Dojo', 'London', 'United Kingdom', 25, '', 'Judo is a way of life, not just a sport.', true, 97),
  ('Pierre Bernard', '5th Dan Black Belt', 'Paris River Flow Judo', 'Paris', 'France', 20, '', 'Through kata, we connect with generations past.', true, 98),
  ('Klaus Fischer', '8th Dan Black Belt', 'Berlin Thunder Dojo', 'Berlin', 'Germany', 34, '', 'Excellence is not an act, but a habit.', true, 99),
  ('Francesca Ferrari', '7th Dan Black Belt', 'Rome Lightning Judo Club', 'Rome', 'Italy', 31, '', 'The dojo is where we forge our spirit.', true, 100),
  ('Dmitri Ivanov', '6th Dan Black Belt', 'St Petersburg Peaceful Warrior Dojo', 'St Petersburg', 'Russia', 26, '', 'In every throw, there is a lesson.', true, 101),
  ('Chen Zhang', '5th Dan Black Belt', 'Beijing Spirit Judo Academy', 'Beijing', 'China', 22, '', 'Discipline today, victory tomorrow.', true, 102),
  ('Priya Kumar', '7th Dan Black Belt', 'Mumbai Honor Dojo', 'Mumbai', 'India', 27, '', 'The path of judo is endless learning.', true, 103),
  ('João Costa', '6th Dan Black Belt', 'São Paulo Kodokan Dojo', 'São Paulo', 'Brazil', 24, '', 'Honor the art, respect the opponent.', true, 104),

  -- Final Row (105-114)
  ('Yuki Tanaka', '5th Dan Black Belt', 'Tokyo Budokwai', 'Tokyo', 'Japan', 17, '', 'Through repetition and dedication, we build not just technique, but character.', true, 105),
  ('Carlos Garcia', '6th Dan Black Belt', 'Barcelona Judo Academy', 'Barcelona', 'Spain', 21, '', 'Judo teaches us to fall seven times and stand up eight.', true, 106),
  ('Sophia Williams', '7th Dan Black Belt', 'Manchester Martial Arts Center', 'Manchester', 'United Kingdom', 28, '', 'The way of judo is the way of harmony and mutual respect.', true, 107),
  ('Marie Dubois', '5th Dan Black Belt', 'Lyon Traditional Judo Club', 'Lyon', 'France', 18, '', 'Every student teaches us as much as we teach them.', true, 108),
  ('Peter Schmidt', '8th Dan Black Belt', 'Munich Olympic Judo Center', 'Munich', 'Germany', 33, '', 'Kata is the foundation of all judo excellence.', true, 109),
  ('Valentina Rossi', '7th Dan Black Belt', 'Milan Samurai Dojo', 'Milan', 'Italy', 29, '', 'In judo, we seek perfection of character.', true, 110),
  ('Anastasia Petrov', '6th Dan Black Belt', 'Moscow Warriors Dojo', 'Moscow', 'Russia', 25, '', 'The gentle way leads to the strongest path.', true, 111),
  ('Wang Chen', '5th Dan Black Belt', 'Shanghai Elite Judo Academy', 'Shanghai', 'China', 20, '', 'Maximum efficiency, minimum effort.', true, 112),
  ('Amit Patel', '7th Dan Black Belt', 'Delhi Champions Club', 'Delhi', 'India', 26, '', 'Mutual welfare and benefit for all.', true, 113),
  ('Ana Silva', '6th Dan Black Belt', 'Rio de Janeiro Harmony Dojo', 'Rio de Janeiro', 'Brazil', 23, '', 'Respect is earned on the tatami.', true, 114)
ON CONFLICT (id) DO NOTHING;
