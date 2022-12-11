# Countries

A public read-only database of countries defined by [ISO 3166-1](https://en.wikipedia.org/wiki/ISO_3166-1).

*(As of Nov 2022, the database includes Kosovo, assigned with [country code XK](https://en.wikipedia.org/wiki/XK_(user_assigned_code)), expected to be issued by the UN Terminology Bulletin.)*


## Using the database

The database can be accessed in `json` format at:

```
https://countries.ekmwest.io/countries.json
```

The database can also be imported as a javascript array:

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

Example (in json format):

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
