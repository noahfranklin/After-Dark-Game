import * as Ably from 'ably';

// This is a placeholder for the Ably client setup.
// To use this in production, you would instantiate the client like this:
// export const ablyClient = new Ably.Realtime({ key: process.env.NEXT_PUBLIC_ABLY_API_KEY });

export const getAblyClient = () => {
  if (typeof window !== "undefined") {
    // Scaffold: Return a mock or initialized client
    // We avoid initializing it immediately if ABLY_API_KEY is not set
    if (!process.env.NEXT_PUBLIC_ABLY_API_KEY) {
      console.warn("Ably API key is not set. Realtime features will not work.");
      return null;
    }
    return new Ably.Realtime({ key: process.env.NEXT_PUBLIC_ABLY_API_KEY });
  }
  return null;
};
