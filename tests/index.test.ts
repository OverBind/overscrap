const player = { username: 'GorillaPunch' };

describe('Retrieve player data from the overwatch website', () => {
  test('Get Competive time played', () => {
    expect(player.username).toBe('GorillaPunch');
  });
});
