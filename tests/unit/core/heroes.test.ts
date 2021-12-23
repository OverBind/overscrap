/**
 * @jest-environment jsdom
 */
import { setupTest } from '../../helper/setupTest';
import { getHeroes } from '../../../src/core/getHeroes';

describe('Get Heroes', () => {
  test('Should get heroes data', async () => {
    const page = await setupTest();

    const data = await getHeroes(page);

    expect(data).toBeTruthy();
    expect(data).toMatchSnapshot();
  });
});
