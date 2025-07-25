import { useState } from 'react';
import { Link } from 'react-router-dom';

const genres = [
  { 
    name: 'Fiction', 
    emoji: '📖', 
    description: 'Imaginative stories, novels, and literary works', 
    color: 'from-purple-500 to-pink-500',
    bookCount: '15M+'
  },
  { 
    name: 'Self-Help', 
    emoji: '🌟', 
    description: 'Personal development and growth guides', 
    color: 'from-blue-500 to-cyan-500',
    bookCount: '2M+'
  },
  { 
    name: 'Biography', 
    emoji: '👤', 
    description: 'Real life stories of inspiring people', 
    color: 'from-green-500 to-teal-500',
    bookCount: '1.5M+'
  },
  { 
    name: 'Technology', 
    emoji: '💻', 
    description: 'Programming, AI, and digital innovation', 
    color: 'from-gray-500 to-slate-600',
    bookCount: '500K+'
  },
  { 
    name: 'History', 
    emoji: '🏛️', 
    description: 'Past events, civilizations, and cultures', 
    color: 'from-yellow-500 to-orange-500',
    bookCount: '3M+'
  },
  { 
    name: 'Mythology', 
    emoji: '⚡', 
    description: 'Ancient myths, legends, and folklore', 
    color: 'from-red-500 to-pink-500',
    bookCount: '200K+'
  },
  { 
    name: 'Science', 
    emoji: '🔬', 
    description: 'Scientific discoveries and research', 
    color: 'from-indigo-500 to-purple-500',
    bookCount: '1M+'
  },
  { 
    name: 'Romance', 
    emoji: '💕', 
    description: 'Love stories and relationship novels', 
    color: 'from-pink-500 to-rose-500',
    bookCount: '8M+'
  },
  { 
    name: 'Mystery', 
    emoji: '🕵️', 
    description: 'Thrilling detective and crime stories', 
    color: 'from-gray-700 to-gray-900',
    bookCount: '4M+'
  },
  { 
    name: 'Fantasy', 
    emoji: '🧙‍♂️', 
    description: 'Magical worlds and epic adventures', 
    color: 'from-purple-600 to-indigo-600',
    bookCount: '6M+'
  },
  { 
    name: 'Horror', 
    emoji: '👻', 
    description: 'Spine-chilling and supernatural tales', 
    color: 'from-red-700 to-black',
    bookCount: '800K+'
  },
  { 
    name: 'Adventure', 
    emoji: '🗺️', 
    description: 'Exciting journeys and exploration', 
    color: 'from-green-600 to-emerald-600',
    bookCount: '2.5M+'
  }
];

