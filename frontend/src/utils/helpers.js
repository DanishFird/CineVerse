// Static movie data for development
export const STATIC_MOVIES = [
  {
    id: '1',
    title: 'Inception',
    genre: ['Sci-Fi', 'Thriller'],
    rating: 8.8,
    language: 'English',
    duration: 148,
    releaseDate: '2010-07-16',
    posterUrl: '/posters/inception.svg',
    description: 'A thief who steals corporate secrets through the use of dream-sharing technology is given the inverse task of planting an idea into the mind of a C.E.O.',
    director: 'Christopher Nolan',
  },
  {
    id: '2',
    title: 'The Dark Knight',
    genre: ['Action', 'Crime', 'Drama'],
    rating: 9.0,
    language: 'English',
    duration: 152,
    releaseDate: '2008-07-18',
    posterUrl: '/posters/the-dark-knight.svg',
    description: 'When the menace known as the Joker wreaks havoc and chaos on the people of Gotham, Batman must accept one of the greatest psychological and physical tests of his ability to fight injustice.',
    director: 'Christopher Nolan',
  },
  {
    id: '3',
    title: 'Interstellar',
    genre: ['Sci-Fi', 'Adventure', 'Drama'],
    rating: 8.6,
    language: 'English',
    duration: 169,
    releaseDate: '2014-11-07',
    posterUrl: 'https://image.tmdb.org/t/p/w500/gEU2QniE6E77NI6lCU6MxlNBvIx.jpg',
    description: 'A team of explorers travel through a wormhole in space in an attempt to ensure humanity\'s survival.',
    director: 'Christopher Nolan',
  },
  {
    id: '4',
    title: 'Parasite',
    genre: ['Thriller', 'Drama', 'Comedy'],
    rating: 8.5,
    language: 'Korean',
    duration: 132,
    releaseDate: '2019-05-30',
    posterUrl: 'https://image.tmdb.org/t/p/w500/7IiTTgloJzvGI1TAYymCfbfl3vT.jpg',
    description: 'Greed and class discrimination threaten the newly formed symbiotic relationship between the wealthy Park family and the destitute Kim clan.',
    director: 'Bong Joon-ho',
  },
  {
    id: '5',
    title: 'Dune',
    genre: ['Sci-Fi', 'Adventure'],
    rating: 8.0,
    language: 'English',
    duration: 155,
    releaseDate: '2021-10-22',
    posterUrl: 'https://image.tmdb.org/t/p/w500/d5NXSklXo0qyIYkgV94XAgMIckC.jpg',
    description: 'Feature adaptation of Frank Herbert\'s science fiction novel about the son of a noble family entrusted with the protection of the most valuable asset in the galaxy.',
    director: 'Denis Villeneuve',
  },
  {
    id: '6',
    title: 'Spider-Man: Across the Spider-Verse',
    genre: ['Animation', 'Action', 'Adventure'],
    rating: 8.7,
    language: 'English',
    duration: 140,
    releaseDate: '2023-06-02',
    posterUrl: 'https://image.tmdb.org/t/p/w500/8Vt6mWEReuy4Of61Lnj5Xj704m8.jpg',
    description: 'Miles Morales catapults across the Multiverse, where he encounters a team of Spider-People charged with protecting its very existence.',
    director: 'Joaquim Dos Santos',
  },
  {
    id: '7',
    title: 'Oppenheimer',
    genre: ['Biography', 'Drama', 'History'],
    rating: 8.4,
    language: 'English',
    duration: 180,
    releaseDate: '2023-07-21',
    posterUrl: 'https://image.tmdb.org/t/p/w500/8Gxv8gSFCU0XGDykEGv7zR1n2ua.jpg',
    description: 'The story of American scientist J. Robert Oppenheimer and his role in the development of the atomic bomb.',
    director: 'Christopher Nolan',
  },
  {
    id: '8',
    title: 'Everything Everywhere All at Once',
    genre: ['Action', 'Adventure', 'Comedy'],
    rating: 7.8,
    language: 'English',
    duration: 139,
    releaseDate: '2022-03-25',
    posterUrl: 'https://image.tmdb.org/t/p/w500/w3LxiVYdWWRvEVdn5RYq6jIqkb1.jpg',
    description: 'An aging Chinese immigrant is swept up in an insane adventure where she must connect with lives she could have lived in other universes.',
    director: 'Daniel Kwan',
  },
];

export const STATIC_REVIEWS = [
  { id: '1', movieId: '1', userId: '1', userName: 'Alice Johnson', rating: 5, review: 'Absolutely mind-bending! A masterpiece that challenges your perception of reality.', createdAt: '2024-01-10' },
  { id: '2', movieId: '1', userId: '2', userName: 'Bob Smith', rating: 4, review: 'Complex but rewarding. The visual effects are stunning and the score is iconic.', createdAt: '2024-01-12' },
  { id: '3', movieId: '2', userId: '3', userName: 'Charlie Davis', rating: 5, review: 'Heath Ledger\'s Joker is the greatest villain performance in cinema history.', createdAt: '2024-01-15' },
  { id: '4', movieId: '3', userId: '1', userName: 'Alice Johnson', rating: 5, review: 'A beautiful, emotional journey through space and time. Hans Zimmer\'s score is otherworldly.', createdAt: '2024-02-01' },
  { id: '5', movieId: '4', userId: '4', userName: 'Diana Lee', rating: 5, review: 'Brilliantly crafted social commentary wrapped in a thrilling narrative.', createdAt: '2024-02-10' },
];

