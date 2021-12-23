import puppeteer from 'puppeteer';
import { Rank } from '../types';

export async function getRanks(page: puppeteer.Page): Promise<Rank[]> {
  return page.evaluate(() => {
    return Array.from(
      document.querySelectorAll(
        'div.masthead-player div.competitive-rank-role'
      ),
      (rank) => ({
        src: rank.querySelector<HTMLInputElement>(
          'img.competitive-rank-tier-icon'
        )?.src,
        role: rank
          .querySelector<HTMLInputElement>('span.ow-Tooltip')
          ?.innerText.replace(/ .*/, ''),
        sr: rank.querySelector<HTMLInputElement>('div.competitive-rank-level')
          ?.innerText
      })
    );
  });
}
