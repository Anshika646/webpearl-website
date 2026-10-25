import heroImage from './assets/images/luxury_crochet_hero_1782936417149.jpg';
import bearImage from './assets/images/cute_crochet_bear_1782936431306.jpg';
import bouquetImage from './assets/images/cute_crochet_bouquet_1782936490519.jpg';

export interface Product {
  id: string;
  name: string;
  price: number;
  mrp: number;
  category: string;
  image: string;
  images: string[];
  description: string;
  isNew?: boolean;
  isBestseller?: boolean;
}

export const CATEGORIES = [
  "Bouquets", "Amigurumi", "Handbags", "Home Decor", "Accessories"
];

export const PRODUCTS: Product[] = [
  {
    id: "p1",
    name: "Ethereal Rose Bouquet",
    price: 8500,
    mrp: 12000,
    category: "Bouquets",
    image: heroImage,
    images: [heroImage],
    description: "A meticulously handcrafted crochet rose bouquet, made with ultra-soft organic cotton yarn. Perfect as a timeless gift or luxury centerpiece.",
    isNew: true
  },
  {
    id: "p2",
    name: "Chunky Knit Wool Tote",
    price: 15400,
    mrp: 19000,
    category: "Handbags",
    image: "https://images.unsplash.com/photo-1628147137839-a78eb04a2c58?auto=format&fit=crop&q=80&w=800",
    images: [
      "https://images.unsplash.com/photo-1628147137839-a78eb04a2c58?auto=format&fit=crop&q=80&w=800"
    ],
    description: "Premium chunky knit tote bag with structural integrity and a minimalist silhouette. Handwoven in limited batches using sustainable merino wool.",
    isBestseller: true
  },
  {
    id: "p3",
    name: "Heirloom Amigurumi Bear",
    price: 6500,
    mrp: 8500,
    category: "Amigurumi",
    image: bearImage,
    images: [bearImage],
    description: "A luxury collectible teddy bear, intricately crocheted using silk-blend yarn. Features hand-stitched detailing and bespoke ribbon packaging.",
    isBestseller: true
  },
  {
    id: "p4",
    name: "Artisan Macrame Tapestry",
    price: 24000,
    mrp: 32000,
    category: "Home Decor",
    image: "https://images.unsplash.com/photo-1528459424707-16053c8eaeb8?auto=format&fit=crop&q=80&w=800",
    images: [
      "https://images.unsplash.com/photo-1528459424707-16053c8eaeb8?auto=format&fit=crop&q=80&w=800"
    ],
    description: "Elegant indoor macrame wall hanging, tightly crocheted with natural Egyptian cotton cord. Elevates any architectural space.",
    isNew: true
  },
  {
    id: "p5",
    name: "Vintage Crochet Headband",
    price: 2800,
    mrp: 3500,
    category: "Accessories",
    image: "https://images.unsplash.com/photo-1622359487770-bcff217e58f0?auto=format&fit=crop&q=80&w=800",
    images: [
      "https://images.unsplash.com/photo-1622359487770-bcff217e58f0?auto=format&fit=crop&q=80&w=800"
    ],
    description: "Whimsical crochet headband, structured enough to hold its shape while providing excellent breathability and delicate elegance."
  },
  {
    id: "p6",
    name: "Cashmere Textured Throw",
    price: 45000,
    mrp: 55000,
    category: "Home Decor",
    image: "https://images.unsplash.com/photo-1580136611311-64d8471e98d8?auto=format&fit=crop&q=80&w=800",
    images: [
      "https://images.unsplash.com/photo-1580136611311-64d8471e98d8?auto=format&fit=crop&q=80&w=800"
    ],
    description: "Extravagantly soft and heavy textured throw blanket. Hand-crocheted over 120 hours using ethically sourced Mongolian cashmere.",
    isBestseller: true
  },
  {
    id: "p7",
    name: "Sunflower Dream Bouquet",
    price: 9200,
    mrp: 13000,
    category: "Bouquets",
    image: bouquetImage,
    images: [bouquetImage],
    description: "A serene collection of crocheted sunflowers wrapped in premium aesthetic paper. A perfect luxury handcrafted gift.",
    isNew: true
  },
  {
    id: "p8",
    name: "Woven Silk Evening Clutch",
    price: 18500,
    mrp: 22000,
    category: "Handbags",
    image: "https://images.unsplash.com/photo-1584916201218-f4242ceb4809?auto=format&fit=crop&q=80&w=800",
    images: [
      "https://images.unsplash.com/photo-1584916201218-f4242ceb4809?auto=format&fit=crop&q=80&w=800"
    ],
    description: "A compact evening clutch meticulously crocheted with silk ribbon. Features a matte gold clasp and a satin-lined interior."
  }
];
