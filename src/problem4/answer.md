### **1. Using a Loop**  
```ts
function sum_to_n_a(n: number): number {
  // Using a loop to accumulate the sum
  let sum = 0;
  for (let i = 1; i <= n; i++) {
    sum += i;
  }
  return sum;
}
```

- **Time Complexity:** `O(n)` – The loop runs `n` times.  
- **Space Complexity:** `O(1)` – Only one variable (`sum`) is used.  
- **Efficiency:** Moderate. It efficiently accumulates the sum but requires `n` iterations.  

---

### **2. Using a Mathematical Formula**  
```ts
function sum_to_n_b(n: number): number {
  // Using the arithmetic series formula: n * (n + 1) / 2
  return (n * (n + 1)) / 2;
}
```

- **Time Complexity:** `O(1)` – Direct calculation, independent of `n`.  
- **Space Complexity:** `O(1)` – Only one operation is performed.  
- **Efficiency:** High. Fastest among the three due to constant-time calculation.  

---

### **3. Using Recursion**  
```ts
function sum_to_n_c(n: number): number {
  // Using recursion to calculate the sum
  if (n <= 1) return n;
  return n + sum_to_n_c(n - 1);
}
```

- **Time Complexity:** `O(n)` – `n` recursive calls.  
- **Space Complexity:** `O(n)` – Call stack grows with each recursive call.  
- **Efficiency:** Low for large `n` due to risk of stack overflow and higher memory usage.  
