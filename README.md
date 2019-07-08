# Beer List

Example: http://beer.chebykin.net

## Getting started

- npm install
- npm run start for development
- npm run build for production

## Nice to have in the near future

- Reset filters and go to the first page
- Add "favorite" functionality

## Nice to have in the punkApi

- "Get List" will return collection structure, this problem is described here https://github.com/samjbmason/punkapi-db/issues/44
`
    full-amount: 100,
    items: [...],
    page: 2,
    per_page: 10
`

- "Get List" and "Get Single Beer" will accept additional queries "with_fields": return objects with only listed fields.
  E.G.: Request with query "with_fields=name, description" will return [{id: 1, name: "beer_name", description: "beer_description"}, ...]
