import puppeteer from 'puppeteer';
import { GameStat } from '../enums';
import { InfoField } from '../types';

export async function getInfo(page: puppeteer.Page): Promise<InfoField[]> {
  return page.evaluate((GameStat) => {
    return Object.values(GameStat).map((dataId) => {
      const row = Array.from(
        document.querySelectorAll(`tr[data-stat-id = '${dataId}']`)
      );
      const data = Array.from(row[1].children, (td) => td.innerHTML);
      return {
        name: data[0],
        value: data[1]
      };
    });
  }, GameStat);
}
