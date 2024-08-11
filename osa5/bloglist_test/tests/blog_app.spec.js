const { test, expect, beforeEach, describe } = require('@playwright/test')
const { loginWith, createBlog } = require('./helper')

describe('Blog app', () => {
  beforeEach(async ({ page, request }) => {
    await request.post('http:localhost:3003/api/testing/reset')
    await request.post('http://localhost:3003/api/users', {
      data: {
        name: 'Matti Luukkainen',
        username: 'mluukkai',
        password: 'salainen'
      }
    })

    await request.post('http://localhost:3003/api/users', {
        data: {
          name: 'testing',
          username: 'test',
          password: 'salainen'
        }
      })

    await page.goto('http://localhost:5173')
  })

  test('Login form is shown', async ({ page }) => {
    const locator = await page.getByText('blogs')
    await expect(locator).toBeVisible()
    await expect(page.getByText('username')).toBeVisible()
    await expect(page.getByText('password')).toBeVisible()
  })

    describe('Login', () => {
        test('succeeds with correct credentials', async ({ page }) => {
            await loginWith(page, 'mluukkai', 'salainen')
            await expect(page.getByText('Matti Luukkainen logged in')).toBeVisible()
        })

        test('fails with wrong credentials', async ({ page }) => {
            await page.getByTestId('username').fill('mluukkai')
            await page.getByTestId('password').fill('väärä')
            await page.getByRole('button', { name: 'login' }).click()

            const errorDiv = await page.locator('.error')
            await expect(errorDiv).toContainText('invalid username or password')
            await expect(errorDiv).toHaveCSS('border-style', 'solid')
            await expect(errorDiv).toHaveCSS('color', 'rgb(255, 0, 0)')
            
            await expect(page.getByText('Matti Luukkainen logged in')).not.toBeVisible()
        })

    describe('When logged in', () => {
        beforeEach(async ({ page }) => {
            await loginWith(page, 'mluukkai', 'salainen')
        })
      
        test('a new blog can be created', async ({ page }) => {
            await createBlog(page, 'test title', 'test author', 'test url', true)
            await expect(page.getByText('a new blog "test title" by "test author" added')).toBeVisible()
            await expect(page.getByText('test title test author')).toBeVisible()
        })
     
    
        test('blog can be liked', async ({ page }) => {
            await createBlog(page, 'test title', 'test author', 'test url', true)
            await page.getByRole('button', { name: 'view' }).click()
            await expect(page.getByText('test url')).toBeVisible()
            await page.getByRole('button', { name: 'like' }).click()
            await expect(page.getByText('you liked "test title"')).toBeVisible()
        })

        test('blog can be deleted', async ({ page }) => {
            await createBlog(page, 'test title', 'test author', 'test url', true)
            await page.getByRole('button', { name: 'view' }).click()
            await expect(page.getByText('test url')).toBeVisible()

            page.on('dialog', async dialog => { 
                console.log(dialog.message())
                dialog.accept() })
            await page.getByRole('button', { name: 'remove' }).click()
            
            await expect(page.getByText('deleted "test title"')).toBeVisible()
            })
        test('user can only delete their own blog', async ({ page }) => {
            await createBlog(page, 'test title', 'test author', 'test url', true)
            
            await page.getByRole('button', { name: 'view' }).click()
            await expect(page.getByText('test url')).toBeVisible()
            await expect(page.getByRole('button', { name: 'remove' })).toBeVisible()

            await page.getByRole('button', { name: 'logout' }).click()
            
            await loginWith(page, 'test', 'salainen')
            
            await page.getByRole('button', { name: 'view' }).click()
            page.on('dialog', async dialog => { 
                console.log(dialog.message())
                dialog.accept() })
            await page.getByRole('button', { name: 'remove' }).click()
            const errorDiv = await page.locator('.error')
            await expect(errorDiv).toContainText('you can only delete ur own blog')
            })

        test('blogs are in order by likes', async ({ page }) => {
            await createBlog(page, 'Firstblog', '1', 'first', true)
            await createBlog(page, 'Secondblog', '2', 'second', true)
            await createBlog(page, 'Thirdblog', '3', 'third', true)

            await page.getByText('Thirdblog 3').getByRole('button', { name: 'view' }).click()
            await page.getByRole('button', { name: 'like' }).click()
            await page.getByRole('button', { name: 'like' }).click() 
            await page.getByText('Thirdblog 3').getByRole('button', { name: 'hide' }).click()
            

            await page.getByText('Firstblog 1').getByRole('button', { name: 'view' }).click()
            await page.getByRole('button', { name: 'like' }).click() 

            const blogs = await page.locator('[data-testid="blog"]') 
            const firstplace = await blogs.nth(0).textContent()
            const secondplace = await blogs.nth(1).textContent()
            const thirdplace = await blogs.nth(2).textContent()

            expect(firstplace).toContain('Thirdblog')
            expect(secondplace).toContain('Firstblog')
            expect(thirdplace).toContain('Secondblog')
            })
        })
    })
})