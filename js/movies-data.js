// =============================================
// MOVIES DATA
// In a real app, this comes from a database
// For now, we'll store it right here
// =============================================

const moviesData = {
  
  trending: [
    {
      id: 1,
      title: "Quantum Shadows",
      poster: "https://via.placeholder.com/180x250/1a1a2e/e50914?text=QS",
      rating: "8.9",
      genre: "Sci-Fi",
      year: "2024",
      duration: "2h 18m",
      description: "A brilliant physicist discovers a parallel universe...",
      videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ"
    },
    {
      id: 2,
      title: "Dark Horizons",
      poster: "https://via.placeholder.com/180x250/16213e/e50914?text=DH",
      rating: "8.5",
      genre: "Thriller",
      year: "2024",
      duration: "1h 55m",
      description: "When the city goes dark, one detective must...",
      videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ"
    },
    {
      id: 3,
      title: "Neon Phoenix",
      poster: "https://via.placeholder.com/180x250/0f3460/e50914?text=NP",
      rating: "9.1",
      genre: "Action",
      year: "2024",
      duration: "2h 32m",
      description: "Rise from the ashes in a neon-lit future...",
      videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ"
    },
    {
      id: 4,
      title: "Cosmic Dream",
      poster: "https://via.placeholder.com/180x250/2d1b69/e50914?text=CD",
      rating: "8.7",
      genre: "Fantasy",
      year: "2023",
      duration: "2h 05m",
      description: "Journey through the cosmos of imagination...",
      videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ"
    },
    {
      id: 5,
      title: "Steel Empire",
      poster: "https://via.placeholder.com/180x250/1a0a2e/e50914?text=SE",
      rating: "8.2",
      genre: "Drama",
      year: "2024",
      duration: "2h 45m",
      description: "An empire built on iron will crumble...",
      videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ"
    },
    {
      id: 6,
      title: "Crystal Waters",
      poster: "https://via.placeholder.com/180x250/0a1628/e50914?text=CW",
      rating: "8.6",
      genre: "Adventure",
      year: "2024",
      duration: "1h 48m",
      description: "Deep beneath the ocean lies a secret...",
      videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ"
    }
  ],
  
  topRated: [
    {
      id: 7,
      title: "The Last Signal",
      poster: "https://via.placeholder.com/180x250/2a0a0a/e50914?text=TLS",
      rating: "9.5",
      genre: "Sci-Fi",
      year: "2023",
      duration: "2h 22m",
      description: "Earth receives its last transmission from deep space...",
      videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ"
    },
    {
      id: 8,
      title: "Eternal Winter",
      poster: "https://via.placeholder.com/180x250/0a0a2a/e50914?text=EW",
      rating: "9.3",
      genre: "Drama",
      year: "2023",
      duration: "2h 10m",
      description: "Survival in a world that forgot how to feel...",
      videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ"
    }
  ],
  
  channels: [
    {
      id: 1,
      name: "Sports HD",
      logo: "⚽",
      category: "Sports",
      isLive: true,
      streamUrl: "https://www.youtube.com/embed/live_stream?channel=CHANNEL_ID"
    },
    {
      id: 2,
      name: "News 24/7",
      logo: "📰",
      category: "News",
      isLive: true,
      streamUrl: ""
    },
    {
      id: 3,
      name: "Movie Classic",
      logo: "🎬",
      category: "Movies",
      isLive: true,
      streamUrl: ""
    },
    {
      id: 4,
      name: "Kids Zone",
      logo: "🧸",
      category: "Kids",
      isLive: true,
      streamUrl: ""
    },
    {
      id: 5,
      name: "Tech World",
      logo: "💻",
      category: "Technology",
      isLive: true,
      streamUrl: ""
    }
  ]
};
