const env = process.env.NEXT_PUBLIC_ENV;
let apiBaseUrl = null;
if (env === "LOCAL") apiBaseUrl = process.env.NEXT_PUBLIC_LOCAL_API_BASE_URL;
else if (env === "PRODUCTION")
  apiBaseUrl = process.env.NEXT_PUBLIC_PRODUCTION_API_BASE_URL;

export default apiBaseUrl;
