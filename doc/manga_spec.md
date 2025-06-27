# Manga API Specification

## Base URL

http://localhost:3000

## Get Lastest Updates

Endpoint :

- GET {{BASE_URL}}/api/manga/latest-updates

Response

- Success (200)

```json
{
  "message": "Get latest updates success",
  "data": [
    {
      "title": "The New Gate",
      "slug": "new-gate",
      "url": "https://www.sailmg.com/content/new-gate",
      "thumb": "https://www.sailmg.com/sites/default/files/manga/cover/20160703201324597.jpg?itok=DOdQMK91",
      "chapters": [
        {
          "title": "The New Gate 114",
          "url": "https://www.sailmg.com/content/new-gate-114"
        }
      ],
      "latestChapter": {
        "title": "The New Gate 114",
        "url": "https://www.sailmg.com/content/new-gate-114"
      }
    },
    {
      "title": "The Reborn Young Lord Is an Assassin",
      "slug": "reborn-young-lord-assassin",
      "url": "https://www.sailmg.com/content/reborn-young-lord-assassin",
      "thumb": "https://www.sailmg.com/sites/default/files/i443393.jpg?itok=zjIMDccp",
      "chapters": [
        {
          "title": "The Reborn Young Lord Is An Assassin 80",
          "url": "https://www.sailmg.com/content/reborn-young-lord-assassin-80"
        },
        {
          "title": "The Reborn Young Lord Is An Assassin 79",
          "url": "https://www.sailmg.com/content/reborn-young-lord-assassin-79"
        }
      ],
      "latestChapter": {
        "title": "The Reborn Young Lord Is An Assassin 80",
        "url": "https://www.sailmg.com/content/reborn-young-lord-assassin-80"
      }
    }
  ]
}
```

## Get Most Popular

Endpoint :

- GET {{BASE_URL}}/api/manga/most-popular

Response

- Success (200)

```json
{
  "message": "Get most popular success",
  "data": [
    {
      "title": "One Piece",
      "slug": "one-piece",
      "url": "https://www.sailmg.com/content/one-piece",
      "thumb": "https://www.sailmg.com/sites/default/files/opcover1108s_20240221183034.png?itok=ubwjWhfZ",
      "latestChapter": {
        "title": "One Piece 1152",
        "url": "https://www.sailmg.com/content/one-piece-1152"
      }
    },
    {
      "title": "Solo Leveling Manhwa",
      "slug": "solo-leveling-manhwa",
      "url": "https://www.sailmg.com/content/solo-leveling-manhwa",
      "thumb": "https://www.sailmg.com/sites/default/files/coversmall_200x0.png?itok=aLP3jYwb",
      "latestChapter": {
        "title": "SOLO LEVELING 201",
        "url": "https://www.sailmg.com/content/solo-leveling-201"
      }
    }
  ]
}
```

## Get New Manga

Endpoint :

- GET {{BASE_URL}}/api/manga/new-manga

Response

- Success (200)

```json
{
  "message": "Get new manga success",
  "data": [
    {
      "title": "Gunnou Kyoushitsu",
      "slug": "gunnou-kyoushitsu",
      "url": "https://www.sailmg.com/content/gunnou-kyoushitsu",
      "thumb": "https://www.sailmg.com/sites/default/files/20250620143018.png?itok=uFMIcVWD",
      "latestChapter": {
        "title": "Gunnou Kyoushitsu 1",
        "url": "https://www.sailmg.com/content/gunnou-kyoushitsu-1"
      }
    },
    {
      "title": "Harukaze Mound",
      "slug": "harukaze-mound",
      "url": "https://www.sailmg.com/content/harukaze-mound",
      "thumb": "https://www.sailmg.com/sites/default/files/i490854.jpg?itok=VdKaUL-X",
      "latestChapter": {
        "title": "Harukaze Mound 1",
        "url": "https://www.sailmg.com/content/harukaze-mound-1"
      }
    }
  ]
}
```

## Get Genres

Endpoint :

- GET {{BASE_URL}}/api/manga/genres

Response

- Success (200)

```json
{
  "message": "Get genres success",
  "data": [
    {
      "name": "Action",
      "slug": "action",
      "url": "/api/genres/action"
    },
    {
      "name": "Adventure",
      "slug": "adventure",
      "url": "/api/genres/adventure"
    }
  ]
}
```

## Get Manga By Genre

Endpoint :

- GET {{BASE_URL}}/api/manga/genres/:genre

Query Params

- page (default 1)

Response

- Success (200)

```json
{
  "message": "Get manga by genre adventure success",
  "data": [
    {
      "title": "Solo Leveling: Ragnarok",
      "slug": "solo-leveling-ragnarok",
      "url": "https://www.sailmg.com/content/solo-leveling-ragnarok",
      "thumb": "https://www.sailmg.com/sites/default/files/%E5%BE%AE%E4%BF%A1%E6%88%AA%E5%9B%BE_20240731230126.png?itok=GZGFjFF-",
      "description": "[By Redice studio that brought you !] The Earth's existence is under threat once more as Itarim, the gods of other universes, seek to fill the void left by the Absolute Being. Sung Jinwoo has no choice but to send Beru, the shadow ant king, to awaken his son's powers and start him on the journey he once took. Suho must conquer the shadow dungeon and earn his place in the world of hunters as he navigates through a new world against a new evil looking to swallow the world whole."
    },
    {
      "title": "The Indomitable Martial King",
      "slug": "indomitable-martial-king",
      "url": "https://www.sailmg.com/content/indomitable-martial-king",
      "thumb": "https://www.sailmg.com/sites/default/files/20240401112800.png?itok=fTq_IXnb",
      "description": "A world where humans sell and buy otherworldly species as slaves. The great mage Rifenhardt is treated like the Demon King for helping the otherworldly species. A party of heroes arrive to bring down the Demon King! Rifenhardt succeeds in greatly injuring the heroes, but he faces death at the hands of the MARTIAL KING??! Tesslon… \"Time and Space Regression Spell.\" However, he miraculously manages to cast this last-resort spell and regresses to the past. But… \"I became the MARTIAL KING??!"
    }
  ],
  "pagination": {
    "currentPage": 1,
    "perPage": 10,
    "totalPages": 34
  }
}
```