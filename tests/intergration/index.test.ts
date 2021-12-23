import OverScrap from '../../src';

describe('Retrieve player data from the overwatch website', () => {
  test('Should get player "FusGaar"', async () => {
    const scrapPlayer = await OverScrap('FusGaar', '1912', 'pc');
    expect(scrapPlayer).toMatchSnapshot();
  });
});
