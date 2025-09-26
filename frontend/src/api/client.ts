// Simple fetch-based API client for now
// TODO: Integrate proper ts-rest client when needed

export const api = {
  getData: async () => {
    const response = await fetch('http://localhost:3000/api');
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }
    return { status: 200 as const, body: await response.json() };
  },
  getHealth: async () => {
    const response = await fetch('http://localhost:3000/api/health');
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }
    return { status: 200 as const, body: await response.json() };
  },
};










