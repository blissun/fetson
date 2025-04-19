# Fetson

**Fetson** is a lightweight HTTP client with complete type safety for TypeScript.

## Installation

```bash
npm install fetson
```

## Basic Usage

```typescript
import { fetson } from "fetson";

// Type definition example
interface User {
  id: number;
  name: string;
  email: string;
}

// GET
const users = await fetson.get<User[]>("https://api.example.com/users");

// POST
const newUser = await fetson.post<User>("https://api.example.com/users", {
  name: "John",
  email: "James@example.com",
});

// PUT
const updatedUser = await fetson.put<User>("https://api.example.com/users/123", {
  name: "James",
  email: "James@cacao.com",
});

// PATCH
const patchedUser = await fetson.patch<User>("https://api.example.com/users/123", {
  name: "Jameson",
});

// DELETE
await fetson.delete("https://api.example.com/users/123");
```

## Custom Instance Creation

```typescript
import { Fetson } from "fetson";

// Create an instance with base URL and authentication
const fs = new Fetson({
  baseURL: "https://api.myservice.com",
  headers: {
    Authorization: "Bearer YOUR_TOKEN",
    "Content-Type": "application/json",
  },
});
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
const products = await fetson.get<Product[]>("/products");

// Leverage all TypeScript benefits
products.forEach((product) => {
  console.log(`${product.name}: $${product.price}`);
});
```

## License

MIT License
