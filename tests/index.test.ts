import fs from 'fs';
import path from 'path';

import OverScrap from '../src';

import { GorillaPunch } from './mocks';

describe('Retrieve player data from the overwatch website', () => {
  test('Should get player "GorillaPunch"', async () => {
    const GorillaPunchHtml = fs.readFileSync(
      path.resolve(__dirname, './mocks/html/GorillaPunch.html'),
      'utf8'
    );
    const scrapPlayer = await OverScrap(
      'GorillaPunch',
      '21397',
      'pc',
      GorillaPunchHtml
    );
    console.log(scrapPlayer);
    expect(scrapPlayer).toMatchObject(GorillaPunch);
  });
});
