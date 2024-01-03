import { products } from '@wix/stores';
import { OptionType } from '@wix/stores/build/cjs/src/stores-catalog-v1-product.universal';

export const dummyproductsCategory = [
  {
    category: 'Cyberpunk',
    product: {
      media: {
        mainMedia: {
          image: {
            url: '/images/cyberpunk/girl2.webp',
            altText: 'cyberpunk',
          },
        },
      },
    },
  },
  {
    category: 'Digital Art',
    product: {
      media: {
        mainMedia: {
          image: {
            url: '/images/digitalArt/cycle.webp',
            altText: 'Digital Art',
          },
        },
      },
    },
  },
  {
    category: 'Installation Art',
    product: {
      media: {
        mainMedia: {
          image: {
            url: '/images/installationArt/home.webp',
            altText: 'Installation Art',
          },
        },
      },
    },
  },
];

export const dummyProducts: products.Product[] = [
  {
    _id: '1',
    name: 'cYbErPuNK gAL: The Soft Touch',
    stock: { inStock: true },
    manageVariants: false,
    productOptions: [
      {
        optionType: OptionType.color,
        name: '',
        choices: [],
      },
    ],
    additionalInfoSections: [{ title: 'CyberPunk #8968', description: '' }],
    media: {
      items: [
        {
          title: 'alchemyrefiner_alchemymagic',
          _id: '1',
          image: { url: '/images/cyberpunk/christmas.webp' },
        },
      ],
      mainMedia: {
        image: {
          url: '/images/cyberpunk/alchemyrefiner_alchemymagic.jpeg',
          altText: 'cyberpunk',
        },
      },
    },
    slug: 'cyberpunk-girls',
    price: {
      formatted: {
        price: '200 VIC',
      },
      currency: 'VIC',
      price: 200,
    },
  },
  {
    _id: '2',
    name: 'cYbErPuNK gAL: The Soft Touch',
    stock: { inStock: true },
    manageVariants: false,
    additionalInfoSections: [{ title: 'CyberPunk #8968', description: '' }],
    media: {
      items: [
        {
          title: 'christmas',
          _id: '2',
          image: { url: '/images/cyberpunk/christmas.web' },
        },
      ],
      mainMedia: {
        image: {
          url: '/images/cyberpunk/christmas.webp',
          altText: 'cyberpunk',
        },
      },
    },
    slug: 'cyberpunk-girls',
    price: {
      formatted: {
        price: '200 VIC',
      },
      currency: 'VIC',
      price: 200,
    },
  },
  {
    _id: '3',
    name: 'cYbErPuNK gAL: The Soft Touch',
    stock: { inStock: true },
    manageVariants: false,
    media: {
      mainMedia: {
        image: {
          url: '/images/cyberpunk/girl1.webp',
          altText: 'cyberpunk',
        },
      },
    },
    slug: 'cyberpunk-girls',
    price: {
      formatted: {
        price: '200 VIC',
      },
      currency: 'VIC',
      price: 200,
    },
  },
  {
    _id: '4',
    name: 'cYbErPuNK gAL: The Soft Touch',
    stock: { inStock: true },
    manageVariants: false,
    media: {
      mainMedia: {
        image: {
          url: '/images/digitalArt/cycle.webp',
          altText: 'cycle digital art',
        },
      },
    },
    slug: 'cyberpunk-girls',
    price: {
      formatted: {
        price: '200 VIC',
      },
      currency: 'VIC',
      price: 200,
    },
  },
  {
    _id: '5',
    name: 'cYbErPuNK gAL: The Soft Touch',
    stock: { inStock: true },
    manageVariants: false,
    media: {
      mainMedia: {
        image: {
          url: '/images/InstallationArt/home.webp',
          altText: 'cyberpunk',
        },
      },
    },
    slug: 'cyberpunk-girls',
    price: {
      formatted: {
        price: '200 VIC',
      },
      currency: 'VIC',
      price: 200,
    },
  },
  {
    _id: '6',
    name: 'cYbErPuNK gAL: The Soft Touch',
    stock: { inStock: true },
    manageVariants: false,
    media: {
      mainMedia: {
        image: {
          url: '/images/InstallationArt/person.webp',
          altText: 'cyberpunk',
        },
      },
    },
    slug: 'cyberpunk-girls',
    price: {
      formatted: {
        price: '200 VIC',
      },
      currency: 'VIC',
      price: 200,
    },
  },
];

export const dummyEvents = [
  {
    _id: '1',
    mainImage: '/images/viction.webp',
    title: 'Viction Horizon',
    description:
      'Viction Horizon is a startup hackathon designed for developers, creators, innovators, and visionaries around the globe.Our mission is to unlock human potential by transforming innovative ideas into successful startups within the Viction ecosystem. ',
    location: {
      address: 'HCMC',
    },
    slug: '/viction',
    scheduling: {
      config: { startDate: new Date(), timeZoneId: 'Asia/Ho_Chi_Minh' },
    },
  },
  {
    _id: '2',
    mainImage: '/images/cyberpunk/christmas.webp',
    title: 'Merry Christmas',
    description:
      ' creators, innovators, and visionaries around the globe.Our mission is to unlock human potential by transforming innovative ideas into successful startups within the Viction ecosystem. ',
    location: {
      address: 'HCMC',
    },
    slug: '/chrismats',
    scheduling: {
      config: { startDate: new Date(), timeZoneId: 'Asia/Ho_Chi_Minh' },
    },
  },
];

export enum CURRENTCY_TYPE {
  VIC = 'VIC',
  USD = 'USD',
}

export const AVATAR_URL = 'https://api.dicebear.com/7.x/personas/png?seed=';
