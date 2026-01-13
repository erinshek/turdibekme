---
layout: post
title: "Code Snippets Across Programming Languages"
description: "A comprehensive showcase of syntax highlighting with code examples in Python, JavaScript, Go, Rust, and more."
date: 2025-01-10
tags: [python, javascript, go, rust, code]
---

One of the essential features of any technical blog is proper code syntax highlighting. In this post, I'll showcase how code looks across different programming languages.

## Python

Python is known for its clean, readable syntax. Here's a simple example of a decorator pattern:

```python
from functools import wraps
import time

def timing_decorator(func):
    """A decorator that prints the execution time of a function."""
    @wraps(func)
    def wrapper(*args, **kwargs):
        start = time.perf_counter()
        result = func(*args, **kwargs)
        end = time.perf_counter()
        print(f"{func.__name__} took {end - start:.4f} seconds")
        return result
    return wrapper

@timing_decorator
def slow_function():
    """Simulates a slow operation."""
    time.sleep(1)
    return "Done!"

# Usage
result = slow_function()
print(result)
```

## JavaScript / TypeScript

Modern JavaScript with async/await and TypeScript types:

```typescript
interface User {
  id: number;
  name: string;
  email: string;
  createdAt: Date;
}

async function fetchUser(id: number): Promise<User | null> {
  try {
    const response = await fetch(`/api/users/${id}`);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data: User = await response.json();
    return data;
  } catch (error) {
    console.error('Failed to fetch user:', error);
    return null;
  }
}

// Using the function
const user = await fetchUser(1);
console.log(user?.name ?? 'Unknown user');
```

## Go

Go's simplicity and explicit error handling:

```go
package main

import (
    "encoding/json"
    "fmt"
    "net/http"
)

type User struct {
    ID        int    `json:"id"`
    Name      string `json:"name"`
    Email     string `json:"email"`
}

func getUser(w http.ResponseWriter, r *http.Request) {
    user := User{
        ID:    1,
        Name:  "John Doe",
        Email: "john@example.com",
    }

    w.Header().Set("Content-Type", "application/json")

    if err := json.NewEncoder(w).Encode(user); err != nil {
        http.Error(w, err.Error(), http.StatusInternalServerError)
        return
    }
}

func main() {
    http.HandleFunc("/user", getUser)
    fmt.Println("Server starting on :8080")
    http.ListenAndServe(":8080", nil)
}
```

## Rust

Rust with its ownership system and pattern matching:

```rust
use std::collections::HashMap;

#[derive(Debug, Clone)]
struct Cache<T> {
    data: HashMap<String, T>,
    capacity: usize,
}

impl<T: Clone> Cache<T> {
    fn new(capacity: usize) -> Self {
        Cache {
            data: HashMap::with_capacity(capacity),
            capacity,
        }
    }

    fn get(&self, key: &str) -> Option<&T> {
        self.data.get(key)
    }

    fn insert(&mut self, key: String, value: T) -> Option<T> {
        if self.data.len() >= self.capacity && !self.data.contains_key(&key) {
            // Simple eviction: remove first key found
            if let Some(first_key) = self.data.keys().next().cloned() {
                self.data.remove(&first_key);
            }
        }
        self.data.insert(key, value)
    }
}

fn main() {
    let mut cache: Cache<i32> = Cache::new(3);
    cache.insert("one".to_string(), 1);
    cache.insert("two".to_string(), 2);

    match cache.get("one") {
        Some(value) => println!("Found: {}", value),
        None => println!("Not found"),
    }
}
```

## SQL

Database queries with proper formatting:

```sql
-- Find active users with their order statistics
SELECT
    u.id,
    u.name,
    u.email,
    COUNT(o.id) AS total_orders,
    COALESCE(SUM(o.total_amount), 0) AS total_spent,
    MAX(o.created_at) AS last_order_date
FROM users u
LEFT JOIN orders o ON u.id = o.user_id
WHERE u.status = 'active'
    AND u.created_at >= DATE_SUB(NOW(), INTERVAL 1 YEAR)
GROUP BY u.id, u.name, u.email
HAVING total_orders > 0
ORDER BY total_spent DESC
LIMIT 100;
```

## Shell / Bash

Automation scripts with error handling:

```bash
#!/bin/bash
set -euo pipefail

# Configuration
BACKUP_DIR="/var/backups/database"
DATE=$(date +%Y%m%d_%H%M%S)
RETENTION_DAYS=7

# Create backup directory if it doesn't exist
mkdir -p "$BACKUP_DIR"

# Function to perform backup
backup_database() {
    local db_name="$1"
    local backup_file="$BACKUP_DIR/${db_name}_${DATE}.sql.gz"

    echo "Backing up $db_name..."

    pg_dump "$db_name" | gzip > "$backup_file"

    if [[ -f "$backup_file" ]]; then
        echo "Backup created: $backup_file"
        return 0
    else
        echo "Error: Backup failed for $db_name" >&2
        return 1
    fi
}

# Clean old backups
find "$BACKUP_DIR" -name "*.sql.gz" -mtime +"$RETENTION_DAYS" -delete

# Run backup
backup_database "production_db"
echo "Backup complete!"
```

## CSS

Modern CSS with custom properties:

```css
:root {
  --primary-color: #2563eb;
  --spacing-unit: 0.5rem;
  --transition-speed: 200ms;
}

.card {
  display: grid;
  gap: calc(var(--spacing-unit) * 3);
  padding: calc(var(--spacing-unit) * 4);
  border-radius: 8px;
  background: linear-gradient(
    135deg,
    var(--primary-color),
    hsl(from var(--primary-color) h s calc(l - 10%))
  );
  box-shadow:
    0 4px 6px -1px rgb(0 0 0 / 0.1),
    0 2px 4px -2px rgb(0 0 0 / 0.1);
  transition: transform var(--transition-speed) ease;
}

.card:hover {
  transform: translateY(-2px);
}

@media (prefers-reduced-motion: reduce) {
  .card {
    transition: none;
  }
}
```

## Inline Code

You can also use inline code like `const x = 42` or reference file paths like `src/components/Button.tsx` within paragraphs.

---

Proper syntax highlighting makes code much easier to read and understand. This blog uses Rouge for syntax highlighting, which supports a wide variety of programming languages.
