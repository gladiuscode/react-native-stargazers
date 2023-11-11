export interface ClientApiCallConfig extends RequestInit {}

export interface IClientApi {
  get<T>(url: string, config?: ClientApiCallConfig): Promise<T>;
}

class ClientApi implements IClientApi {
  constructor(private baseURL: string) {}

  async get<T>(url: string, config?: ClientApiCallConfig): Promise<T> {
    const response = await fetch(`${this.baseURL}${url}`, config);
    if (!response.ok) {
      throw new Error(
        `[CLIENT_API]: ${response.status} | ${response.statusText}`,
      );
    }

    return response.json();
  }
}

export default ClientApi;
