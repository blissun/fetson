// HTTP 요청 메서드 타입
export type HttpMethod = "GET" | "POST" | "PUT" | "DELETE" | "PATCH";

// 헤더는 string 값을 가진 객체
export type Headers = {
  [key: string]: string;
};

// URL 파라미터 타입
export type Params = {
  [key: string]: any;
};

// fetson 설정 타입
export interface FetsonConfig {
  baseURL?: string;
  defaultHeaders?: Headers;
}

// fetson 인스턴스 타입
export interface FetsonInstance {
  // GET 요청
  get<T = any>(url: string, headers?: Headers): Promise<T>;
  // POST 요청
  post<T = any, D = any>(url: string, body?: D, headers?: Headers): Promise<T>;
  // PUT 요청
  put<T = any, D = any>(url: string, body?: D, headers?: Headers): Promise<T>;
  // DELETE 요청
  delete<T = any>(url: string, headers?: Headers): Promise<T>;
  // PATCH 요청
  patch<T = any, D = any>(url: string, body?: D, headers?: Headers): Promise<T>;
  // 일반 요청
  request<T = any>(
    method: HttpMethod,
    url: string,
    body?: any,
    headers?: Headers
  ): Promise<T>;
}
