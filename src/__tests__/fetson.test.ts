import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { fetson } from '../index';
import Fetson from '../core';

// 글로벌 fetch 모킹
const mockFetch = vi.fn();
global.fetch = mockFetch;

describe('Fetson', () => {
  // 각 테스트 전에 모킹 초기화
  beforeEach(() => {
    mockFetch.mockReset();
    // 기본 응답 설정
    mockFetch.mockResolvedValue({
      ok: true,
      status: 200,
      json: () => Promise.resolve({ success: true, data: { id: 1, name: 'Test' } }),
      text: () => Promise.resolve('텍스트 응답'),
      headers: new Headers(),
    });
  });

  // 여러 테스트 케이스들
  
  it('기본 인스턴스가 존재해야 함', () => {
    expect(fetson).toBeDefined();
    expect(fetson).toBeInstanceOf(Fetson);
  });

  it('GET 요청이 올바르게 동작해야 함', async () => {
    const response = await fetson.get('https://api.example.com/users');
    
    expect(mockFetch).toHaveBeenCalledTimes(1);
    expect(mockFetch).toHaveBeenCalledWith('https://api.example.com/users', {
      method: 'GET',
      headers: expect.any(Object)
    });
    expect(response).toEqual({ success: true, data: { id: 1, name: 'Test' } });
  });

  it('POST 요청이 올바르게 동작해야 함', async () => {
    const data = { name: 'New User' };
    const response = await fetson.post('https://api.example.com/users', data);
    
    expect(mockFetch).toHaveBeenCalledTimes(1);
    expect(mockFetch).toHaveBeenCalledWith('https://api.example.com/users', {
      method: 'POST',
      headers: expect.objectContaining({
        'Content-Type': 'application/json'
      }),
      body: JSON.stringify(data)
    });
    expect(response).toEqual({ success: true, data: { id: 1, name: 'Test' } });
  });

  it('커스텀 인스턴스를 생성할 수 있어야 함', () => {
    const customFetson = new Fetson({
      baseURL: 'https://api.custom.com',
      headers: {
        'X-API-Key': 'test-key',
        'Content-Type': 'application/json'
      }
    });
    
    expect(customFetson).toBeDefined();
    expect(customFetson).toBeInstanceOf(Fetson);
  });

  it('커스텀 인스턴스의 baseURL이 올바르게 동작해야 함', async () => {
    const customFetson = new Fetson({
      baseURL: 'https://api.custom.com',
    });
    
    await customFetson.get('/users');
    
    expect(mockFetch).toHaveBeenCalledWith('https://api.custom.com/users', expect.any(Object));
  });

  it('에러 상태 코드에 대해 적절히 처리해야 함', async () => {
    mockFetch.mockResolvedValueOnce({
      ok: false,
      status: 404,
      statusText: 'Not Found',
      json: () => Promise.resolve({ error: 'Not found' })
    });
    
    await expect(fetson.get('https://api.example.com/nonexistent')).rejects.toThrow();
  });

  it('타입 안전성을 지원해야 함', async () => {
    interface User {
      id: number;
      name: string;
    }
    
    mockFetch.mockResolvedValueOnce({
      ok: true,
      status: 200,
      json: () => Promise.resolve<User>({ id: 1, name: 'Type Safe User' })
    });
    
    const user = await fetson.get<User>('https://api.example.com/users/1');
    
    expect(user).toEqual({ id: 1, name: 'Type Safe User' });
    expect(typeof user.id).toBe('number');
    expect(typeof user.name).toBe('string');
  });
});