export default function Genres() {
  const [hoveredGenre, setHoveredGenre] = useState(null);

  return (
    <div className="min-h-screen">
      {/* Header Section */}

      <section className="page-hero min-h- section-spacing-small">

    



        <div className="container-modern text-center">
          <h1 className="heading-primary mb-6 floating-animation" style={{ color: 'var(--primary-700)' }}>
            📑 Explore Genres
          </h1>
          <div className="flex justify-center">
  <p className="text-body-large text-center max-w-3xl mb-8" style={{ color: 'var(--text-secondary)' }}>
    Discover books by your favorite categories and explore new literary territories. 
    Each genre offers a unique journey into different worlds of knowledge and imagination.
  </p>
</div>

          
          {/* Stats */}
          
          <div className="flex justify-center">
  <div className="glass-effect card-small w-full max-w-2xl border-subtle px-6 py-4">
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-center">
      <div>
        <div className="text-2xl font-bold" style={{ color: 'var(--primary-600)' }}>40M+</div>
        <div className="text-small" style={{ color: 'var(--text-muted)' }}>Total Books</div>
      </div>
      <div>
        <div className="text-2xl font-bold" style={{ color: 'var(--primary-600)' }}>12</div>
        <div className="text-small" style={{ color: 'var(--text-muted)' }}>Popular Genres</div>
      </div>
      <div>
        <div className="text-2xl font-bold" style={{ color: 'var(--primary-600)' }}>100+</div>
        <div className="text-small" style={{ color: 'var(--text-muted)' }}>Languages</div>
      </div>
    </div>
  </div>
</div>


        </div>
      </section>

      {/* Genres Grid */}
      <section className="section-spacing-small flex justify-center">
  <div className="container mx-auto px-4">
    <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {genres.map((genre, index) => {
        const delay = `${index * 0.1}s`;

        return (
          <Link
            key={genre.name}
            to={`/explore?genre=${encodeURIComponent(genre.name)}`}
            className="block no-underline slide-in-animation"
            style={{ animationDelay: delay }}
            onMouseEnter={() => setHoveredGenre(index)}
            onMouseLeave={() => setHoveredGenre(null)}
          >
            <article className={`card-modern book-card-hover group relative overflow-hidden h-full transition-all duration-500 ${
              hoveredGenre === index ? 'scale-105' : ''
            }`} style={{ 
              background: 'white',
              border: '1px solid var(--border-color)',
              padding: '32px 24px',
              minHeight: '100%'
            }}>
              
              {/* Background Gradient */}
              <div className={`absolute inset-0 bg-gradient-to-br ${genre.color} opacity-5 group-hover:opacity-10 transition-opacity duration-500`}></div>

              {/* Decorative Elements */}
              <div className="absolute -top-4 -right-4 w-16 h-16 rounded-full group-hover:scale-150 transition-transform duration-700" style={{ background: 'var(--primary-100)' }}></div>
              <div className="absolute -bottom-2 -left-2 w-12 h-12 rounded-full group-hover:scale-150 transition-transform duration-700 delay-100" style={{ background: 'var(--primary-50)' }}></div>
              
              {/* Content */}
              <div className="relative z-10 flex flex-col h-full">
                {/* Header */}
                <div className="text-center mb-6">
                  <div className="text-6xl mb-4 group-hover:scale-110 group-hover:rotate-6 transition-all duration-500">
                    {genre.emoji}
                  </div>
                  <h3 className="heading-tertiary group-hover:scale-105 transition-all duration-300" style={{ color: 'var(--text-primary)' }}>
                    {genre.name}
                  </h3>
                  <div className="px-3 py-1 rounded-2xl inline-block mt-2" style={{ 
                    background: 'var(--primary-50)', 
                    border: '1px solid var(--primary-200)' 
                  }}>
                    <span className="text-small" style={{ color: 'var(--primary-700)' }}>{genre.bookCount} books</span>
                  </div>
                </div>
                
                {/* Description */}
                <p className="text-body text-center flex-1 leading-relaxed mb-6" style={{ color: 'var(--text-secondary)' }}>
                  {genre.description}
                </p>
                
                {/* Action Button */}
                <div className="opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-4 group-hover:translate-y-0">
                  <div className="px-6 py-3 rounded-2xl text-center" style={{ 
                    background: 'var(--primary-600)', 
                    color: 'white'
                  }}>
                    <span className="font-medium flex items-center justify-center gap-2">
                      <span className="text-lg">🔍</span>
                      Explore {genre.name}
                    </span>
                  </div>
                </div>
              </div>
            </article>
          </Link>
        );
      })}
    </div>
  </div>
</section>

      {/* Popular Combinations */}
      <section className="pb-16">
        <div className="container-modern">
          <div className="text-center mb-12">
            <h3 className="heading-tertiary text-white mb-4">
              Popular Genre Combinations
            </h3>
            <p className="text-body text-gray-300 max-w-2xl mx-auto">
              Try these popular search combinations to discover unique book collections
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
            {[
              'Science Fiction Fantasy',
              'Mystery Thriller',
              'Historical Fiction',
              'Self Help Business',
              'Biography History',
              'Romance Adventure',
              'Horror Mystery',
              'Technology Science'
            ].map((combo) => (
              <Link
                key={combo}
                to={`/explore?genre=${encodeURIComponent(combo)}`}
                className="glass-effect p-4 rounded-2xl text-center book-card-hover border border-white border-opacity-20 no-underline block"
                //style={{ maxHeight: '30px', overflow: 'hidden' }}
              >
                <span className="text-white text-sm font-medium">{combo}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
