import { APIRequestContext } from "@playwright/test";
import { ApiResponse } from "../types/payloads.type.ts";

export async function getData<T>(
  apiRequest: APIRequestContext,
  url: string,
): Promise<ApiResponse<T>> {
  return makeRequest<T>(apiRequest, "GET", url);
}

export async function postData<T>(
  apiRequest: APIRequestContext,
  url: string,
  payload: T,
): Promise<ApiResponse<T>> {
  return makeRequest<T>(apiRequest, "POST", url, payload);
}

export async function putData<T>(
  apiRequest: APIRequestContext,
  url: string,
  payload: T,
): Promise<ApiResponse<T>> {
  return makeRequest<T>(apiRequest, "PUT", url, payload);
}

export async function patchData<T>(
  apiRequest: APIRequestContext,
  url: string,
  payload: T,
): Promise<ApiResponse<T>> {
  return makeRequest<T>(apiRequest, "PATCH", url, payload);
}

export async function deleteData<T>(
  apiRequest: APIRequestContext,
  url: string,
): Promise<ApiResponse<T>> {
  return makeRequest<T>(apiRequest, "DELETE", url);
}

async function makeRequest<T>(
  apiRequest: APIRequestContext,
  method: string,
  url: string,
  payload?: T,
): Promise<ApiResponse<T>> {
  const options: any = {
    method,
    headers: {
      "Content-Type": "application/json",
    },
  };

  if (payload) {
    options.data = payload;
  }

  const response = await apiRequest.fetch(url, options);
  const data = await response.json();
  return {
    data,
    status: response.status(),
    message: response.statusText(),
  };
}
