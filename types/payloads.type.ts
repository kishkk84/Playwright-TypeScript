export interface UserPayload {
  name: string;
  email?: string; // Optional property
  age?: number; // Optional property
  job: string;
}

export interface ApiResponse<T> {
  data: T;
  status: number;
  message: string;
}
