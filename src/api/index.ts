import { AxiosInstance } from 'axios';
import { userAPI } from './collections';
import { CommonClient } from './clients';

export interface APIProps {
  userClient: AxiosInstance;
}

export class API {
  user: UserAPI;

  constructor({ userClient }: APIProps) {
    this.user = new UserAPI(userClient);
  }
}

class UserAPI {
  client: AxiosInstance;
  collection: ReturnType<typeof userAPI>;

  constructor(axios: AxiosInstance) {
    this.client = axios;
    this.collection = userAPI({ axios: this.client });
  }
}

export const api = new API({ userClient: CommonClient });
