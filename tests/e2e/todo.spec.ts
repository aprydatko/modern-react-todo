
/* 
  Playwright E2E Test Suite - Refined for Resilience
*/
import { test, expect } from '@playwright/test';

test.describe('Todo Application E2E', () => {
  
  test.beforeEach(async ({ page }) => {
    await page.goto('/#/login');
  });

  test('User can login and create a task using stable selectors', async ({ page }) => {
    // 1. Fill login form using input types
    await page.fill('input[type="email"]', 'test@example.com');
    await page.fill('input[type="password"]', 'password123');
    await page.click('button[type="submit"]');

    // 2. Wait for navigation
    await expect(page).toHaveURL(/.*todos/);
    
    // 3. Create a new todo using data-testid
    const taskName = 'Architectural Review';
    await page.fill('[data-testid="todo-input-title"]', taskName);
    await page.fill('[data-testid="todo-input-desc"]', 'Finalizing the testing strategy');
    await page.click('[data-testid="todo-submit"]');

    // 4. Verify todo appeared in the list
    const todoList = page.locator('[data-testid="todo-list"]');
    await expect(todoList).toContainText(taskName);
    
    // 5. Verify stats updated
    const pendingCount = page.locator('[data-testid="pending-count"]');
    await expect(pendingCount).not.toHaveText('0');
  });

  test('User can toggle dark mode and maintain state after interaction', async ({ page }) => {
    const html = page.locator('html');
    const themeBtn = page.locator('button[aria-label="Toggle Theme"]');
    
    await expect(html).not.toHaveClass(/dark/);
    await themeBtn.click();
    await expect(html).toHaveClass(/dark/);
  });
});