export const STATIC_THEATRES = [
  { id: 1, name: 'CineVerse IMAX Downtown', location: 'Downtown, Mumbai', screens: [
    { id: 1, name: 'Audi 1 – IMAX', totalRows: 5, seatsPerRow: 8 },
    { id: 2, name: 'Audi 2 – Premium', totalRows: 5, seatsPerRow: 6 },
  ]},
  { id: 2, name: 'CineVerse Multiplex Andheri', location: 'Andheri West, Mumbai', screens: [
    { id: 3, name: 'Screen 1', totalRows: 5, seatsPerRow: 8 },
    { id: 4, name: 'Screen 2', totalRows: 4, seatsPerRow: 6 },
    { id: 5, name: 'Screen 3', totalRows: 5, seatsPerRow: 8 },
  ]},
];

export const STATIC_SHOWS = [
  { id: 1, movieId: '1', screenId: 1, theatreName: 'CineVerse IMAX Downtown', screenName: 'Audi 1 – IMAX', startTime: '2024-12-20T10:00:00', endTime: '2024-12-20T12:28:00', ticketPrice: 350 },
  { id: 2, movieId: '1', screenId: 2, theatreName: 'CineVerse IMAX Downtown', screenName: 'Audi 2 – Premium', startTime: '2024-12-20T14:00:00', endTime: '2024-12-20T16:28:00', ticketPrice: 500 },
  { id: 3, movieId: '2', screenId: 3, theatreName: 'CineVerse Multiplex Andheri', screenName: 'Screen 1', startTime: '2024-12-20T11:00:00', endTime: '2024-12-20T13:32:00', ticketPrice: 250 },
  { id: 4, movieId: '3', screenId: 1, theatreName: 'CineVerse IMAX Downtown', screenName: 'Audi 1 – IMAX', startTime: '2024-12-20T18:00:00', endTime: '2024-12-20T20:49:00', ticketPrice: 400 },
  { id: 5, movieId: '5', screenId: 5, theatreName: 'CineVerse Multiplex Andheri', screenName: 'Screen 3', startTime: '2024-12-21T15:00:00', endTime: '2024-12-21T17:35:00', ticketPrice: 300 },
];

export const STATIC_USERS = [
  { id: 1, name: 'Admin User', email: 'admin@cineverse.com', role: 'ADMIN' },
  { id: 2, name: 'John Doe', email: 'john@example.com', role: 'USER' },
  { id: 3, name: 'Jane Smith', email: 'jane@example.com', role: 'USER' },
  { id: 4, name: 'Theatre Owner', email: 'owner@theatre.com', role: 'THEATRE_OWNER' },
  { id: 5, name: 'Alice Johnson', email: 'alice@example.com', role: 'USER' },
];

export const STATIC_BOOKINGS = [
  { id: 1, userId: 2, showId: 1, seatNumbers: ['A1', 'A2'], totalAmount: 700, status: 'CONFIRMED', createdAt: '2024-12-18T10:30:00' },
  { id: 2, userId: 3, showId: 3, seatNumbers: ['B3', 'B4', 'B5'], totalAmount: 750, status: 'CONFIRMED', createdAt: '2024-12-18T14:15:00' },
  { id: 3, userId: 5, showId: 2, seatNumbers: ['C1'], totalAmount: 500, status: 'CANCELLED', createdAt: '2024-12-19T09:00:00' },
];

// Generate seat layout for a show
export function generateSeatLayout(totalRows, seatsPerRow, bookedSeats = []) {
  const rows = [];
  const rowLabels = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  for (let r = 0; r < totalRows; r++) {
    const seats = [];
    for (let s = 1; s <= seatsPerRow; s++) {
      const seatNumber = `${rowLabels[r]}${s}`;
      seats.push({
        seatNumber,
        type: r < 2 ? 'PREMIUM' : 'REGULAR',
        status: bookedSeats.includes(seatNumber) ? 'BOOKED' : 'AVAILABLE',
      });
    }
    rows.push({ label: rowLabels[r], seats });
  }
  return rows;
}

export function formatDate(dateStr) {
  return new Date(dateStr).toLocaleDateString('en-US', {
    year: 'numeric', month: 'short', day: 'numeric',
  });
}

export function formatTime(dateStr) {
  return new Date(dateStr).toLocaleTimeString('en-US', {
    hour: '2-digit', minute: '2-digit', hour12: true,
  });
}

export function formatCurrency(amount) {
  return `₹${amount.toLocaleString('en-IN')}`;
}

export function getStarRating(rating) {
  const stars = Math.round(rating / 2);
  return '★'.repeat(stars) + '☆'.repeat(5 - stars);
}
