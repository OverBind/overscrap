import puppeteer from 'puppeteer';
import fs from 'fs';
import path from 'path';

export async function setupTest() {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    const html = fs.readFileSync(
      path.resolve(__dirname, '../mocks/html/FusGaar.html'),
      'utf8'
    );
    await page.setContent(html);

    return page;
}