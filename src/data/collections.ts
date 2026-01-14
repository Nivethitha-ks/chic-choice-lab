import { CollectionCategory, Collection, SubCollection } from '@/types/product';

// Main collection categories for mega-menu
export const collectionCategories: CollectionCategory[] = [
  {
    id: 'topwear',
    name: 'Topwear',
    slug: 'topwear',
    collections: [
      {
        id: 'shirts',
        name: 'Shirts',
        slug: 'shirts',
        description: 'Premium shirts for every occasion',
        image: 'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=800&q=80',
        tagline: 'Elevate Your Style',
        subcollections: [
          { id: 'casual-shirts', name: 'Casual Shirts', slug: 'casual-shirts' },
          { id: 'formal-shirts', name: 'Formal Shirts', slug: 'formal-shirts' },
          { id: 'printed-shirts', name: 'Printed Shirts', slug: 'printed-shirts' },
          { id: 'denim-shirts', name: 'Denim Shirts', slug: 'denim-shirts' },
          { id: 'oversized-shirts', name: 'Oversized Shirts', slug: 'oversized-shirts' },
          { id: 'linen-shirts', name: 'Linen Shirts', slug: 'linen-shirts' },
          { id: 'flannel-shirts', name: 'Flannel Shirts', slug: 'flannel-shirts' },
        ],
      },
      {
        id: 't-shirts',
        name: 'T-Shirts',
        slug: 't-shirts',
        description: 'Casual comfort meets style',
        image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800&q=80',
        tagline: 'Everyday Essentials',
        subcollections: [
          { id: 'plain-tshirts', name: 'Plain T-Shirts', slug: 'plain-tshirts' },
          { id: 'graphic-tshirts', name: 'Graphic T-Shirts', slug: 'graphic-tshirts' },
          { id: 'polo-tshirts', name: 'Polo T-Shirts', slug: 'polo-tshirts' },
          { id: 'oversized-tshirts', name: 'Oversized T-Shirts', slug: 'oversized-tshirts' },
          { id: 'longline-tshirts', name: 'Longline T-Shirts', slug: 'longline-tshirts' },
        ],
      },
      {
        id: 'hoodies',
        name: 'Hoodies',
        slug: 'hoodies',
        description: 'Cozy comfort for cold days',
        image: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=800&q=80',
        tagline: 'Stay Warm, Stay Cool',
      },
      {
        id: 'sweatshirts',
        name: 'Sweatshirts',
        slug: 'sweatshirts',
        description: 'Casual layering essentials',
        image: 'https://images.unsplash.com/photo-1578768079052-aa76e52ff62e?w=800&q=80',
        tagline: 'Layer Up',
      },
      {
        id: 'jackets',
        name: 'Jackets',
        slug: 'jackets',
        description: 'Outerwear for every season',
        image: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=800&q=80',
        tagline: 'Weather-Ready Style',
        subcollections: [
          { id: 'bomber-jackets', name: 'Bomber Jackets', slug: 'bomber-jackets' },
          { id: 'denim-jackets', name: 'Denim Jackets', slug: 'denim-jackets' },
          { id: 'leather-jackets', name: 'Leather Jackets', slug: 'leather-jackets' },
        ],
      },
      {
        id: 'blazers',
        name: 'Blazers',
        slug: 'blazers',
        description: 'Sharp and sophisticated',
        image: 'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=800&q=80',
        tagline: 'Command Attention',
      },
      {
        id: 'co-ord-sets',
        name: 'Co-ord Sets',
        slug: 'co-ord-sets',
        description: 'Matching sets for effortless style',
        image: 'https://images.unsplash.com/photo-1617137968427-85924c800a22?w=800&q=80',
        tagline: 'Perfectly Paired',
      },
    ],
  },
  {
    id: 'bottomwear',
    name: 'Bottomwear',
    slug: 'bottomwear',
    collections: [
      {
        id: 'jeans',
        name: 'Jeans',
        slug: 'jeans',
        description: 'Denim for every fit',
        image: 'https://images.unsplash.com/photo-1542272454315-4c01d7abdf4a?w=800&q=80',
        tagline: 'Denim Perfection',
        subcollections: [
          { id: 'skinny-jeans', name: 'Skinny', slug: 'skinny-jeans' },
          { id: 'slim-fit-jeans', name: 'Slim Fit', slug: 'slim-fit-jeans' },
          { id: 'regular-jeans', name: 'Regular', slug: 'regular-jeans' },
          { id: 'baggy-jeans', name: 'Baggy', slug: 'baggy-jeans' },
        ],
      },
      {
        id: 'trousers',
        name: 'Trousers',
        slug: 'trousers',
        description: 'Refined and versatile',
        image: 'https://images.unsplash.com/photo-1473966968600-fa801b869a1a?w=800&q=80',
        tagline: 'Tailored Excellence',
        subcollections: [
          { id: 'formal-trousers', name: 'Formal Trousers', slug: 'formal-trousers' },
          { id: 'casual-trousers', name: 'Casual Trousers', slug: 'casual-trousers' },
          { id: 'chinos', name: 'Chinos', slug: 'chinos' },
          { id: 'cargo-pants', name: 'Cargo Pants', slug: 'cargo-pants' },
        ],
      },
      {
        id: 'joggers',
        name: 'Joggers',
        slug: 'joggers',
        description: 'Athletic meets casual',
        image: 'https://images.unsplash.com/photo-1552902865-b72c031ac5ea?w=800&q=80',
        tagline: 'Move Freely',
      },
      {
        id: 'shorts',
        name: 'Shorts',
        slug: 'shorts',
        description: 'Summer essentials',
        image: 'https://images.unsplash.com/photo-1591195853828-11db59a44f6b?w=800&q=80',
        tagline: 'Beat The Heat',
      },
      {
        id: 'track-pants',
        name: 'Track Pants',
        slug: 'track-pants',
        description: 'Sporty and comfortable',
        image: 'https://images.unsplash.com/photo-1506629082955-511b1aa562c8?w=800&q=80',
        tagline: 'Active Lifestyle',
      },
    ],
  },
  {
    id: 'formal-office',
    name: 'Formal & Office',
    slug: 'formal-office',
    collections: [
      {
        id: 'formal-shirts',
        name: 'Formal Shirts',
        slug: 'formal-shirts',
        description: 'Business ready',
        image: 'https://images.unsplash.com/photo-1620012253295-c15cc3e65df4?w=800&q=80',
        tagline: 'Professional Excellence',
      },
      {
        id: 'formal-pants',
        name: 'Formal Pants',
        slug: 'formal-pants',
        description: 'Sharp and tailored',
        image: 'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=800&q=80',
        tagline: 'Boardroom Ready',
      },
      {
        id: 'blazers-coats',
        name: 'Blazers & Coats',
        slug: 'blazers-coats',
        description: 'Power dressing essentials',
        image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&q=80',
        tagline: 'Make An Impression',
      },
      {
        id: 'waistcoats',
        name: 'Waistcoats',
        slug: 'waistcoats',
        description: 'Classic sophistication',
        image: 'https://images.unsplash.com/photo-1593030761757-71fae45fa0e7?w=800&q=80',
        tagline: 'Refined Details',
      },
      {
        id: 'business-suits',
        name: 'Business Suits',
        slug: 'business-suits',
        description: 'Complete suit sets',
        image: 'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=800&q=80',
        tagline: 'Power Suits',
      },
      {
        id: 'office-footwear',
        name: 'Office Footwear',
        slug: 'office-footwear',
        description: 'Professional shoes',
        image: 'https://images.unsplash.com/photo-1449505278894-297fdb3edbc1?w=800&q=80',
        tagline: 'Step Up',
      },
      {
        id: 'office-accessories',
        name: 'Office Accessories',
        slug: 'office-accessories',
        description: 'Finishing touches',
        image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800&q=80',
        tagline: 'Complete The Look',
      },
    ],
  },
  {
    id: 'traditional-ethnic',
    name: 'Traditional & Ethnic',
    slug: 'traditional-ethnic',
    collections: [
      {
        id: 'kurta-sets',
        name: 'Kurta Sets',
        slug: 'kurta-sets',
        description: 'Heritage meets comfort',
        image: 'https://images.unsplash.com/photo-1583391733956-6c78276477e2?w=800&q=80',
        tagline: 'Timeless Tradition',
      },
      {
        id: 'short-kurtas',
        name: 'Short Kurtas',
        slug: 'short-kurtas',
        description: 'Modern ethnic wear',
        image: 'https://images.unsplash.com/photo-1583391733956-6c78276477e2?w=800&q=80',
        tagline: 'Contemporary Classic',
      },
      {
        id: 'long-kurtas',
        name: 'Long Kurtas',
        slug: 'long-kurtas',
        description: 'Traditional elegance',
        image: 'https://images.unsplash.com/photo-1583391733956-6c78276477e2?w=800&q=80',
        tagline: 'Regal Style',
      },
      {
        id: 'sherwanis',
        name: 'Sherwanis',
        slug: 'sherwanis',
        description: 'Grand occasion wear',
        image: 'https://images.unsplash.com/photo-1583391733956-6c78276477e2?w=800&q=80',
        tagline: 'Royal Elegance',
      },
      {
        id: 'nehru-jackets',
        name: 'Nehru Jackets',
        slug: 'nehru-jackets',
        description: 'Classic Indian style',
        image: 'https://images.unsplash.com/photo-1583391733956-6c78276477e2?w=800&q=80',
        tagline: 'Iconic Style',
      },
      {
        id: 'dhoti-sets',
        name: 'Dhoti Sets',
        slug: 'dhoti-sets',
        description: 'Traditional essentials',
        image: 'https://images.unsplash.com/photo-1583391733956-6c78276477e2?w=800&q=80',
        tagline: 'Cultural Heritage',
      },
      {
        id: 'festive-wear',
        name: 'Festive Wear',
        slug: 'festive-wear',
        description: 'Celebration ready',
        image: 'https://images.unsplash.com/photo-1583391733956-6c78276477e2?w=800&q=80',
        tagline: 'Celebrate In Style',
      },
      {
        id: 'wedding-wear',
        name: 'Wedding Wear',
        slug: 'wedding-wear',
        description: 'Special occasion elegance',
        image: 'https://images.unsplash.com/photo-1583391733956-6c78276477e2?w=800&q=80',
        tagline: 'For The Big Day',
      },
    ],
  },
  {
    id: 'streetwear-youth',
    name: 'Streetwear & Youth',
    slug: 'streetwear-youth',
    collections: [
      {
        id: 'oversized-tees',
        name: 'Oversized Tees',
        slug: 'oversized-tees',
        description: 'Bold and relaxed',
        image: 'https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=800&q=80',
        tagline: 'Oversized Vibes',
      },
      {
        id: 'graphic-hoodies',
        name: 'Graphic Hoodies',
        slug: 'graphic-hoodies',
        description: 'Statement pieces',
        image: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=800&q=80',
        tagline: 'Express Yourself',
      },
      {
        id: 'baggy-pants',
        name: 'Baggy Pants',
        slug: 'baggy-pants',
        description: 'Street-ready style',
        image: 'https://images.unsplash.com/photo-1552374196-1ab2a1c593e8?w=800&q=80',
        tagline: 'Urban Edge',
      },
      {
        id: 'ripped-jeans',
        name: 'Ripped Jeans',
        slug: 'ripped-jeans',
        description: 'Distressed denim',
        image: 'https://images.unsplash.com/photo-1542272454315-4c01d7abdf4a?w=800&q=80',
        tagline: 'Raw & Rugged',
      },
      {
        id: 'layered-fits',
        name: 'Layered Fits',
        slug: 'layered-fits',
        description: 'Styling sets',
        image: 'https://images.unsplash.com/photo-1552374196-1ab2a1c593e8?w=800&q=80',
        tagline: 'Layer Game Strong',
      },
      {
        id: 'urban-coords',
        name: 'Urban Co-ords',
        slug: 'urban-coords',
        description: 'Street matching sets',
        image: 'https://images.unsplash.com/photo-1617137968427-85924c800a22?w=800&q=80',
        tagline: 'Coordinated Cool',
      },
      {
        id: 'college-wear',
        name: 'College Wear',
        slug: 'college-wear',
        description: 'Campus ready',
        image: 'https://images.unsplash.com/photo-1552374196-1ab2a1c593e8?w=800&q=80',
        tagline: 'Campus Style',
      },
      {
        id: 'genz-drop',
        name: 'Gen-Z Drop Collection',
        slug: 'genz-drop',
        description: 'Latest trends',
        image: 'https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=800&q=80',
        tagline: 'Fresh Drops Only',
      },
    ],
  },
  {
    id: 'seasonal',
    name: 'Seasonal',
    slug: 'seasonal',
    collections: [
      {
        id: 'summer-collection',
        name: 'Summer Collection',
        slug: 'summer-collection',
        description: 'Beat the heat',
        image: 'https://images.unsplash.com/photo-1523381210434-271e8be1f52b?w=800&q=80',
        tagline: 'Hot Weather Essentials',
        subcollections: [
          { id: 'cotton-wear', name: 'Cotton Wear', slug: 'cotton-wear' },
          { id: 'linen-wear', name: 'Linen Wear', slug: 'linen-wear' },
        ],
      },
      {
        id: 'winter-collection',
        name: 'Winter Collection',
        slug: 'winter-collection',
        description: 'Stay warm in style',
        image: 'https://images.unsplash.com/photo-1544923246-77307dd628b1?w=800&q=80',
        tagline: 'Warm & Stylish',
        subcollections: [
          { id: 'winter-hoodies', name: 'Hoodies', slug: 'winter-hoodies' },
          { id: 'winter-jackets', name: 'Jackets', slug: 'winter-jackets' },
          { id: 'thermals', name: 'Thermals', slug: 'thermals' },
        ],
      },
      {
        id: 'monsoon-collection',
        name: 'Monsoon Collection',
        slug: 'monsoon-collection',
        description: 'Rain-ready fashion',
        image: 'https://images.unsplash.com/photo-1523381210434-271e8be1f52b?w=800&q=80',
        tagline: 'Rainy Day Ready',
      },
      {
        id: 'festive-collection',
        name: 'Festive Collection',
        slug: 'festive-collection',
        description: 'Celebrate in style',
        image: 'https://images.unsplash.com/photo-1583391733956-6c78276477e2?w=800&q=80',
        tagline: 'Festival Fashion',
      },
      {
        id: 'new-year-collection',
        name: 'New Year Collection',
        slug: 'new-year-collection',
        description: 'Start fresh',
        image: 'https://images.unsplash.com/photo-1617127365659-c47fa864d8bc?w=800&q=80',
        tagline: 'New Year, New Style',
      },
    ],
  },
  {
    id: 'footwear',
    name: 'Footwear',
    slug: 'footwear',
    collections: [
      {
        id: 'sneakers',
        name: 'Sneakers',
        slug: 'sneakers',
        description: 'Street-ready kicks',
        image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&q=80',
        tagline: 'Step Fresh',
      },
      {
        id: 'running-shoes',
        name: 'Running Shoes',
        slug: 'running-shoes',
        description: 'Performance footwear',
        image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&q=80',
        tagline: 'Run Further',
      },
      {
        id: 'casual-shoes',
        name: 'Casual Shoes',
        slug: 'casual-shoes',
        description: 'Everyday comfort',
        image: 'https://images.unsplash.com/photo-1449505278894-297fdb3edbc1?w=800&q=80',
        tagline: 'Daily Comfort',
      },
      {
        id: 'formal-shoes',
        name: 'Formal Shoes',
        slug: 'formal-shoes',
        description: 'Business elegance',
        image: 'https://images.unsplash.com/photo-1449505278894-297fdb3edbc1?w=800&q=80',
        tagline: 'Polished Perfection',
      },
      {
        id: 'loafers',
        name: 'Loafers',
        slug: 'loafers',
        description: 'Slip-on sophistication',
        image: 'https://images.unsplash.com/photo-1449505278894-297fdb3edbc1?w=800&q=80',
        tagline: 'Easy Elegance',
      },
      {
        id: 'sandals',
        name: 'Sandals',
        slug: 'sandals',
        description: 'Summer essentials',
        image: 'https://images.unsplash.com/photo-1603487742131-4160ec999306?w=800&q=80',
        tagline: 'Summer Steps',
      },
      {
        id: 'slippers',
        name: 'Slippers',
        slug: 'slippers',
        description: 'Home comfort',
        image: 'https://images.unsplash.com/photo-1603487742131-4160ec999306?w=800&q=80',
        tagline: 'Relaxed Vibes',
      },
      {
        id: 'boots',
        name: 'Boots',
        slug: 'boots',
        description: 'Rugged style',
        image: 'https://images.unsplash.com/photo-1542840410-7e9b6e3fb7b8?w=800&q=80',
        tagline: 'Built To Last',
      },
    ],
  },
  {
    id: 'accessories',
    name: 'Accessories',
    slug: 'accessories',
    collections: [
      {
        id: 'watches',
        name: 'Watches',
        slug: 'watches',
        description: 'Timeless pieces',
        image: 'https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=800&q=80',
        tagline: 'Time In Style',
      },
      {
        id: 'sunglasses',
        name: 'Sunglasses',
        slug: 'sunglasses',
        description: 'Shade in style',
        image: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=800&q=80',
        tagline: 'Cool Shades',
      },
      {
        id: 'wallets',
        name: 'Wallets',
        slug: 'wallets',
        description: 'Premium leather goods',
        image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800&q=80',
        tagline: 'Carry In Style',
      },
      {
        id: 'belts',
        name: 'Belts',
        slug: 'belts',
        description: 'Essential finishing touch',
        image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800&q=80',
        tagline: 'Belt Up',
      },
      {
        id: 'caps-hats',
        name: 'Caps & Hats',
        slug: 'caps-hats',
        description: 'Top it off',
        image: 'https://images.unsplash.com/photo-1576871337622-98d48d1cf531?w=800&q=80',
        tagline: 'Head Turners',
      },
      {
        id: 'bracelets',
        name: 'Bracelets',
        slug: 'bracelets',
        description: 'Wrist accessories',
        image: 'https://images.unsplash.com/photo-1611652022419-a9419f74343d?w=800&q=80',
        tagline: 'Wrist Game',
      },
      {
        id: 'rings',
        name: 'Rings',
        slug: 'rings',
        description: 'Statement jewelry',
        image: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=800&q=80',
        tagline: 'Ring It In',
      },
      {
        id: 'socks',
        name: 'Socks',
        slug: 'socks',
        description: 'Fun underfoot',
        image: 'https://images.unsplash.com/photo-1586350977771-b3b0abd50c82?w=800&q=80',
        tagline: 'Step Up Your Sock Game',
      },
      {
        id: 'bags-backpacks',
        name: 'Bags & Backpacks',
        slug: 'bags-backpacks',
        description: 'Carry with style',
        image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800&q=80',
        tagline: 'Pack Smart',
      },
    ],
  },
  {
    id: 'grooming-lifestyle',
    name: 'Grooming & Lifestyle',
    slug: 'grooming-lifestyle',
    collections: [
      {
        id: 'perfumes',
        name: 'Perfumes',
        slug: 'perfumes',
        description: 'Signature scents',
        image: 'https://images.unsplash.com/photo-1541643600914-78b084683601?w=800&q=80',
        tagline: 'Smell Irresistible',
      },
      {
        id: 'deodorants',
        name: 'Deodorants',
        slug: 'deodorants',
        description: 'Stay fresh',
        image: 'https://images.unsplash.com/photo-1541643600914-78b084683601?w=800&q=80',
        tagline: 'All Day Fresh',
      },
      {
        id: 'beard-care',
        name: 'Beard Care',
        slug: 'beard-care',
        description: 'Grooming essentials',
        image: 'https://images.unsplash.com/photo-1541643600914-78b084683601?w=800&q=80',
        tagline: 'Beard Goals',
      },
      {
        id: 'skincare',
        name: 'Skincare',
        slug: 'skincare',
        description: 'Men\'s skincare essentials',
        image: 'https://images.unsplash.com/photo-1541643600914-78b084683601?w=800&q=80',
        tagline: 'Glow Up',
      },
      {
        id: 'hair-styling',
        name: 'Hair Styling',
        slug: 'hair-styling',
        description: 'Style your look',
        image: 'https://images.unsplash.com/photo-1541643600914-78b084683601?w=800&q=80',
        tagline: 'Hair Game Strong',
      },
      {
        id: 'gift-sets',
        name: 'Gift Sets',
        slug: 'gift-sets',
        description: 'Perfect for gifting',
        image: 'https://images.unsplash.com/photo-1541643600914-78b084683601?w=800&q=80',
        tagline: 'Give The Best',
      },
    ],
  },
];

