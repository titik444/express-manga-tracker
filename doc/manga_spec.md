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

- GET {{BASE_URL}}/api/manga/genre

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

- GET {{BASE_URL}}/api/manga/genre/:genre

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

## Get Manga By Search

Endpoint :

- GET {{BASE_URL}}/api/manga/search

Query Params

- page (default 1)
- q (required)

Response

- Success (200)

```json
{
	"message": "Search results for 'one'",
	"data": [
		{
			"title": "One Piece",
			"slug": "one-piece",
			"url": "https://www.sailmg.com/content/one-piece"
		},
		{
			"title": "Onepunch-Man (ONE)",
			"slug": "onepunch-man-one",
			"url": "https://www.sailmg.com/content/onepunch-man-one"
		},
		{
			"title": "Goblin Slayer: Side Story Year One",
			"slug": "goblin-slayer-side-story-year-one",
			"url": "https://www.sailmg.com/content/goblin-slayer-side-story-year-one"
		},
		{
			"title": "Urek Mazino",
			"slug": "urek-mazino",
			"url": "https://www.sailmg.com/content/urek-mazino"
		},
		{
			"title": "Shangri-La Frontier ~ Kusoge Hunter, Kamige Ni Idoman To Su~",
			"slug": "shangri-la-frontier-kusoge-hunter-kamige-ni-idoman-su",
			"url": "https://www.sailmg.com/content/shangri-la-frontier-kusoge-hunter-kamige-ni-idoman-su"
		},
		{
			"title": "One Piece Novel: Heroines",
			"slug": "one-piece-novel-heroines",
			"url": "https://www.sailmg.com/content/one-piece-novel-heroines"
		},
		{
			"title": "Legend of the Northern Blade",
			"slug": "legend-northern-blade",
			"url": "https://www.sailmg.com/content/legend-northern-blade"
		},
		{
			"title": "Onepunch-Man Manga",
			"slug": "onepunch-man-manga",
			"url": "https://www.sailmg.com/content/onepunch-man-manga"
		},
		{
			"title": "The Indomitable Martial King",
			"slug": "indomitable-martial-king",
			"url": "https://www.sailmg.com/content/indomitable-martial-king"
		},
		{
			"title": "The Strongest Wizard Becomes a Countryside Guardsman After Taking an Arrow to the Knee",
			"slug": "strongest-wizard-becomes-countryside-guardsman-after-taking-arrow-knee",
			"url": "https://www.sailmg.com/content/strongest-wizard-becomes-countryside-guardsman-after-taking-arrow-knee"
		}
	],
	"pagination": {
		"currentPage": 1,
		"perPage": 10,
		"totalPages": 27
	}
}
```

## Get Chapter By Slug

Endpoint :

- GET {{BASE_URL}}/api/manga/:manga/chapter

Response

- Success (200)

```json
{
	"message": "Chapters fetched successfully",
	"data": {
		"title": "Naruto",
		"slug": "naruto",
		"url": "https://www.sailmg.com/content/naruto",
		"thumb": "https://www.sailmg.com/sites/default/files/manga/cover/20160630053328616.jpg",
		"chapters": [
			{
				"slug": "minato-one-shot-manga-naruto-gaiden-%E2%80%93-whirlwind-inside-vortex-0",
				"title": "Minato One Shot Manga -Naruto Gaiden – The Whirlwind inside the Vortex 0",
				"url": "https://www.sailmg.com/content/minato-one-shot-manga-naruto-gaiden-%E2%80%93-whirlwind-inside-vortex-0",
				"date": "14 Jul 2023"
			},
			{
				"slug": "naruto-7005",
				"title": "Naruto 700.5",
				"url": "https://www.sailmg.com/content/naruto-7005",
				"date": "25 May 2022"
			}
		]
	}
}
```