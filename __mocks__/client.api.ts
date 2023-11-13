import {jest} from '@jest/globals';
import {ClientApiCallConfig, IClientApi} from '../src/data/api/client.api';

interface GetResponseMock<T> {
  ok: boolean;
  status: number;
  statusText: string;
  json(): Promise<T>;
}

class ClientApiMock implements IClientApi {
  private getResponse: GetResponseMock<any>;

  constructor(private baseURL: string) {
    this.getResponse = {
      ok: true,
      status: 200,
      statusText: 'Success',
      json() {
        return Promise.resolve({});
      },
    };
  }

  // @ts-ignore
  get = jest.fn(
    <T, Params = {}>(
      _: string,
      __?: ClientApiCallConfig<Params>,
    ): Promise<T> => {
      if (!this.getResponse.ok) {
        throw new Error(
          `[CLIENT_API]: ${this.getResponse.status} | ${this.getResponse.statusText}`,
        );
      }

      return this.getResponse.json();
    },
  );
}

export default ClientApiMock;