// Special curated collections
export const curatedCollections: Collection[] = [
  {
    id: 'best-sellers',
    name: 'Best Sellers',
    slug: 'best-sellers',
    description: 'Our most loved pieces',
    image: 'https://images.unsplash.com/photo-1617137968427-85924c800a22?w=800&q=80',
    tagline: 'Fan Favorites',
    banner: 'https://images.unsplash.com/photo-1617137968427-85924c800a22?w=1920&q=80',
  },
  {
    id: 'new-arrivals',
    name: 'New Arrivals',
    slug: 'new-arrivals',
    description: 'Fresh drops weekly',
    image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800&q=80',
    tagline: 'Just Landed',
    banner: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=1920&q=80',
  },
  {
    id: 'trending-now',
    name: 'Trending Now',
    slug: 'trending-now',
    description: 'What\'s hot right now',
    image: 'https://images.unsplash.com/photo-1552374196-1ab2a1c593e8?w=800&q=80',
    tagline: 'Viral Vibes',
    banner: 'https://images.unsplash.com/photo-1552374196-1ab2a1c593e8?w=1920&q=80',
  },
  {
    id: 'under-999',
    name: 'Under ₹999',
    slug: 'under-999',
    description: 'Style on a budget',
    image: 'https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=800&q=80',
    tagline: 'Budget Finds',
    banner: 'https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=1920&q=80',
  },
  {
    id: 'luxury-collection',
    name: 'Luxury Collection',
    slug: 'luxury-collection',
    description: 'Premium pieces',
    image: 'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=800&q=80',
    tagline: 'Elevated Essentials',
    banner: 'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=1920&q=80',
  },
  {
    id: 'limited-edition',
    name: 'Limited Edition',
    slug: 'limited-edition',
    description: 'Exclusive drops',
    image: 'https://images.unsplash.com/photo-1617127365659-c47fa864d8bc?w=800&q=80',
    tagline: 'Rare Finds',
    banner: 'https://images.unsplash.com/photo-1617127365659-c47fa864d8bc?w=1920&q=80',
  },
  {
    id: 'influencer-picks',
    name: 'Influencer Picks',
    slug: 'influencer-picks',
    description: 'Celeb-approved styles',
    image: 'https://images.unsplash.com/photo-1552374196-1ab2a1c593e8?w=800&q=80',
    tagline: 'As Seen On',
    banner: 'https://images.unsplash.com/photo-1552374196-1ab2a1c593e8?w=1920&q=80',
  },
  {
    id: 'editors-choice',
    name: "Editor's Choice",
    slug: 'editors-choice',
    description: 'Handpicked selections',
    image: 'https://images.unsplash.com/photo-1617137968427-85924c800a22?w=800&q=80',
    tagline: 'Curated For You',
    banner: 'https://images.unsplash.com/photo-1617137968427-85924c800a22?w=1920&q=80',
  },
  {
    id: 'combo-offers',
    name: 'Combo Offers',
    slug: 'combo-offers',
    description: 'Bundle & save',
    image: 'https://images.unsplash.com/photo-1617137968427-85924c800a22?w=800&q=80',
    tagline: 'More For Less',
    banner: 'https://images.unsplash.com/photo-1617137968427-85924c800a22?w=1920&q=80',
  },
  {
    id: 'clearance-sale',
    name: 'Clearance Sale',
    slug: 'clearance-sale',
    description: 'Massive discounts',
    image: 'https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=800&q=80',
    tagline: 'Up To 70% Off',
    banner: 'https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=1920&q=80',
  },
];

