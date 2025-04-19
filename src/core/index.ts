import { FetsonConfig, FetsonInstance, HttpMethod, Headers } from '../types';

class Fetson implements FetsonInstance {
  private baseURL: string;
  
  constructor(config: FetsonConfig = {}) {
    this.baseURL = config.baseURL || '';
    this.defaultHeaders = config.defaultHeaders || {};
  }
  
  private defaultHeaders: Record<string, string>;
  
  private getFullUrl(url: string): string {
    // 이미 완전한 URL인 경우
    if (url.startsWith('http')) {
      return url;
    }
    
    // 경로 합치기
    return `${this.baseURL}${url.startsWith('/') ? url : `/${url}`}`;
  }
  
  async get<T = any>(url: string, headers?: Headers): Promise<T> {
    const fullUrl = this.getFullUrl(url);
    
    // 사용자 헤더와 기본 헤더 병합
    const mergedHeaders = {
      ...this.defaultHeaders,
      ...(headers || {})
    };
    
    const response = await fetch(fullUrl, {
      method: 'GET',
      headers: mergedHeaders
    });
    
    if (!response.ok) {
      throw new Error(`HTTP 에러: ${response.status}`);
    }
    
    return response.json() as Promise<T>;
  }
  
  async post<T = any, D = any>(url: string, body?: D, headers?: Headers): Promise<T> {
    const fullUrl = this.getFullUrl(url);
    
    // 기본 헤더와 사용자 헤더 병합
    const mergedHeaders = {
      'Content-Type': 'application/json',
      ...this.defaultHeaders,
      ...(headers || {})
    };
    
    const response = await fetch(fullUrl, {
      method: 'POST',
      headers: mergedHeaders,
      body: JSON.stringify(body)
    });
    
    if (!response.ok) {
      throw new Error(`HTTP 에러: ${response.status}`);
    }
    
    return response.json() as Promise<T>;
  }
  
  async put<T = any, D = any>(url: string, body?: D, headers?: Headers): Promise<T> {
    const fullUrl = this.getFullUrl(url);
    
    const mergedHeaders = {
      'Content-Type': 'application/json',
      ...this.defaultHeaders,
      ...(headers || {})
    };
    
    const response = await fetch(fullUrl, {
      method: 'PUT',
      headers: mergedHeaders,
      body: JSON.stringify(body)
    });
    
    if (!response.ok) {
      throw new Error(`HTTP 에러: ${response.status}`);
    }
    
    return response.json() as Promise<T>;
  }
  
  async delete<T = any>(url: string, headers?: Headers): Promise<T> {
    const fullUrl = this.getFullUrl(url);
    
    const mergedHeaders = {
      ...this.defaultHeaders,
      ...(headers || {})
    };
    
    const response = await fetch(fullUrl, {
      method: 'DELETE',
      headers: mergedHeaders
    });
    
    if (!response.ok) {
      throw new Error(`HTTP 에러: ${response.status}`);
    }
    
    return response.json() as Promise<T>;
  }
  
  async patch<T = any, D = any>(url: string, body?: D, headers?: Headers): Promise<T> {
    const fullUrl = this.getFullUrl(url);
    
    const mergedHeaders = {
      'Content-Type': 'application/json',
      ...this.defaultHeaders,
      ...(headers || {})
    };
    
    const response = await fetch(fullUrl, {
      method: 'PATCH',
      headers: mergedHeaders,
      body: JSON.stringify(body)
    });
    
    if (!response.ok) {
      throw new Error(`HTTP 에러: ${response.status}`);
    }
    
    return response.json() as Promise<T>;
  }
  
  async request<T = any>(method: HttpMethod, url: string, body?: any, headers?: Headers): Promise<T> {
    // 메서드에 따라 적절한 함수 호출
    switch (method) {
      case 'GET':
        return this.get<T>(url, headers);
      case 'POST':
        return this.post<T>(url, body, headers);
      case 'PUT':
        return this.put<T>(url, body, headers);
      case 'DELETE':
        return this.delete<T>(url, headers);
      case 'PATCH':
        return this.patch<T>(url, body, headers);
      default:
        return this.get<T>(url, headers); // 기본적으로 GET 요청 처리
    }
  }
  

}

// 기본 인스턴스
export const fetson = new Fetson();

// 인스턴스 생성 함수
export function createFetson(config: FetsonConfig = {}): FetsonInstance {
  return new Fetson(config);
}

// 클래스 내보내기
export default Fetson;
