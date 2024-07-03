const { test, expect, beforeEach, describe } = require('@playwright/test')

describe('Blog app', () => {
  
    beforeEach(async ({ page, request }) => {
        await request.post('http://localhost:3001/api/testing/reset')
        await request.post('http://localhost:3001/api/testing/make')
        await request.post('http://localhost:3001/api/users', {
          data: {
            name: 'Admin',
            username: 'admin',
            password: 'password'
          }
        })

        await request.post('http://localhost:3001/api/users', {
            data: {
              name: 'User',
              username: 'user',
              password: 'userpassword'
            }
          })
        await page.goto('http://localhost:5173')
    })

  test('Login form is shown', async ({ page }) => {
    await page.getByRole('button', { name: 'login' }).click()
  })

  describe('Login', () => {
    test('succeeds with correct credentials', async ({ page }) => {
        
        await page.getByTestId('username').fill('admin')
        await page.getByTestId('password').fill('password')
        await page.getByRole('button', { name: 'login' }).click()
    
        await expect(page.getByText('admin logged in')).toBeVisible()
    })

    test('fails with wrong credentials', async ({ page }) => {
        await page.getByTestId('username').fill('admin')
        await page.getByTestId('password').fill('Notpassword')
        await page.getByRole('button', { name: 'login' }).click()
    
        await expect(page.getByText('Wrong Credentials')).toBeVisible()
    })

    describe('When logged in', () => {
        beforeEach(async ({ page }) => {
            await page.getByTestId('username').fill('admin')
            await page.getByTestId('password').fill('password')
            await page.getByRole('button', { name: 'login' }).click()
        })
      
        test('a new blog can be created', async ({ page }) => {
            await page.getByRole('button', { name: 'New Blog' }).click()
            await page.getByTestId('new-title').fill('playwright-title')
            await page.getByTestId('new-author').fill('playwright-author')
            await page.getByTestId('new-url').fill('playwright-url')
            await page.getByRole('button', { name: 'create' }).click()
            await expect(page.getByText('playwright-title')).toBeVisible()
            await expect(page.getByText('playwright-author')).toBeVisible()
        })

        test('a blog can be liked', async ({ page }) => {
            await page.getByRole('button', { name: 'New Blog' }).click()
            await page.getByTestId('new-title').fill('playwright-title')
            await page.getByTestId('new-author').fill('playwright-author')
            await page.getByTestId('new-url').fill('playwright-url')
            await page.getByRole('button', { name: 'create' }).click()
            await page.getByRole('button', { name: 'like' }).click()
            
            await expect(page.getByText('Added like')).toBeVisible()


        })

        test('only user who created blog can delete', async ({ page }) => {
            await page.getByRole('button', { name: 'New Blog' }).click()
            await page.getByTestId('new-title').fill('playwright-title')
            await page.getByTestId('new-author').fill('playwright-author')
            await page.getByTestId('new-url').fill('playwright-url')
            await page.getByRole('button', { name: 'create' }).click()
            await page.getByRole('button', { name: 'Log Out' }).click()
            await page.getByTestId('username').fill('user')
            await page.getByTestId('password').fill('userpassword')
            await page.getByRole('button', { name: 'login' }).click()
            await expect(page.getByText('delete')).not.toBeVisible()

        })

        test('the blogs are arranged by likes', async ({ page, request }) => {
            
              
            const viewButtons = await page.getByRole('button').getByText('view').all()
            const likes = [10, 5, 0]

            for (const button in viewButtons) {
            await button.click()
            }

            const blogdivs = await page.locator('.blog')



        })
      })


  })
})