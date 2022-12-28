# Countries

A public read-only database of countries officially assigned in [ISO 3166-1](https://en.wikipedia.org/wiki/ISO_3166-1).


## Using the database

The database can be accessed in `json` from:

```
https://countries.ekmwest.io/countries.json
```

It can also be imported as a javascript array from:

```js
import { countries } from "https://countries.ekmwest.io/countries.js";
```


## Browsing the database

The database can be browsed at: [https://countries.ekmwest.io](https://countries.ekmwest.io)


## Database schema

Each record (country) has the following shape:

```ts
{
    code: string,
    name: string,
    common_name: string,
    capital: string,
    continent: string,
    independent: boolean,
    flag_url: string,
    map_url: string
}
```

Example:

```json
{
    "code": "SE",
    "name": "Kingdom of Sweden",
    "common_name": "Sweden",
    "capital": "Stockholm",
    "independent": true,
    "continent": "Europe",
    "flag_url": "https://countries.ekmwest.io/flags/se.svg",
    "map_url": "https://countries.ekmwest.io/maps/se.svg"
}
```
