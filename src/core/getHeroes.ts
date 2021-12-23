import puppeteer from 'puppeteer';
import { Hero } from '../types';
import { HeroID, HeroStat } from '../enums';

export async function getHeroes(page: puppeteer.Page): Promise<Hero[]> {
  return page.evaluate(
    (HeroID, HeroStat) => {
      const list: Hero[] = [];
      const items = document.querySelectorAll(
        'div#competitive select.dropdown-select-element option'
      );

      items.forEach((item) => {
        const id: string = item.getAttribute('value') || '';
        const name = item.innerHTML;
        const isHero = Object.values(HeroID).find(
          (heroID) => heroID === id && id !== HeroID.ALL_HEROES
        );
        if (isHero) {
          const hero = {
            id,
            name,
            src: `https://d1u1mce87gyfbn.cloudfront.net/game/heroes/small/${id}.png`,
            info: Object.values(HeroStat).map(
              (dataId) => {
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
              }
            )
          };
          list.push(hero);
        }
      });
      return list;
    },
    HeroID,
    HeroStat
  );
}
