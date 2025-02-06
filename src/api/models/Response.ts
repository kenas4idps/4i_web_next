import { isAxiosError } from 'axios';

export class SuccessfulApiResponse<T> {
  content: T;

  constructor(data: T, dataFactory: (data: any) => T = data => data) {
    this.content = dataFactory(data);
  }
}

export class FailedApiResponse {
  error: ErrorInput | undefined;

  constructor(error: any) {
    this.error = isAxiosError(error) ? error.response?.data : error;
  }
}

export type ApiResponse<T> = SuccessfulApiResponse<T> | FailedApiResponse;

interface BaseInput {
  ok: boolean;
  code: string;
  message: string;
}

export interface ResponseInput<T> extends BaseInput {
  data: T;
}

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface ErrorInput extends BaseInput {}
