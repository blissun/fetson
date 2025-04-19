# Fetson

**Fetson** is a lightweight HTTP client with complete type safety for TypeScript.

## Installation

```bash
npm install fetson
```

## Basic Usage

```typescript
import { fetson } from 'fetson';

// Type definition example
interface User {
  id: number;
  name: string;
  email: string;
}

// GET request example
const users = await fetson.get<User[]>('https://api.example.com/users');

// POST request example
const newUser = await fetson.post<User>('https://api.example.com/users', {
  name: 'John',
  email: 'john@example.com'
});

// PUT request example
const updatedUser = await fetson.put<User>('https://api.example.com/users/1', {
  name: 'John (Updated)'
});

// DELETE request example
const deletedUser = await fetson.delete<User>('https://api.example.com/users/1');

// PATCH request example
const patchedUser = await fetson.patch<User>('https://api.example.com/users/1', {
  name: 'New Name'
});
```

## Custom Instance Creation

```typescript
import { Fetson } from 'fetson';

// Create an instance with base URL and authentication
const myApi = new Fetson({
  baseURL: 'https://api.myservice.com',
  headers: {
    'Authorization': 'Bearer YOUR_TOKEN',
    'Content-Type': 'application/json'
  }
});

// Use the new instance for requests
const data = await myApi.get('/resources');
```

## Type Safety

Fetson implements complete type safety using TypeScript generics.

```typescript
// Interface definition
interface Product {
  id: number;
  name: string;
  price: number;
}

// Get type-safe response
const products = await fetson.get<Product[]>('/products');

// Leverage all TypeScript benefits
products.forEach(product => {
  console.log(`${product.name}: $${product.price}`);
});
```

## License

MIT License
