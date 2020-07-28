import puppeteer from 'puppeteer';

import { User, Rank, Hero } from './types';

const HERO_GAME_LOST = '0x0860000000000430';
const HERO_GAME_WON = '0x0860000000000039';
const HERO_GAME_TOTAL = '0x0860000000000038';
const HERO_WIN_PERCENTAGE = '0x08600000000003D1';

const COMP_TIME_PLAY = '0x0860000000000026';
const COMP_GAME_LOST = '0x086000000000042E';
const COMP_GAME_WON = '0x08600000000003F5';
const COMP_GAME_TOTAL = '0x0860000000000385';

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

  // Get top three most played heroes this season
  const topThree: Hero[] = await page.evaluate(() => {
    return Array.from(
      document.querySelectorAll('div#competitive div.progress-category-item')
    )
      .slice(0, 3)
      .map((hero) => ({
        src: hero.querySelector<HTMLInputElement>('img.ProgressBar-thumb')?.src,
        name: hero.querySelector<HTMLInputElement>('div.ProgressBar-title')
          ?.innerText,
        timePlayed: hero.querySelector<HTMLInputElement>(
          'div.ProgressBar-description'
        )?.innerText
      }));
  });

  // Get competive time played time
  const compTime: string[] = await page.evaluate((COMP_TIME_PLAY) => {
    const row = Array.from(
      document.querySelectorAll(`tr[data-stat-id = '${COMP_TIME_PLAY}']`)
    );
    return Array.from(row[1].children, (td) => td.innerHTML);
  }, COMP_TIME_PLAY);

  await browser.close();

  return {
    username,
    hashtag,
    compTime,
    ranks,
    games: [],
    topThree
  };
};

export default OverScrap;

// Get Time played (Comp)
/*
Array.from(
  Array.from(document.querySelectorAll("div#competitive tr.DataTable-tableRow"))
    .find(row => row.getAttribute('data-stat-id') === "0x0860000000000026")
    .querySelectorAll("td.DataTable-tableColumn")
)
  .map(col => col.innerText)
*/

// Get games lost
/*
  Array.from(
    Array.from(document.querySelectorAll("div#competitive tr.DataTable-tableRow"))
      .find(row => row.getAttribute('data-stat-id') === "0x086000000000042E")
      .querySelectorAll("td.DataTable-tableColumn")
  )
    .map(col => col.innerText)
*/

// Get games won
/*
  Array.from(
    Array.from(document.querySelectorAll("div#competitive tr.DataTable-tableRow"))
      .find(row => row.getAttribute('data-stat-id') === "0x08600000000003F5")
      .querySelectorAll("td.DataTable-tableColumn")
  )
    .map(col => col.innerText)
*/

// Get total games
/*
  Array.from(
    Array.from(document.querySelectorAll("div#competitive tr.DataTable-tableRow"))
      .find(row => row.getAttribute('data-stat-id') === "0x0860000000000385")
      .querySelectorAll("td.DataTable-tableColumn")
  )
    .map(col => col.innerText)
*/

// Get all heroes with id
/*
Array.from(
  Array.from(document.querySelectorAll("div#competitive select.dropdown-select-element"))[1].querySelectorAll("option"))
  .map(hero => ({
    id: hero.value,
    name: hero.innerText
  })
)
*/

// Get the hero stats
/*
  data-category-id === hero (in this case its sigma)
  data-stat-id === select stat (in this case its game lost)
  all the data-stat-id:
  - 0x0860000000000430 === Games Lost
  - 0x0860000000000038 === Games Played
  - 0x0860000000000039 === Games Won
  - 0x08600000000003D1 === Win Percentage

  use the array from all heroes to find the hero id
  then change the function below so its dynamic
  make an array with the stats above
  and loop around each id 

  Array.from(
    document.querySelector("div#competitive div[data-category-id = '0x02E000000000023B']")
    .querySelectorAll("tr[data-stat-id = '0x0860000000000430'] td")
  ).map(col => col.innerText)
*/

// Puppeteer
/*
(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto('https://www.google.co.uk/');
  await page.screenshot({ path: 'example.png' });

  await browser.close();
})();
*/

// Get sr data for each role
/*
  Array.from(document.querySelectorAll("div.masthead-player div.competitive-rank-role")).map(rank => ({
    src: rank.querySelector("img.competitive-rank-tier-icon").src,
    role: rank.querySelector("span.ow-Tooltip").innerText,
    sr: rank.querySelector("div.competitive-rank-level").innerText
  }))
*/

// Get top 3 heroes
/*
Array.from(document.querySelectorAll("div#competitive div.progress-category-item"))
  .slice(0, 3)
  .map(hero => ({
    src: hero.querySelector("img.ProgressBar-thumb").src,
    name: hero.querySelector("div.ProgressBar-title").innerText,
    timePlayed: hero.querySelector("div.ProgressBar-description").innerText
  })
)
*/
