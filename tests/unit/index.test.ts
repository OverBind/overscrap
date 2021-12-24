import { OverScrap } from '../../src';

describe('Overscrap Class', () => {
  test('Should instantiate a new class object', async () => {
    const scrapPlayer = await OverScrap.build('FusGaar', '1912', 'pc');
    expect(scrapPlayer).toBeInstanceOf(OverScrap);
  });

  test('Should get player ranks', async () => {
    const scrapPlayer = await OverScrap.build('FusGaar', '1912', 'pc');
    const ranks = await scrapPlayer.getRanks();
    expect(ranks).toMatchSnapshot();
  });

  test('Should get player info', async () => {
    const scrapPlayer = await OverScrap.build('FusGaar', '1912', 'pc');
    const info = await scrapPlayer.getInfo();
    expect(info).toMatchSnapshot();
  });

  test('Should get player heroes', async () => {
    const scrapPlayer = await OverScrap.build('FusGaar', '1912', 'pc');
    const heroes = await scrapPlayer.getHeroes();
    expect(heroes).toMatchSnapshot();
  });
});
