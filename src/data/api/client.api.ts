export interface ClientApiCallConfig<Params = {}> extends RequestInit {
  params?: Params;
}

export interface IClientApi {
  get<T, Params extends {}>(
    url: string,
    config?: ClientApiCallConfig<Params>,
  ): Promise<T>;
}

class ClientApi implements IClientApi {
  constructor(private baseURL: string) {}

  async get<T, Params = {}>(
    url: string,
    config?: ClientApiCallConfig<Params>,
  ): Promise<T> {
    const preparedURL = this.prepareURL(url, config?.params);

    const response = await fetch(preparedURL, config);
    if (!response.ok) {
      throw new Error(
        `[CLIENT_API]: ${response.status} | ${response.statusText}`,
      );
    }

    return response.json();
  }

  private prepareURL<Params = {}>(url: string, params?: Params) {
    const fullURL = `${this.baseURL}${url}`;
    if (!params) {
      return fullURL;
    }

    const queryParams = new URLSearchParams(params);
    return `${fullURL}?${queryParams}`;
  }
}

export default ClientApi;
