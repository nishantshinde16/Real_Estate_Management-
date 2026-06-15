export const formatPrice = (price) =>
  new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(price || 0);

export const assetUrl = (path) => {
  if (!path) return 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80';
  if (path.startsWith('http')) return path;
  return `${import.meta.env.VITE_API_ORIGIN || 'http://localhost:5000'}${path}`;
};
