import businessman1Img from '../assets/images/businessman-1.jpg';
import businesswoman2Img from '../assets/images/businesswoman-2.jpg';
import businessman3Img from '../assets/images/businessman-3.jpg';
import mountainSummitImg from '../assets/images/mountain-summit.jpg';

export const IMAGES = {
  businessman1: businessman1Img,
  businesswoman2: businesswoman2Img,
  businessman3: businessman3Img,
  mountainSummit: mountainSummitImg,
};

export const FALLBACK_IMAGES = {
  businessman1: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&auto=format&fit=crop&q=80',
  businesswoman2: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=800&auto=format&fit=crop&q=80',
  businessman3: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=800&auto=format&fit=crop&q=80',
  mountainSummit: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=1600&auto=format&fit=crop&q=80',
};

/**
 * Resolves a public asset path from the site's root public directory.
 * @param {string} path - Relative path inside public folder
 * @returns {string} - Correctly formatted URL with base prefix
 */
export function getAssetUrl(path) {
  if (!path) return '';
  if (path.startsWith('http://') || path.startsWith('https://') || path.startsWith('data:')) {
    return path;
  }
  const baseUrl = import.meta.env.BASE_URL || '/';
  const cleanBase = baseUrl.endsWith('/') ? baseUrl : `${baseUrl}/`;
  const cleanPath = path.startsWith('/') ? path.slice(1) : path;
  return `${cleanBase}${cleanPath}`;
}
