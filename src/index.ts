import puppeteer from 'puppeteer';
import fs from 'fs';
import path from 'path';
import { GameStat, HeroStat, Heroes } from './enums';
import { Rank, InfoField, Hero } from './types';

export class OverScrap {
  private _page: puppeteer.Page;

  constructor(page: puppeteer.Page) {
    this._page = page;
  }

  public static async build(
    username: string,
    hashtag: string,
    platform: string
  ): Promise<OverScrap> {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    const url = `https://playoverwatch.com/en-us/career/${platform}/${username}-${hashtag}/`;

    if (process.env.NODE_ENV === 'test') {
      const test = fs.readFileSync(
        path.resolve(__dirname, '../tests/mocks/html/FusGaar.html'),
        'utf8'
      );
      await page.setContent(test);
    } else {
      await page.goto(url);
    }

    const instance = new OverScrap(page);

    const cleanup = new FinalizationRegistry(
      async (browser: puppeteer.Browser) => {
        await browser.close();
      }
    );
    cleanup.register(instance, browser);

    return instance;
  }

  getRanks(): Promise<Rank[]> {
    return this._page.evaluate(() => {
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

  async getInfo(): Promise<InfoField[]> {
    return this._page.evaluate((GameStat) => {
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

  async getHeroes(): Promise<Hero[]> {
    return this._page.evaluate(
      (Heroes, HeroStat) => {
        const list: Hero[] = [];
        const items = document.querySelectorAll(
          'div#competitive select.dropdown-select-element option'
        );

        items.forEach((item) => {
          const id: string = item.getAttribute('value') || '';
          const name = item.innerHTML;
          const isHero = Object.values(Heroes).find(
            (hero) => hero === id && id !== Heroes.ALL_HEROES
          );
          if (isHero) {
            const hero = {
              id,
              name,
              src: `https://d1u1mce87gyfbn.cloudfront.net/game/heroes/small/${id}.png`,
              info: Object.values(HeroStat).map((dataId) => {
                const getHeroStats: HTMLInputElement | null =
                  document.querySelector(
                    `div#competitive div[data-category-id = '${id}']`
                  );
                if (getHeroStats) {
                  const data = Array.from(
                    getHeroStats.querySelectorAll(
                      `tr[data-stat-id = '${dataId}'] td`
                    ),
                    (col) => col.innerHTML
                  );
                  return {
                    name: data[0],
                    value: data[1]
                  };
                }
                return {
                  name: '',
                  value: ''
                };
              })
            };
            list.push(hero);
          }
        });
        return list;
      },
      Heroes,
      HeroStat
    );
  }
}
