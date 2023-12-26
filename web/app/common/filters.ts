export const types = [
  { type: 'Size', values: ['small', 'medium', 'large'] },
  { type: 'Background', values: ['black', 'white', 'pink'] },
];
export const filterInfo = [
  {
    name: 'Status',
    values: ['All', 'New', 'Listed'],
  },
  {
    name: 'Currency',
    values: ['USD', 'VIC'],
  },
];

export const filterCollections = {
  Price: [
    { key: 'default', value: 'Default' },
    { key: 'low', value: 'Price Low to High' },
    { key: 'high', value: 'Price High to Low' },
    { key: 'listed', value: 'Recently Listed' },
  ],
  Collections: [
    { key: 'cyberpunk', value: 'Cyberpunk' },
    { key: 'digitalArt', value: 'Digital Art' },
    { key: 'installationArt', value: 'Installation Art' },
  ],
};
