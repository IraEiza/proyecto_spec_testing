
import { test, expect } from '@playwright/test';
import path from 'path';

test('QR Scanner should process QR code successfully', async ({ page }) => {
  await page.goto('http://localhost:5173/');

  await page.getByText('Empezar carga').click(); 

  // Ensure the QR scanner page is loaded
  await expect(page).toHaveURL('http://localhost:5173/qr'); 

  await page.waitForSelector('#qr-reader')
  // Simulate QR code scanning by uploading an image
  const qrCodePath = path.resolve(__dirname, 'qr-code.png')
  await page.setInputFiles('#qr-reader input[type="file"]', qrCodePath);

  const result = await page.waitForSelector('.qr-result'); 
  expect(await result.textContent()).toContain('expected-qr-code-result'); 
})


