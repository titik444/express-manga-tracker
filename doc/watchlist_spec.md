# Watchlist API Specification

## Base URL

http://localhost:3000

## Create Watchlist

Endpoint :

- POST {{BASE_URL}}/api/watchlist/:slug

Request

- Header :

  Content-Type: application/json

  Authorization: Bearer {accessToken}

Response

- Success (200)

```json
{
  "message": "Watchlist created successfully",
  "data": {
    "id": "cmcj2e3ux0001tvhgzgfwtxt5",
    "userId": "cmc7wt7wq0000tv2clow2jinm",
    "title": "Dandadan",
    "slug": "dandadan",
    "url": "https://www.sailmg.com/content/dandadan",
    "thumb": "https://www.sailmg.com/sites/default/files/i422528.jpg",
    "latestChapterSlug": "dandadan-199",
    "createdAt": "2025-06-30T12:17:52.905Z",
    "updatedAt": "2025-06-30T12:17:52.905Z",
    "chapters": [
      {
        "id": "cmcj2e3ux0002tvhgu8qehkf1",
        "watchlistId": "cmcj2e3ux0001tvhgzgfwtxt5",
        "title": "Dandadan 199",
        "slug": "dandadan-199",
        "url": "https://www.sailmg.com/content/dandadan-199",
        "date": "2025-06-22T17:00:00.000Z"
      },
      {
        "id": "cmcj2e3ux0003tvhgv5b595mc",
        "watchlistId": "cmcj2e3ux0001tvhgzgfwtxt5",
        "title": "Dandadan 198",
        "slug": "dandadan-198",
        "url": "https://www.sailmg.com/content/dandadan-198",
        "date": "2025-06-15T17:00:00.000Z"
      }
    ]
  }
}
```

## List Watchlist

Endpoint :

- POST {{BASE_URL}}/api/watchlist/:slug

Request

- Header :

  Content-Type: application/json

  Authorization: Bearer {accessToken}

Query Params

- page (default 1)
- limit (default 20)
- q (optional)

Response

- Success (200)

```json
{
  "message": "Watchlist fetched successfully",
  "data": [
    {
      "id": "cmciy555n0001tvishpv4qb52",
      "title": "One Piece",
      "slug": "one-piece",
      "url": "https://www.sailmg.com/content/one-piece",
      "thumb": "https://www.sailmg.com/sites/default/files/opcover1108s_20240221183034.png",
      "createdAt": "2025-06-30T10:18:56.219Z",
      "updatedAt": "2025-06-30T12:11:49.347Z"
    },
    {
      "id": "cmcj27tbt000ltvh4c4r0p2vp",
      "title": "Sakamoto Days",
      "slug": "sakamoto-days",
      "url": "https://www.sailmg.com/content/sakamoto-days",
      "thumb": "https://www.sailmg.com/sites/default/files/20231225210538.png",
      "createdAt": "2025-06-30T12:12:59.321Z",
      "updatedAt": "2025-06-30T12:12:59.321Z"
    }
  ],
  "pagination": {
    "currentPage": 1,
    "perPage": 20,
    "totalPages": 1,
    "totalItems": 2
  }
}
```

## Delete Watchlist

Endpoint :

- DELETE {{BASE_URL}}/api/watchlist/:slug

Request

- Header :

  Content-Type: application/json

  Authorization: Bearer {accessToken}

Response

- Success (200)

```json
{
  "message": "Watchlist deleted successfully",
  "data": {
    "slug": "dandadan"
  }
}
```

## List Chapters Watchlist

Endpoint :

- GET {{BASE_URL}}/api/watchlist/chapter

Query Params

- page (default 1)
- limit (default 20)

Response

- Success (200)

```json
{
  "message": "Watchlist fetched and synced",
  "data": [
    {
      "id": "cmcj26bc30000tvh4839n33si",
      "watchlistId": "cmciy555n0001tvishpv4qb52",
      "title": "One Piece 1153",
      "slug": "one-piece-1153",
      "url": "https://www.sailmg.com/content/one-piece-1153",
      "date": "2025-06-25T17:00:00.000Z"
    },
    {
      "id": "cmcj27tbt000mtvh4bf40ellu",
      "watchlistId": "cmcj27tbt000ltvh4c4r0p2vp",
      "title": "Sakamoto Days 219",
      "slug": "sakamoto-days-219",
      "url": "https://www.sailmg.com/content/sakamoto-days-219",
      "date": "2025-06-25T17:00:00.000Z"
    }
  ],
  "pagination": {
    "currentPage": 1,
    "perPage": 2,
    "totalPages": 20,
    "totalItems": 40
  }
}
```