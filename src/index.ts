import puppeteer from 'puppeteer';

import { User, Rank, Hero, Info, HeroDetail } from './types';

const HERO_GAME_LOST = '0x0860000000000430';
const HERO_GAME_TOTAL = '0x0860000000000038';
const HERO_GAME_WON = '0x0860000000000039';
const HERO_TIME_PLAYED = '0x0860000000000021';
const HERO_WIN_PERCENTAGE = '0x08600000000003D1';

const COMP_TIME_PLAY = '0x0860000000000026';
const COMP_GAME_LOST = '0x086000000000042E';
const COMP_GAME_WON = '0x08600000000003F5';
const COMP_GAME_TOTAL = '0x0860000000000385';

const COMP_DATA_ARRAY = [
  COMP_TIME_PLAY,
  COMP_GAME_LOST,
  COMP_GAME_WON,
  COMP_GAME_TOTAL
];

const HERO_DATA_ARRAY = [
  HERO_TIME_PLAYED,
  HERO_GAME_TOTAL,
  HERO_WIN_PERCENTAGE
];

const OverScrap = async (
  username: string,
  hashtag: string,
  platform: string,
  test?: string
): Promise<User> => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  const url = `https://playoverwatch.com/en-us/career/${platform}/${username}-${hashtag}/`;

  if (test) {
    await page.setContent(test);
  } else {
    await page.goto(url);
  }

  // Get player SR by roles
  const ranks: Rank[] = await page.evaluate(() => {
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

  // Map all heroes with id
  const mapHeroes: HeroDetail[] = await page.evaluate(() => {
    const selects = Array.from(
      document.querySelectorAll('select[data-group-id = "stats"]')
    );
    const heroes = Array.from(selects[1].children, (option) => ({
      id: option.getAttribute('value'),
      name: option.innerHTML
    }));
    return heroes.filter((hero) => hero.id);
  });

  // Get top three most played heroes this season
  const topThree: Hero[] = await page.evaluate(
    (HERO_DATA_ARRAY, mapHeroes) => {
      return Array.from(
        document.querySelectorAll('div#competitive div.progress-category-item')
      )
        .slice(0, 3)
        .map((hero) => {
          const name = hero.querySelector<HTMLInputElement>(
            'div.ProgressBar-title'
          )?.innerText;
          const id = mapHeroes.find((hero: HeroDetail) => hero.name === name)
            ?.id;
          return {
            src: hero.querySelector<HTMLInputElement>('img.ProgressBar-thumb')
              ?.src,
            name,
            info: HERO_DATA_ARRAY.map((dataId: string) => {
              const getHeroStats: HTMLInputElement | null = document.querySelector(
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
                  detail: data[0],
                  value: data[1]
                };
              }
              return {
                detail: '',
                value: ''
              };
            })
          };
        });
    },
    HERO_DATA_ARRAY,
    mapHeroes
  );

  // Get competive time played time
  const info: Info[] = await page.evaluate((COMP_DATA_ARRAY) => {
    return COMP_DATA_ARRAY.map((dataId: string) => {
      const row = Array.from(
        document.querySelectorAll(`tr[data-stat-id = '${dataId}']`)
      );
      const data = Array.from(row[1].children, (td) => td.innerHTML);
      return {
        detail: data[0],
        value: data[1]
      };
    });
  }, COMP_DATA_ARRAY);

  await browser.close();

  return {
    username,
    hashtag,
    ranks,
    info,
    topThree,
    mapHeroes
  };
};

export default OverScrap;
