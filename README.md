# OverScrap

Modern API to fetch player data from the official Overwatch website.

Using `typescript` and `puppeteer`.

## API

Example
```typescript
const scrapPlayer = await OverScrap('username', 'tag', 'platform');
```
Result
```snap
Object {
  "username": "FusGaar",
  "hashtag": "1912",
  "heroes": Array [
    Object {
      "id": "0x02E000000000007A",
      "info": Array [
        Object {
          "name": "Games Lost",
          "value": "4",
        },
        Object {
          "name": "Games Played",
          "value": "10",
        },
        Object {
          "name": "Games Won",
          "value": "5",
        },
        Object {
          "name": "Time Played",
          "value": "01:35:53",
        },
        Object {
          "name": "Win Percentage",
          "value": "54%",
        },
      ],
      "name": "D.Va",
      "src": "https://d1u1mce87gyfbn.cloudfront.net/game/heroes/small/0x02E000000000007A.png",
    }
  ],
  "info": Array [
    Object {
      "name": "Time Played",
      "value": "16:25:18",
    },
    Object {
      "name": "Games Lost",
      "value": "43",
    },
    Object {
      "name": "Games Won",
      "value": "45",
    },
    Object {
      "name": "Games Played",
      "value": "89",
    },
  ],
  "ranks": Array [
    Object {
      "role": "Tank",
      "sr": "2918",
      "src": "https://d1u1mce87gyfbn.cloudfront.net/game/rank-icons/rank-PlatinumTier.png",
    },
  ],
}
```

## Contribute

At this current time the API is primitive at this point, so any issue or PRs are welcome.

No contribution rules has been set yet.
