import {test, expect} from '@playwright/test'
import { describe } from 'node:test'

describe('Login user', () => {
    test('User login and added new car and hire new flatRate', async ({page}) => {

        await page.goto('http://localhost:5173/');
        await page.getByRole('link', { name: 'ACEPTAR' }).click()

        await page.locator('div').filter({ hasText: /^Particular$/ }).nth(1).click();
        
        await test.step('Login', async() => {
            await page.getByPlaceholder('Correo Electrónico *').click();
            await page.getByPlaceholder('Correo Electrónico *').fill('c2@c.com');
            await page.getByPlaceholder('Contraseña *').click();
            await page.getByPlaceholder('Contraseña *').fill('Adasat.1');
            await page.getByRole('link', { name: 'Acceder' }).click();
            await expect(
            page.locator('div').filter({hasText: /^Ver Vehículo$/})
            ).toBeVisible()      
            await expect(
              page.locator('div').filter({hasText: /^Ver Tarifa$/})
            ).toBeVisible()     
            })

        await test.step('Added new car', async() => {
            await page.locator('div').filter({ hasText: /^Ver Vehículo$/ }).click()

            await page.locator('div').filter({ hasText: /^Añadir vehículo$/ }).click();
            await page.getByPlaceholder('Matrícula *').click();
            await page.getByPlaceholder('Matrícula *').fill('0001CVX');

            await page.getByPlaceholder('Marca vehículo *').click();
            await page.getByPlaceholder('Marca vehículo *').fill('Seat');
            await page.getByPlaceholder('Modelo vehículo *').click();
            await page.getByPlaceholder('Modelo vehículo *').fill('Panda Eléctrico');
            await page.getByRole('link', { name: 'ACEPTAR' }).click();
            await page.locator('.cursor-pointer').first().click();
        })

        await test.step('Hire a Flat Rate for the new car', async() => {
            
       
        await page.locator('div').filter({ hasText: /^Ver Tarifa$/ }).click();
        await page.locator('div').filter({ hasText: /^Contratar nueva tarifa plana$/ }).click();
        await page.getByRole('link', { name: 'CONTRATAR' }).click();
        await page.getByRole('combobox').selectOption('66a7a3eff71cb1c18f7dd2fe');
        await page.getByRole('link', { name: 'PAGAR' }).click();


        await page.getByText('Ver condiciones').first().click();
        await page.getByRole('link', { name: 'OK' }).click();       
     })




       



    })


})