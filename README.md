# fetson

**fetson**는 타입 안전성, 미들웨어 확장성을 모두 갖춘 초경량 HTTP 클라이언트입니다.

## 예시 사용법
```typescript
import { fs } from 'fetson';

// 타입 지정 예시
type User = { id: string; name: string };

const user = await fs.post<User>('https://petstore.swagger.io/v2/pet', { name: 'Tom' });
const users = await fs.get<User[]>('https://petstore.swagger.io/v2/pet/findByStatus', { params: { status: 'available' } });
const user = await fs.put<User>('https://petstore.swagger.io/v2/pet', { name: 'Tom' });
const user = await fs.delete<User>('https://petstore.swagger.io/v2/pet/1');
const user = await fs.patch<User>('https://petstore.swagger.io/v2/pet', { name: 'Tom' });

```

## 라이선스
MIT
