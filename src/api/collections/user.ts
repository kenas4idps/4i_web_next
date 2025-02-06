import { AxiosInstance } from 'axios';
import { ApiResponse, FailedApiResponse, SuccessfulApiResponse } from './../models';
import { User, UserProps } from '../models/Users';

interface userAPIProps {
  axios: AxiosInstance;
}

export function userAPI({ axios }: userAPIProps) {
  return {
    async getUser({
      telegramId,
      principal,
    }: {
      telegramId: string;
      principal: string;
    }): Promise<ApiResponse<User>> {
      try {
        const response = await axios.get(`/user/${telegramId}/${principal}`);

        return new SuccessfulApiResponse(response.data, (data: UserProps) => new User(data));
      } catch (error) {
        return new FailedApiResponse(error);
      }
    },
    async updateUser({
      telegramId,
      principal,
      payload,
    }: {
      telegramId: string;
      principal: string;
      payload: { email: string; name: string };
    }): Promise<ApiResponse<User>> {
      try {
        const response = await axios.patch('/user', {
          ...payload,
          telegramId,
          principal,
        });
        return new SuccessfulApiResponse(response.data, (data: UserProps) => new User(data));
      } catch (error) {
        return new FailedApiResponse(error);
      }
    },
  };
}
