import { createClient } from '@supabase/supabase-js';
import { readFileSync } from 'fs';

const envFile = readFileSync('.env', 'utf-8');
const envVars = {};
envFile.split('\n').forEach(line => {
  const [key, ...valueParts] = line.split('=');
  if (key && valueParts.length) {
    envVars[key.trim()] = valueParts.join('=').trim();
  }
});

const supabase = createClient(
  envVars.VITE_SUPABASE_URL,
  envVars.VITE_SUPABASE_ANON_KEY
);

const firstNames = [
  'Akira', 'Yuki', 'Kenji', 'Hiroshi', 'Takeshi', 'Maria', 'Carlos', 'Sofia', 'Diego', 'Ana',
  'James', 'Emma', 'Oliver', 'Sophia', 'William', 'Ava', 'Lucas', 'Isabella', 'Henry', 'Mia',
  'Pierre', 'Marie', 'Jean', 'Claire', 'Luc', 'Sophie', 'Antoine', 'Camille', 'Louis', 'Emma',
  'Hans', 'Greta', 'Klaus', 'Anna', 'Peter', 'Lisa', 'Michael', 'Sarah', 'Thomas', 'Laura',
  'Giovanni', 'Francesca', 'Marco', 'Giulia', 'Alessandro', 'Valentina', 'Matteo', 'Chiara', 'Andrea', 'Elena',
  'Vladimir', 'Anastasia', 'Dmitri', 'Natasha', 'Igor', 'Svetlana', 'Alexei', 'Olga', 'Sergei', 'Irina',
  'Chen', 'Li', 'Wang', 'Zhang', 'Liu', 'Huang', 'Zhao', 'Wu', 'Zhou', 'Xu',
  'Raj', 'Priya', 'Amit', 'Anjali', 'Ravi', 'Deepa', 'Arjun', 'Kavita', 'Suresh', 'Meera',
  'João', 'Ana', 'Pedro', 'Mariana', 'Miguel', 'Beatriz', 'Rafael', 'Carolina', 'André', 'Juliana',
  'Ahmed', 'Fatima', 'Hassan', 'Aisha', 'Omar', 'Yasmin', 'Khalid', 'Leila', 'Tariq', 'Noor',
  'Erik', 'Astrid', 'Lars', 'Ingrid', 'Bjorn', 'Freya', 'Sven', 'Hanna', 'Nils', 'Karin'
];

const lastNames = [
  'Tanaka', 'Suzuki', 'Yamamoto', 'Watanabe', 'Kobayashi', 'Rodriguez', 'Garcia', 'Martinez', 'Lopez', 'Gonzalez',
  'Smith', 'Johnson', 'Williams', 'Brown', 'Jones', 'Miller', 'Davis', 'Wilson', 'Moore', 'Taylor',
  'Dubois', 'Martin', 'Bernard', 'Durand', 'Moreau', 'Laurent', 'Simon', 'Michel', 'Lefebvre', 'Leroy',
  'Müller', 'Schmidt', 'Schneider', 'Fischer', 'Weber', 'Meyer', 'Wagner', 'Becker', 'Schulz', 'Hoffmann',
  'Rossi', 'Russo', 'Ferrari', 'Esposito', 'Bianchi', 'Romano', 'Colombo', 'Ricci', 'Marino', 'Greco',
  'Ivanov', 'Petrov', 'Sidorov', 'Volkov', 'Sokolov', 'Kozlov', 'Novikov', 'Morozov', 'Pavlov', 'Fedorov',
  'Wong', 'Lee', 'Kim', 'Park', 'Chen', 'Lin', 'Liu', 'Yang', 'Huang', 'Zhang',
  'Patel', 'Kumar', 'Singh', 'Sharma', 'Gupta', 'Khan', 'Shah', 'Desai', 'Reddy', 'Nair',
  'Silva', 'Santos', 'Costa', 'Oliveira', 'Pereira', 'Rodrigues', 'Almeida', 'Nascimento', 'Lima', 'Sousa',
  'Ali', 'Hassan', 'Mohammed', 'Ibrahim', 'Mahmoud', 'Ahmed', 'Abdullah', 'Rahman', 'Hussein', 'Khalil',
  'Andersson', 'Johansson', 'Karlsson', 'Nilsson', 'Eriksson', 'Larsson', 'Olsson', 'Persson', 'Svensson', 'Gustafsson'
];

