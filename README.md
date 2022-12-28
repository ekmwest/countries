# Countries

This is a public read-only database of all countries that are officially assigned by the [ISO 3166-1](https://en.wikipedia.org/wiki/ISO_3166-1) standard.


## Accessing the database

A `json` version of the database can be fetched from:

```
https://countries.ekmwest.io/countries.json
```

It can also be imported as a javascript array:

```js
import { countries } from "https://countries.ekmwest.io/countries.js";
```


## Schema

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


## Browsing the database

A browser-friendly version of the database is avaiable at: [https://countries.ekmwest.io](https://countries.ekmwest.io)


## Flags and Maps

There's a flag for each country, for example:

```
https://countries.ekmwest.io/flags/af.svg
```

Each country also has a blind map, for example:

```
https://countries.ekmwest.io/maps/et.svg
```

A blind world map can be found at:

```
https://countries.ekmwest.io/maps/world.svg
```

## Contributing

This is a pet project. Don't expect pull requests to be accepted, but feel free to share, fork & steal. ❤️