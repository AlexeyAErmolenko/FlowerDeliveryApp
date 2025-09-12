import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Shop from './models/Shop.js';
import Product from './models/Product.js';
dotenv.config();

async function seed() {
  await mongoose.connect(process.env.MONGODB_URI);

  await Shop.deleteMany({});
  await Product.deleteMany({});

  const s1 = await Shop.create({
    name: 'Teleflora',
    website: 'https://www.teleflora.com/',
    address: '11444 W Olympic Blvd, Los Angeles, CA 90064, USA',
    location: { lat: 50.45, lng: 30.52 },
  });
  const s2 = await Shop.create({
    name: 'Interflora',
    website: 'https://www.interflora.co.uk/',
    address: 'Watergate, 26, London Rd, Spalding PE11 3TL, UK',
    location: { lat: 20.46, lng: 20.53 },
  });
  const s3 = await Shop.create({
    name: 'Flower_Chimp',
    website: 'https://www.flowerchimp.com',
    address:
      '3, Jalan 51a/227, Seksyen 51a, 46100 Petaling Jaya, Selangor, Malaysia',
    location: { lat: 80.46, lng: 70.53 },
  });

  const products = [
    {
      name: 'Red Rose',
      description: 'A classic dozen roses',
      price: 25,
      photoURL:
        'https://res.cloudinary.com/dserfv7z4/image/upload/v1757441835/Red_Roses_z9horj.jpg',
      isFavorite: true,
      shopId: '68c3c445224f06760cb6c0e8',
    },
    {
      name: 'Lilies and Roses Bouquet',
      description: 'A mix of lilies and roses',
      price: 60,
      photoURL:
        'https://res.cloudinary.com/dserfv7z4/image/upload/v1757441841/Lilies_and_Roses_Bouquet_gbwn0z.jpg',
      isFavorite: false,
      shopId: '68c3c445224f06760cb6c0e8',
    },
    {
      name: 'Springtimes Here Bouquett',
      description: 'Various seasonal flowers in a bright arrangement',
      price: 80,
      photoURL:
        'https://res.cloudinary.com/dserfv7z4/image/upload/v1757441833/Springtime_s_Here_Bouquet_gcf6i9.jpg',
      isFavorite: true,
      shopId: '68c3c445224f06760cb6c0e8',
    },
    {
      name: 'Zen Artistry',
      description: 'Potted orchids',
      price: 90,
      photoURL:
        'https://res.cloudinary.com/dserfv7z4/image/upload/v1757441829/ZenArtistryPM_isaz8y.jpg',
      isFavorite: false,
      shopId: '68c3c445224f06760cb6c0e8',
    },
    {
      name: 'Summer Daydream Bouquet',
      description: 'A vibrant bouquet of gerberas',
      price: 50,
      photoURL:
        'https://res.cloudinary.com/dserfv7z4/image/upload/v1757441830/Summer_Daydream_Bouquet_ushwof.jpg',
      isFavorite: true,
      shopId: '68c3c445224f06760cb6c0e8',
    },
    {
      name: 'Fresh Picked',
      description: 'Arrangements made with flowers that are in season',
      price: 55,
      photoURL:
        'https://res.cloudinary.com/dserfv7z4/image/upload/v1757441841/FreshPicked_okvzb0.jpg',
      isFavorite: false,
      shopId: '68c3d436aaef257d87b6997e',
    },
    {
      name: 'Radiant Sunflower Mix Bouquet',
      description: 'High-end arrangements with premium flowers and designs',
      price: 80,
      photoURL:
        'https://res.cloudinary.com/dserfv7z4/image/upload/v1757441843/Radiant-Sunflower-Mix-Bouquet_nfsozj.jpg',
      isFavorite: true,
      shopId: '68c3d436aaef257d87b6997e',
    },
    {
      name: 'Pastel Lily Free Bouquet',
      description:
        'A classic choice, often available in various colors and quantities',
      price: 45,
      photoURL:
        'https://res.cloudinary.com/dserfv7z4/image/upload/v1757441836/Pastel-Lily-Free-Bouquet_ovljne.jpg',
      isFavorite: false,
      shopId: '68c3d436aaef257d87b6997e',
    },
    {
      name: 'Love & Sympathy Bouquet',
      description:
        'Arrangements specifically designed for funerals or to offer condolences',
      price: 50,
      photoURL:
        'https://res.cloudinary.com/dserfv7z4/image/upload/v1757441836/Love-_-Sympathy-Bouquet_paojqd.jpg',
      isFavorite: true,
      shopId: '68c3d436aaef257d87b6997e',
    },
    {
      name: 'Pink Gerbera in a Recycled Pot',
      description: 'Known for their vibrant, cheerful appearance',
      price: 35,
      photoURL:
        'https://res.cloudinary.com/dserfv7z4/image/upload/v1757441845/Pink-Gerbera-in-a-Recycled-Pot_oe8vqi.jpg',
      isFavorite: false,
      shopId: '68c3d436aaef257d87b6997e',
    },
    {
      name: 'Roses in a Box',
      description:
        'Modern and stylish arrangements where roses are presented in a box',
      price: 40,
      photoURL:
        'https://res.cloudinary.com/dserfv7z4/image/upload/v1757441820/Roses_in_a_Box.webp_veqzdq.png',
      isFavorite: true,
      shopId: '68c3d436aaef257d87b69980',
    },
    {
      name: 'Graduation Bouquets',
      description: 'Flowers specifically arranged for graduation ceremonies',
      price: 30,
      photoURL:
        'https://res.cloudinary.com/dserfv7z4/image/upload/v1757441820/Graduation_Bouquets.webp_f7zeul.png',
      isFavorite: false,
      shopId: '68c3d436aaef257d87b69980',
    },
    {
      name: "Baby's Breath",
      description:
        'Often used as a filler flower but also popular on its own in minimalist arrangements',
      price: 25,
      photoURL:
        'https://res.cloudinary.com/dserfv7z4/image/upload/v1757441821/Baby_s_Breath.webp_i17ywk.png',
      isFavorite: true,
      shopId: '68c3d436aaef257d87b69980',
    },
    {
      name: 'Sunflowers',
      description: 'A popular choice for their bright and happy aesthetic',
      price: 35,
      photoURL:
        'https://res.cloudinary.com/dserfv7z4/image/upload/v1757441820/Sunflowers.webp_eyobkm.png',
      isFavorite: false,
      shopId: '68c3d436aaef257d87b69980',
    },
    {
      name: 'Mixed Flower Bouquets',
      description: 'Various combinations of flowers for different occasions',
      price: 45,
      photoURL:
        'https://res.cloudinary.com/dserfv7z4/image/upload/v1757441820/Mixed_Flower_Bouquets.webp_ofg2dn.png',
      isFavorite: true,
      shopId: '68c3d436aaef257d87b69980',
    },
  ];
  await Product.insertMany(products);

  console.log('Seeded');
  process.exit(0);
}
seed();
