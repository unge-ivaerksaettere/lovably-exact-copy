-- Clear existing podcast episodes to start fresh
DELETE FROM public.podcast_episodes;

-- Insert the 4 specific podcast episodes with their corresponding images
INSERT INTO public.podcast_episodes (
  spotify_id,
  title,
  description,
  release_date,
  duration_ms,
  episode_number,
  season_number,
  spotify_url,
  image_url,
  featured
) VALUES 
(
  'fazel_majad_episode',
  'Forbes 30 under 30 med Fazel Majad',
  'En dybdegående samtale med Fazel Majad om hans rejse som ung iværksætter og hans plads på Forbes 30 under 30 listen.',
  '2024-12-01',
  3600000,
  1,
  1,
  'https://open.spotify.com/episode/fazel-majad',
  '/src/assets/podcast-fazel.png',
  true
),
(
  'doubles_peter_episode',
  'Podcast med Doubles og Peter',
  'En spændende samtale med Doubles og Peter om deres iværksætterrejse og erfaringer.',
  '2024-11-28',
  3300000,
  2,
  1,
  'https://open.spotify.com/episode/doubles-peter',
  '/src/assets/podcast-doubles.png',
  false
),
(
  'louliving_episode',
  'Podcast med Louliving',
  'Interview med Louliving om deres virksomhed og vision for fremtiden.',
  '2024-11-25',
  3900000,
  3,
  1,
  'https://open.spotify.com/episode/louliving',
  '/src/assets/podcast-louliving.png',
  false
),
(
  'doner_episode',
  'Podcast med The Döner',
  'En samtale med Doaa Zaheer og The Döner teamet om deres rejse inden for food tech.',
  '2024-11-20',
  3450000,
  4,
  1,
  'https://open.spotify.com/episode/the-doner',
  '/src/assets/podcast-doner.png',
  false
);