// Helper function to get all collections flattened
export const getAllCollections = (): Collection[] => {
  const allCollections: Collection[] = [];
  
  collectionCategories.forEach(category => {
    category.collections.forEach(collection => {
      allCollections.push(collection);
    });
  });
  
  return [...allCollections, ...curatedCollections];
};

// Helper function to find collection by slug
export const findCollectionBySlug = (slug: string): Collection | undefined => {
  for (const category of collectionCategories) {
    const found = category.collections.find(c => c.slug === slug);
    if (found) return found;
    
    // Check subcollections
    for (const collection of category.collections) {
      if (collection.subcollections) {
        const subFound = collection.subcollections.find(s => s.slug === slug);
        if (subFound) {
          return {
            ...collection,
            id: subFound.id,
            name: subFound.name,
            slug: subFound.slug,
          };
        }
      }
    }
  }
  
  return curatedCollections.find(c => c.slug === slug);
};

// Helper function to get parent collection
export const getParentCollection = (slug: string): { category: CollectionCategory; collection: Collection } | undefined => {
  for (const category of collectionCategories) {
    for (const collection of category.collections) {
      if (collection.slug === slug) {
        return { category, collection };
      }
      if (collection.subcollections) {
        const subFound = collection.subcollections.find(s => s.slug === slug);
        if (subFound) {
          return { category, collection };
        }
      }
    }
  }
  return undefined;
};

// Helper function to get breadcrumb path
export const getBreadcrumbPath = (slug: string): { label: string; href?: string }[] => {
  const path = [{ label: 'Home', href: '/' }, { label: 'Collections', href: '/collections' }];
  
  const parent = getParentCollection(slug);
  if (parent) {
    path.push({ label: parent.category.name, href: `/collections/${parent.category.slug}` });
    if (parent.collection.slug !== slug) {
      path.push({ label: parent.collection.name, href: `/collections/${parent.collection.slug}` });
    }
  }
  
  const current = findCollectionBySlug(slug);
  if (current) {
    path.push({ label: current.name, href: undefined });
  }
  
  return path;
};
