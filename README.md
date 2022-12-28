# Countries

A public read-only database of countries that are officially assigned by the [ISO 3166-1](https://en.wikipedia.org/wiki/ISO_3166-1) standard.


## Accessing the database

The database can be accessed in `json` format from:

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


## Country Flags

The flag for each country is available at:

```
https://countries.ekmwest.io/flags/{code}.svg
```

Note that `{code}` must be lower case, for example:

```
https://countries.ekmwest.io/flags/au.svg
```


## Blind Maps

A blind map for each country is available at:

```
https://countries.ekmwest.io/maps/{code}.svg
```

Note that `{code}` must be lower case, for example:

```
https://countries.ekmwest.io/maps/br.svg
```