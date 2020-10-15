import fs from 'fs';
import path from 'path';
import OverScrap from '../src';
import { GorillaPunch } from './mocks/users';

describe('Retrieve player data from the overwatch website', () => {
  test('Should get player "GorillaPunch"', async () => {
    const html = fs.readFileSync(
      path.resolve(__dirname, './mocks/html/GorillaPunch.html'),
      'utf8'
    );
    const scrapPlayer = await OverScrap('GorillaPunch', '21397', 'pc', html);
    expect(scrapPlayer).toStrictEqual(GorillaPunch);
  });
  test('Should get player "FusGaar"', async () => {
    const html = fs.readFileSync(
      path.resolve(__dirname, './mocks/html/FusGaar.html'),
      'utf8'
    );
    const scrapPlayer = await OverScrap('FusGaar', '1912', 'pc', html);
    expect(scrapPlayer).toMatchSnapshot();
  });
  test('Should get player "Punk"', async () => {
    const html = fs.readFileSync(
      path.resolve(__dirname, './mocks/html/Punk.html'),
      'utf8'
    );
    const scrapPlayer = await OverScrap('Punk', '11600', 'pc', html);
    expect(scrapPlayer).toMatchSnapshot();
  });
});
