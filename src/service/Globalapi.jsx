import axios from "axios";

const BASE_URL = "https://places.googleapis.com/v1/places:searchText";

export const hasPlacesKey = !!import.meta.env.VITE_GOOGLE_PLACE_API_KEY;
const DISABLE_FLAG = 'places_api_disabled';

export const canUsePlaces = () => {
  if (!hasPlacesKey) return false;
  const disabled = typeof window !== 'undefined' && localStorage.getItem(DISABLE_FLAG) === '1';
  const envDisabled = import.meta.env.VITE_DISABLE_PLACES === '1';
  return !(disabled || envDisabled);
};

export const markPlacesUnavailable = () => {
  try { if (typeof window !== 'undefined') localStorage.setItem(DISABLE_FLAG, '1'); } catch {}
};

const config = {
  headers: {
    "Content-Type": "application/json",
    "X-Goog-Api-Key": import.meta.env.VITE_GOOGLE_PLACE_API_KEY,
    "X-Goog-FieldMask": "places.displayName,places.photos,places.id",
  },
};

export const GetPlaceDetails = (data) => {
  return axios.post(BASE_URL, data, config);
};

// Build a public photo URL for Places API v1 media endpoint
// name is like: "places/XXXXXX/photos/YYYYYY"
export const buildPlacePhotoURL = (name, opts = {}) => {
  if (!name) return "";
  const params = new URLSearchParams();
  if (opts.maxHeightPx) params.set("maxHeightPx", String(opts.maxHeightPx));
  if (opts.maxWidthPx) params.set("maxWidthPx", String(opts.maxWidthPx));
  // default sizing to keep images reasonable
  if (!opts.maxHeightPx && !opts.maxWidthPx) params.set("maxHeightPx", "400");
  params.set("key", import.meta.env.VITE_GOOGLE_PLACE_API_KEY || "");
  return `https://places.googleapis.com/v1/${name}/media?${params.toString()}`;
};

// Keyless fallback using Unsplash's source endpoint (no API key required)
// size: {width,height}
export const buildFallbackPhotoURL = (query, size = { width: 800, height: 600 }) => {
  const w = size?.width || 800;
  const h = size?.height || 600;
  const q = encodeURIComponent(query || "travel");
  return `https://source.unsplash.com/${w}x${h}/?${q}`;
};

// Secondary fallback with deterministic seeding (no key, very reliable)
export const buildSeededPhotoURL = (query, size = { width: 800, height: 600 }) => {
  const w = size?.width || 800;
  const h = size?.height || 600;
  const q = encodeURIComponent(query || "travel");
  return `https://picsum.photos/seed/${q}/${w}/${h}`;
};

// Wikipedia image helpers (no API key required)
const WIKI_API = 'https://en.wikipedia.org/w/api.php?origin=*';

const fetchWikiPageImageByIds = async (pageids, thumbSizePx) => {
  const ids = Array.isArray(pageids) ? pageids.join('|') : String(pageids);
  const url = `${WIKI_API}&action=query&prop=pageimages&format=json&piprop=thumbnail&pithumbsize=${thumbSizePx||800}&pageids=${ids}`;
  const resp = await fetch(url);
  const data = await resp.json();
  const pages = data?.query?.pages || {};
  for (const k of Object.keys(pages)) {
    const src = pages[k]?.thumbnail?.source;
    if (src) return src;
  }
  return '';
};

const fetchWikiImage = async (query, thumbSizePx) => {
  try {
    if (!query) return '';
    // First: try direct title lookup via pageimages (fast path)
    const directUrl = `${WIKI_API}&action=query&prop=pageimages&format=json&piprop=thumbnail&pithumbsize=${thumbSizePx||800}&titles=${encodeURIComponent(query)}`;
    const directResp = await fetch(directUrl);
    const directData = await directResp.json();
    const pages = directData?.query?.pages || {};
    for (const k of Object.keys(pages)) {
      const src = pages[k]?.thumbnail?.source;
      if (src) return src;
    }
    // Fallback: search then fetch by pageid
    const searchUrl = `${WIKI_API}&action=query&list=search&format=json&srsearch=${encodeURIComponent(query)}`;
    const sResp = await fetch(searchUrl);
    const sData = await sResp.json();
    const pageId = sData?.query?.search?.[0]?.pageid;
    if (pageId) {
      return await fetchWikiPageImageByIds(pageId, thumbSizePx);
    }
  } catch {}
  return '';
};

// Unified relevant image resolver: Places (if available) -> Wikipedia -> Unsplash -> Picsum
export const getRelevantImageUrl = async (query, size = { width: 800, height: 600 }) => {
  const { width, height } = size || {};
  const px = Math.max(width || 800, height || 600);
  // 1) Google Places if usable
  if (canUsePlaces()) {
    try {
      const resp = await GetPlaceDetails({ textQuery: query });
      const name = resp?.data?.places?.[0]?.photos?.[0]?.name;
      if (name) return buildPlacePhotoURL(name, { maxHeightPx: px });
    } catch (e) {
      if (e?.response?.status === 403) markPlacesUnavailable();
    }
  }
  // 2) Wikipedia
  const wiki = await fetchWikiImage(query, px);
  if (wiki) return wiki;
  // 3) Unsplash Source
  const unsplash = buildFallbackPhotoURL(query, { width: width||800, height: height||600 });
  if (unsplash) return unsplash;
  // 4) Picsum
  return buildSeededPhotoURL(query, { width: width||800, height: height||600 });
};

// Random hotel front/exterior image (no key). Primary: Unsplash Source with signature; Fallback: LoremFlickr
export const buildHotelFrontPhotoURL = (seed, size = { width: 400, height: 300 }) => {
  const w = size?.width || 400;
  const h = size?.height || 300;
  const sig = encodeURIComponent(String(seed ?? Math.random()));
  return `https://source.unsplash.com/${w}x${h}/?hotel,exterior,facade&sig=${sig}`;
};

export const buildHotelFrontFallbackURL = (seed, size = { width: 400, height: 300 }) => {
  const w = size?.width || 400;
  const h = size?.height || 300;
  const lock = Math.abs(String(seed || 1).split('').reduce((a,c)=>a + c.charCodeAt(0),0)) % 10000;
  return `https://loremflickr.com/${w}/${h}/hotel,exterior/all?lock=${lock}`;
};