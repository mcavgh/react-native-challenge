class ApiClient {
  private baseURL = 'https://jsonplaceholder.org';

  async get<T>(endpoint: string): Promise<T> {
    try {
      const response = await fetch(`${this.baseURL}${endpoint}`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json();
    } catch (error) {
      console.error('API Error:', error);
      throw error;
    }
  }
}

export const apiClient = new ApiClient();