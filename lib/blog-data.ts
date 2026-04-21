export type BlogAuthor = {
  name: string
  role?: string
  initials: string
  accentClass: string
}

export type BlogCrop = {
  x: number
  y: number
  width: number
  height: number
}

export type BlogPost = {
  slug: string
  title: string
  excerpt: string
  intro: string
  date: string
  dateLabel: string
  category: string
  readTime: string
  author: BlogAuthor
  crop: BlogCrop
  content: string[]
  featureNote?: string
  structuredSections?: Array<{
    title: string
    bullets: string[]
  }>
  conclusion?: string
}

export const blogSprite = {
  src: '/blog-reference.png',
  width: 5760,
  height: 7108,
} as const

export const blogPosts: BlogPost[] = [
  {
    slug: 'eco-friendly-homes-the-future-of-real-estate',
    title: 'Eco-Friendly Homes: The Future of Real Estate',
    excerpt:
      'The real estate industry is undergoing a significant transformation as eco-friendly homes gain popularity among buyers and developers alike.',
    intro:
      'Sustainability is no longer a niche preference. It is becoming one of the clearest signals of long-term value in residential design.',
    date: '2024-11-29',
    dateLabel: 'Nov 29, 2024',
    category: 'Design',
    readTime: '6 min read',
    author: {
      name: 'Saarah Mcbride',
      initials: 'SM',
      accentClass: 'from-[#f6c6b8] to-[#8c5d55] text-[#21110c]',
    },
    crop: { x: 226, y: 642, width: 1439, height: 1120 },
    content: [
      'Eco-friendly homes are moving from aspirational concept to market expectation. Buyers increasingly evaluate energy efficiency, healthier materials, and operational savings alongside location and square footage.',
      'Designers and developers are responding by prioritizing natural light, low-impact finishes, better insulation, and systems that reduce long-term waste. Those improvements are practical as much as they are ethical.',
      'What matters most is that sustainability is being translated into a better lived experience. Homes that cost less to run, feel more comfortable, and age with fewer compromises are simply stronger products.',
    ],
  },
  {
    slug: 'digital-declutter-cutting-the-noise-in-a-hyperconnected-world',
    title: 'Digital Declutter : Cutting the Noise in a Hyperconnected World',
    excerpt:
      'In today\'s hyperconnected world, the lines between work, leisure, and rest have blurred significantly. Notifications, endless feeds, and constant alerts make focus harder to protect.',
    intro:
      'Attention has become a design problem. Reducing noise is often less about discipline and more about structuring better defaults.',
    date: '2024-11-29',
    dateLabel: 'Nov 29, 2024',
    category: 'Culture',
    readTime: '5 min read',
    author: {
      name: 'Author',
      initials: 'AU',
      accentClass: 'from-[#9fd8ff] to-[#e84f42] text-[#111827]',
    },
    crop: { x: 1815, y: 642, width: 1449, height: 1120 },
    content: [
      'Digital clutter rarely looks dramatic. It usually arrives as a steady accumulation of tabs, pings, unread badges, and fragmented routines that drain attention one interruption at a time.',
      'Decluttering starts with defining what deserves immediate access and what should be pushed out of sight. Fewer entry points create calmer systems and better decision-making.',
      'When the interface around us becomes quieter, we regain room for depth. The goal is not disconnection. It is intentional connection with less friction and less mental residue.',
    ],
  },
  {
    slug: 'a-foodies-guide-to-europe-best-culinary-experiences',
    title: 'A Foodie\'s Guide to Europe: Best Culinary Experiences',
    excerpt:
      'Europe is a treasure trove of culinary delights, offering a diverse array of flavors, techniques, and traditions for food enthusiasts who want depth, not just destination lists.',
    intro:
      'The best food travel is built around atmosphere, local rhythm, and meals that say something specific about place.',
    date: '2024-11-29',
    dateLabel: 'Nov 29, 2024',
    category: 'Travel',
    readTime: '7 min read',
    author: {
      name: 'Cruz Mcintyre',
      initials: 'CM',
      accentClass: 'from-[#cad6dc] to-[#5d707a] text-[#101418]',
    },
    crop: { x: 226, y: 3365, width: 1439, height: 1120 },
    featureNote: 'Here’s a country-by-country guide to some of the best culinary experiences in Europe.',
    structuredSections: [
      {
        title: 'France: Haute Cuisine and Pastries',
        bullets: [
          'Must-Try Dishes: Coq au Vin, Ratatouille, and Bouillabaisse.',
          'Signature Experience: Savoring a croissant and espresso at a Parisian café or dining at a Michelin-starred restaurant in Lyon.',
          'Don’t Miss: A wine-tasting tour in Bordeaux or Champagne.',
        ],
      },
      {
        title: 'Italy: The Heart of Comfort Food',
        bullets: [
          'Must-Try Dishes: Pizza Margherita, Risotto alla Milanese, and Gelato.',
          'Signature Experience: Enjoying fresh pasta in Bologna or a Neapolitan pizza in Naples.',
          'Don’t Miss: A vineyard tour in Tuscany to sample Chianti wines.',
        ],
      },
      {
        title: 'Spain: Tapas and Traditions',
        bullets: [
          'Must-Try Dishes: Paella, Jamón Ibérico, and Gazpacho.',
          'Signature Experience: A tapas crawl in Seville or tasting pintxos in the Basque Country.',
          'Don’t Miss: Experiencing a traditional flamenco dinner show.',
        ],
      },
      {
        title: 'Germany: A Celebration of Beer and Bread',
        bullets: [
          'Must-Try Dishes: Bratwurst, Sauerbraten, and Pretzels.',
          'Signature Experience: Attending Oktoberfest in Munich or exploring the Christmas markets for seasonal treats.',
          'Don’t Miss: Sampling craft beers in Berlin’s burgeoning brewery scene.',
        ],
      },
      {
        title: 'Greece: Mediterranean Magic',
        bullets: [
          'Must-Try Dishes: Moussaka, Souvlaki, and Baklava.',
          'Signature Experience: Dining by the sea in Santorini or Crete with fresh seafood and local wine.',
          'Don’t Miss: A cooking class to learn traditional Greek recipes.',
        ],
      },
      {
        title: 'Portugal: Flavors of the Atlantic',
        bullets: [
          'Must-Try Dishes: Bacalhau à Brás, Pastéis de Nata, and Sardinhas Assadas.',
          'Signature Experience: Exploring the food markets in Lisbon or enjoying a Port wine tour in Porto.',
          'Don’t Miss: Tasting freshly caught seafood in a coastal village.',
        ],
      },
      {
        title: 'Belgium: Chocolate and Beyond',
        bullets: [
          'Must-Try Dishes: Moules-frites, Stoofvlees, and Belgian waffles.',
          'Signature Experience: A chocolate-tasting tour in Brussels or sampling beer in Bruges.',
          'Don’t Miss: Pairing local beers with artisanal cheeses.',
        ],
      },
      {
        title: 'Switzerland: Alpine Flavors',
        bullets: [
          'Must-Try Dishes: Fondue, Raclette, and Rösti.',
          'Signature Experience: Dining in a chalet with stunning mountain views or touring a Swiss chocolate factory.',
          'Don’t Miss: Exploring local markets for high-quality cheeses.',
        ],
      },
    ],
    conclusion:
      'Each country in Europe offers a unique culinary adventure, blending tradition and innovation. Whether you’re sipping wine in Tuscany, enjoying tapas in Seville, or savoring pastries in Paris, Europe’s diverse food culture ensures an unforgettable journey for every foodie. Bon appétit!',
    content: [
      'A memorable food itinerary balances iconic meals with smaller discoveries. Markets, neighborhood bakeries, and family-run restaurants often tell the strongest story.',
      'The appeal of Europe is range. A few hours can move you from coastal simplicity to deeply regional dishes shaped by climate, migration, and centuries of habit.',
      'The most rewarding trips leave space for curiosity. Good meals are part of the plan, but the best ones usually happen when the plan loosens at the right time.',
    ],
  },
  {
    slug: 'the-art-of-black-and-white-photography',
    title: 'The Art of Black-and-White Photography',
    excerpt:
      'Black-and-white photography is a timeless art form that transcends trends and technology. By stripping away color, the frame relies on contrast, texture, and light to carry meaning.',
    intro:
      'Without color doing the work, every line, tone, and gesture becomes more visible.',
    date: '2024-11-29',
    dateLabel: 'Nov 29, 2024',
    category: 'Photography',
    readTime: '4 min read',
    author: {
      name: 'Amna',
      initials: 'AM',
      accentClass: 'from-[#f5d3c5] to-[#7a4e44] text-[#1f1714]',
    },
    crop: { x: 1816, y: 3366, width: 1448, height: 1120 },
    content: [
      'Black-and-white images often feel more direct because they reduce visual negotiation. Texture, silhouette, and contrast take center stage immediately.',
      'That restraint can make familiar subjects feel more deliberate. Light becomes structure, and shadow starts to define mood rather than simply support it.',
      'The result is often more enduring than spectacle. When composition is doing the heavy lifting, the image tends to stay readable for longer.',
    ],
  },
  {
    slug: 'the-science-of-sleep-how-rest-shapes-your-productivity',
    title: 'The Science of Sleep: How Rest Shapes Your Productivity',
    excerpt:
      'Rest is not a break from performance. It is one of the underlying systems that makes sustained performance possible.',
    intro:
      'Productivity advice often focuses on output. Sleep reminds us that capacity comes first.',
    date: '2024-11-29',
    dateLabel: 'Nov 29, 2024',
    category: 'Wellness',
    readTime: '6 min read',
    author: {
      name: 'Daniel Cruz',
      initials: 'DC',
      accentClass: 'from-[#c8a1ff] to-[#4f2f87] text-white',
    },
    crop: { x: 3790, y: 4885, width: 1737, height: 1154 },
    content: [
      'Sleep supports memory, emotional regulation, and the ability to do meaningful work without unnecessary drag. It affects quality long before it affects quantity.',
      'Teams and individuals that protect recovery tend to produce steadier output because they are building from a more durable baseline. Fewer reactive decisions usually follow.',
      'The practical lesson is simple: rest is not what happens after the important work. It is one of the conditions that makes important work possible.',
    ],
  },
  {
    slug: 'sustainable-travel-tips-reducing-your-carbon-footprint',
    title: 'Sustainable Travel Tips: Reducing Your Carbon Footprint',
    excerpt:
      'Thoughtful travel choices can reduce waste, lower emissions, and still preserve the sense of discovery that makes travel worthwhile.',
    intro:
      'Responsible travel is mostly about better choices before and during the trip, not removing the trip itself.',
    date: '2024-11-29',
    dateLabel: 'Nov 29, 2024',
    category: 'Travel',
    readTime: '5 min read',
    author: {
      name: 'Clara Wilson',
      initials: 'CW',
      accentClass: 'from-[#cfd8df] to-[#6a727e] text-[#101418]',
    },
    crop: { x: 3791, y: 767, width: 742, height: 742 },
    content: [
      'More sustainable travel usually begins with planning. Longer stays, lighter packing, and fewer unnecessary transfers reduce friction as well as environmental cost.',
      'Local transport, slower itineraries, and businesses with clearer sustainability practices can meaningfully change the footprint of a trip without flattening the experience.',
      'The point is not perfection. It is making repeated choices that align enjoyment with a little more responsibility and a little less waste.',
    ],
  },
  {
    slug: 'the-rise-of-minimalist-interior-design',
    title: 'The Rise of Minimalist Interior Design',
    excerpt:
      'Minimalist interiors continue to gain traction because they create quieter spaces, clearer focal points, and a stronger relationship between function and form.',
    intro: 'Minimalism works when restraint creates clarity rather than emptiness.',
    date: '2024-11-29',
    dateLabel: 'Nov 29, 2024',
    category: 'Interiors',
    readTime: '4 min read',
    author: {
      name: 'Sophia Turner',
      initials: 'ST',
      accentClass: 'from-[#ffcfcc] to-[#d76578] text-[#2f1016]',
    },
    crop: { x: 3791, y: 1889, width: 742, height: 742 },
    content: [
      'Minimalist spaces tend to feel calmer because they reduce competition. Fewer materials, fewer interruptions, and stronger hierarchy give each element more room to matter.',
      'That does not mean sterile rooms. Warm textures, careful lighting, and proportion are what keep minimal interiors from feeling detached.',
      'The appeal is practical as much as visual. When a space is easier to read, it is usually easier to use and easier to maintain over time.',
    ],
  },
  {
    slug: 'mastering-night-photography-capturing-light-after-dark',
    title: 'Mastering Night Photography: Capturing Light After Dark',
    excerpt:
      'Night photography rewards patience. Once light becomes scarce, exposure, stability, and intentional framing become far more visible in the final image.',
    intro:
      'Low light changes the pace of photography. You stop reacting and start composing more carefully.',
    date: '2024-11-29',
    dateLabel: 'Nov 29, 2024',
    category: 'Photography',
    readTime: '5 min read',
    author: {
      name: 'James Harper',
      initials: 'JH',
      accentClass: 'from-[#dfe2e8] to-[#738195] text-[#101418]',
    },
    crop: { x: 3791, y: 3017, width: 742, height: 742 },
    content: [
      'Shooting after dark makes small technical decisions matter more. A stable setup, slower pacing, and cleaner light sources can transform the result.',
      'Night scenes often benefit from simplification. Instead of chasing every detail, good images usually build around one dominant light relationship or one clear subject.',
      'That limitation is part of the appeal. Darkness removes noise, and what remains can feel more cinematic, more focused, and more deliberate.',
    ],
  },
]

