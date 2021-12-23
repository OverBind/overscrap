import puppeteer from 'puppeteer';
import fs from 'fs';
import path from 'path';
import { User } from './types';
import { getHeroes, getInfo, getRanks } from './core';

/**
 * Retrieve the data from the overwatch website
 *
 * @remarks
 * Using puppeter
 *
 * @param username - username of the player in game
 * @param hashtag - hashtag of the player in game
 * @param platform - the platform the player plays on (eg: pc, xbox, ect..)
 *
 * @returns User type object
 */
const OverScrap = async (
  username: string,
  hashtag: string,
  platform: string
): Promise<User> => {
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

  const ranks = await getRanks(page);
  const info = await getInfo(page);
  const heroes = await getHeroes(page);

  await browser.close();

  return {
    username,
    hashtag,
    ranks,
    info,
    heroes
  };
};

export default OverScrap;
