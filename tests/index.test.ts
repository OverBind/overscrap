import OverScrap from '../src';

import { GorillaPunch } from './mocks';

describe('Retrieve player data from the overwatch website', () => {
  test('Should get player "GorillaPunch"', () => {
    expect(OverScrap('GorillaPunch', '21397', 'pc')).toBe(GorillaPunch);
  });
});