export const trendingPostSlugs = [
  'eco-friendly-homes-the-future-of-real-estate',
  'digital-declutter-cutting-the-noise-in-a-hyperconnected-world',
  'a-foodies-guide-to-europe-best-culinary-experiences',
  'the-art-of-black-and-white-photography',
]

export const sidebarPostCrops: Record<string, BlogCrop> = {
  'eco-friendly-homes-the-future-of-real-estate': { x: 3791, y: 767, width: 742, height: 742 },
  'digital-declutter-cutting-the-noise-in-a-hyperconnected-world': { x: 3791, y: 1889, width: 742, height: 742 },
  'a-foodies-guide-to-europe-best-culinary-experiences': { x: 3791, y: 1329, width: 742, height: 742 },
  'the-art-of-black-and-white-photography': { x: 3791, y: 1889, width: 742, height: 742 },
  'the-science-of-sleep-how-rest-shapes-your-productivity': { x: 3790, y: 4885, width: 1737, height: 1154 },
}

export const featuredPost = blogPosts[4]

export function getBlogPostBySlug(slug: string) {
  return blogPosts.find((post) => post.slug === slug)
}

export function getRelatedPosts(currentSlug: string) {
  return blogPosts.filter((post) => post.slug !== currentSlug).slice(0, 3)
}