const cities = [
  'Tokyo', 'Osaka', 'Kyoto', 'Madrid', 'Barcelona', 'Valencia', 'London', 'Manchester', 'Edinburgh',
  'Paris', 'Lyon', 'Marseille', 'Berlin', 'Munich', 'Hamburg', 'Rome', 'Milan', 'Naples',
  'Moscow', 'St Petersburg', 'Beijing', 'Shanghai', 'Hong Kong', 'Mumbai', 'Delhi', 'Bangalore',
  'São Paulo', 'Rio de Janeiro', 'Brasilia', 'Cairo', 'Dubai', 'Istanbul', 'Stockholm', 'Oslo',
  'Copenhagen', 'Amsterdam', 'Brussels', 'Vienna', 'Prague', 'Warsaw', 'Budapest', 'Athens',
  'Lisbon', 'Porto', 'Dublin', 'Glasgow', 'Birmingham', 'Liverpool', 'Leeds', 'Bristol',
  'New York', 'Los Angeles', 'Chicago', 'Toronto', 'Vancouver', 'Montreal', 'Sydney', 'Melbourne',
  'Auckland', 'Wellington', 'Singapore', 'Bangkok', 'Kuala Lumpur', 'Jakarta', 'Seoul', 'Taipei',
  'Buenos Aires', 'Santiago', 'Lima', 'Bogotá', 'Mexico City', 'Cape Town', 'Johannesburg', 'Nairobi'
];

const countries = [
  'Japan', 'Spain', 'United Kingdom', 'France', 'Germany', 'Italy', 'Russia', 'China',
  'India', 'Brazil', 'Egypt', 'United Arab Emirates', 'Turkey', 'Sweden', 'Norway',
  'Denmark', 'Netherlands', 'Belgium', 'Austria', 'Czech Republic', 'Poland', 'Hungary',
  'Greece', 'Portugal', 'Ireland', 'United States', 'Canada', 'Australia', 'New Zealand',
  'Singapore', 'Thailand', 'Malaysia', 'Indonesia', 'South Korea', 'Taiwan', 'Argentina',
  'Chile', 'Peru', 'Colombia', 'Mexico', 'South Africa', 'Kenya'
];

const dojoNames = [
  'Kodokan Dojo', 'Budokwai', 'Judo Academy', 'Martial Arts Center', 'Traditional Judo Club',
  'Olympic Judo Center', 'Samurai Dojo', 'Warriors Dojo', 'Elite Judo Academy', 'Champions Club',
  'Harmony Dojo', 'Zenith Judo', 'Victory Dojo', 'Phoenix Martial Arts', 'Dragon Judo Club',
  'Imperial Dojo', 'Rising Sun Judo', 'Golden Belt Academy', 'Mountain Peak Dojo', 'River Flow Judo',
  'Thunder Dojo', 'Lightning Judo Club', 'Peaceful Warrior Dojo', 'Spirit Judo Academy', 'Honor Dojo'
];

const titles = [
  '3rd Dan Black Belt', '4th Dan Black Belt', '5th Dan Black Belt',
  '6th Dan Black Belt', '7th Dan Black Belt', '8th Dan Black Belt',
  'Sensei', 'Shihan', 'Renshi', 'Kyoshi'
];

const quotes = [
  'Through repetition and dedication, we build not just technique, but character.',
  'Judo teaches us to fall seven times and stand up eight.',
  'The way of judo is the way of harmony and mutual respect.',
  'Every student teaches us as much as we teach them.',
  'Kata is the foundation of all judo excellence.',
  'In judo, we seek perfection of character.',
  'The gentle way leads to the strongest path.',
  'Maximum efficiency, minimum effort.',
  'Mutual welfare and benefit for all.',
  'Respect is earned on the tatami.',
  'Technique is nothing without heart.',
  'We preserve tradition while embracing the future.',
  'Judo is a way of life, not just a sport.',
  'Through kata, we connect with generations past.',
  'Excellence is not an act, but a habit.',
  'The dojo is where we forge our spirit.',
  'In every throw, there is a lesson.',
  'Discipline today, victory tomorrow.',
  'The path of judo is endless learning.',
  'Honor the art, respect the opponent.'
];

async function addFoundingMembers() {
  console.log('Starting to add founding members...\n');

  const members = [];

  for (let i = 0; i < 110; i++) {
    const firstName = firstNames[Math.floor(Math.random() * firstNames.length)];
    const lastName = lastNames[Math.floor(Math.random() * lastNames.length)];
    const city = cities[Math.floor(Math.random() * cities.length)];
    const country = countries[Math.floor(Math.random() * countries.length)];
    const dojoBase = dojoNames[Math.floor(Math.random() * dojoNames.length)];

    members.push({
      name: `${firstName} ${lastName}`,
      title: titles[Math.floor(Math.random() * titles.length)],
      dojo_name: `${city} ${dojoBase}`,
      city: city,
      country: country,
      years_teaching: Math.floor(Math.random() * 30) + 5,
      photo_url: '',
      quote: quotes[Math.floor(Math.random() * quotes.length)],
      is_founding_member: true,
      order_index: i + 1
    });
  }

  // Insert in batches of 10
  for (let i = 0; i < members.length; i += 10) {
    const batch = members.slice(i, i + 10);
    const { data, error } = await supabase
      .from('founders')
      .insert(batch)
      .select();

    if (error) {
      console.error(`Error inserting batch ${i / 10 + 1}:`, error);
    } else {
      console.log(`✓ Added batch ${i / 10 + 1} (members ${i + 1}-${i + batch.length})`);
    }
  }

  console.log('\n✓ Successfully added 110 founding members!');
  console.log('\nTo view them, visit the Founding Sensei Circle page.');
}

addFoundingMembers().catch(console.error);
