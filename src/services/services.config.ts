const isProd = process.env.NODE_ENV === 'production';
export const API_URI = isProd
    ? `https://${process.env.NEXT_PUBLIC_VERCEL_URL}/api`
    : 'http://localhost:3000/api';