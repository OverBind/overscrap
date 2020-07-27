import { User } from '../../src/types';

export const GorillaPunch: User = {
  username: 'GorillaPunch',
  hashtag: '21397',
  compTime: '05:02:36',
  ranks: [
    {
      src: '',
      role: 'Tank',
      sr: '3227'
    }
  ],
  games: [
    {
      info: 'Games Lost',
      value: '13'
    },
    {
      info: 'Games Played',
      value: '26'
    },
    {
      info: 'Games Won',
      value: '12'
    }
  ],
  topThree: [
    {
      src:
        'https://d1u1mce87gyfbn.cloudfront.net/game/heroes/small/0x02E000000000023B.png',
      name: 'Sigma',
      timePlayed: '01:51:14',
      games: [
        {
          info: 'Games Played',
          value: '13'
        },
        {
          info: 'Win Percentage',
          value: '69%'
        }
      ]
    },
    {
      src:
        'https://d1u1mce87gyfbn.cloudfront.net/game/heroes/small/0x02E0000000000009.png',
      name: 'Winston',
      timePlayed: '01:01:08',
      games: [
        {
          info: 'Games Played',
          value: '5'
        },
        {
          info: 'Win Percentage',
          value: '37%'
        }
      ]
    },
    {
      src:
        'https://d1u1mce87gyfbn.cloudfront.net/game/heroes/small/0x02E0000000000007.png',
      name: 'Reinhardt',
      timePlayed: '35:38',
      games: [
        {
          info: 'Games Played',
          value: '3'
        },
        {
          info: 'Win Percentage',
          value: '41%'
        }
      ]
    }
  ]
};
