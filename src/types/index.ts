// HTTP 요청 메서드 타입
export type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';

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
  get(url: string,): Promise<any>;
  // POST 요청
  post(url: string, body?: any,): Promise<any>;
  // PUT 요청
  put(url: string, body?: any,): Promise<any>;
  // DELETE 요청
  delete(url: string,): Promise<any>;
  // PATCH 요청
  patch(url: string, body?: any,): Promise<any>;
  // 일반 요청
  request(method: HttpMethod, url: string,): Promise<any>;
}
