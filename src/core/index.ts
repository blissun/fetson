import { FetsonConfig, FetsonInstance, HttpMethod, Headers } from "../types";
import { HttpError } from "./HttpError";

class Fetson implements FetsonInstance {
  private baseURL: string;
  private defaultHeaders: Record<string, string>;

  constructor(config: FetsonConfig = {}) {
    this.baseURL = config.baseURL || "";
    this.defaultHeaders = config.defaultHeaders || {};
  }

  private getFullUrl(url: string): string {
    if (url.startsWith("http")) {
      return url;
    }

    const trimmedBaseURL = this.baseURL.endsWith("/")
      ? this.baseURL.slice(0, -1)
      : this.baseURL;
    const trimmedUrl = url.startsWith("/") ? url.slice(1) : url;

    return `${trimmedBaseURL}/${trimmedUrl}`;
  }

  async request<T = any>(
    method: HttpMethod,
    url: string,
    body?: any,
    headers?: Headers
  ): Promise<T> {
    const fullUrl = this.getFullUrl(url);

    const mergedHeaders = {
      ...this.defaultHeaders,
      ...headers,
    };

    if (body) {
      mergedHeaders["Content-Type"] = "application/json";
    }

    const response = await fetch(fullUrl, {
      method,
      headers: mergedHeaders,
      body: body ? JSON.stringify(body) : undefined,
    });

    if (!response.ok) {
      throw new HttpError(response);
    }

    // DELETE와 같이 본문이 없는 응답 처리
    if (response.status === 204 || method === "DELETE") {
      return Promise.resolve() as Promise<T>;
    }

    return response.json() as Promise<T>;
  }

  async get<T = any>(url: string, headers?: Headers): Promise<T> {
    return this.request<T>("GET", url, undefined, headers);
  }

  async post<T = any, D = any>(
    url: string,
    body?: D,
    headers?: Headers
  ): Promise<T> {
    return this.request<T>("POST", url, body, headers);
  }

  async put<T = any, D = any>(
    url: string,
    body?: D,
    headers?: Headers
  ): Promise<T> {
    return this.request<T>("PUT", url, body, headers);
  }

  async delete<T = any>(url: string, headers?: Headers): Promise<T> {
    return this.request<T>("DELETE", url, undefined, headers);
  }

  async patch<T = any, D = any>(
    url: string,
    body?: D,
    headers?: Headers
  ): Promise<T> {
    return this.request<T>("PATCH", url, body, headers);
  }
}

// 기본 인스턴스
export const fetson = new Fetson();

// 클래스 내보내기
export default Fetson;
