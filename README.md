# OverScrap

Modern API to fetch player data from the official Overwatch website.

Using `typescript` and `puppeteer`.

## API

Create an instance
```typescript
const scrapPlayer = await OverScrap.build('FusGaar', '1912', 'pc');
```

Example on how to retrieve data
```typescript
const scrapPlayer = await OverScrap.build('FusGaar', '1912', 'pc');
const ranks = await scrapPlayer.getRanks();
```

## Contribute

At this current time the API is primitive at this point, so any issue or PRs are welcome.

No contribution rules has been set yet.
