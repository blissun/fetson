import { FetsonConfig, FetsonInstance, HttpMethod } from '../types';

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
  
  async get<T = any>(url: string): Promise<T> {
    const fullUrl = this.getFullUrl(url);
    
    const response = await fetch(fullUrl, {
      method: 'GET',
      headers: this.defaultHeaders
    });
    
    if (!response.ok) {
      throw new Error(`HTTP 에러: ${response.status}`);
    }
    
    return response.json() as Promise<T>;
  }
  
  async post<T = any, D = any>(url: string, body?: D): Promise<T> {
    const fullUrl = this.getFullUrl(url);
    
    // 기본 헤더 설정
    const headers = {
      'Content-Type': 'application/json',
      ...this.defaultHeaders
    };
    
    const response = await fetch(fullUrl, {
      method: 'POST',
      headers,
      body: JSON.stringify(body)
    });
    
    if (!response.ok) {
      throw new Error(`HTTP 에러: ${response.status}`);
    }
    
    return response.json() as Promise<T>;
  }
  
  async put(url: string, body?: any): Promise<any> {
    const fullUrl = this.getFullUrl(url);
    
    const headers = {
      'Content-Type': 'application/json',
      ...this.defaultHeaders
    };
    
    const response = await fetch(fullUrl, {
      method: 'PUT',
      headers,
      body: JSON.stringify(body)
    });
    
    if (!response.ok) {
      throw new Error(`HTTP 에러: ${response.status}`);
    }
    
    return response.json();
  }
  
  async delete(url: string): Promise<any> {
    const fullUrl = this.getFullUrl(url);
    
    const response = await fetch(fullUrl, {
      method: 'DELETE',
      headers: this.defaultHeaders
    });
    
    if (!response.ok) {
      throw new Error(`HTTP 에러: ${response.status}`);
    }
    
    return response.json();
  }
  
  async patch(url: string, body?: any): Promise<any> {
    const fullUrl = this.getFullUrl(url);
    
    const headers = {
      'Content-Type': 'application/json',
      ...this.defaultHeaders
    };
    
    const response = await fetch(fullUrl, {
      method: 'PATCH',
      headers,
      body: JSON.stringify(body)
    });
    
    if (!response.ok) {
      throw new Error(`HTTP 에러: ${response.status}`);
    }
    
    return response.json();
  }
  
  async request(method: HttpMethod, url: string): Promise<any> {
    // 메서드에 따라 적절한 함수 호출
    switch (method) {
      case 'GET':
        return this.get(url);
      case 'POST':
        return this.post(url);
      case 'PUT':
        return this.put(url);
      case 'DELETE':
        return this.delete(url);
      case 'PATCH':
        return this.patch(url);
      default:
        return this.get(url); // 기본적으로 GET 요청 처리
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
