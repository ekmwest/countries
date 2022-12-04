import { DB, path } from "./deps.js";

const rootPath = Deno.cwd();
const sourcePath = path.join(rootPath, 'src');
const includesPath = path.join(sourcePath, '_includes');
const countryFoldersPath = path.join(sourcePath, 'countries');
const flagsDataPath = path.join(rootPath, 'data/flags');
const flagsSourcePath = path.join(sourcePath, 'flags');
const mapsSourcePath = path.join(sourcePath, 'maps');

const jsonDataFile = path.join(sourcePath, 'countries.json');
const jsDataFile = path.join(sourcePath, 'countries.js');

const flagUrl = code => `https://countries.ekmwest.io/flags/${code.toLowerCase()}.svg`;
const mapUrl = code => `https://countries.ekmwest.io/maps/${code.toLowerCase()}.svg`;

const mapViewBox = continent => {
    switch (continent.toLowerCase()) {
        case 'africa':
            return '1100 340 600 680';
        case 'asia':
            return '1490 240 900 580';
        case 'europe':
            return '1170 90 450 320';
        case 'north america':
            return '420 120 550 600';
        case 'oceania':
            return '2000 500 1000 700';
        case 'south america':
            return '600 550 500 680';
        default:
            return '0 0 2754 1398';
    }
}

export async function build() {
    const countries = await createCountriesFromDB();
    await makeCountriesInclude(countries);
    await makeContryFolders(countries);
    await copyFlagsFromDataToSource();
    await makeMapFiles(countries);
    await buildDataFiles(countries);
}

async function createCountriesFromDB() {
    const countries = [];

    const db = new DB('data/countries.db');

    for (const [code, name, common_name, capital, independent, continent] of db.query("SELECT code, name, common_name, capital, independent, continent FROM countries ORDER BY common_name")) {

        countries.push({
            code,
            name,
            common_name,
            capital,
            independent: independent ? true : false,
            continent,
            flag_url: flagUrl(code),
            map_url: mapUrl(code)
        });
    }

    db.close();

    return countries;
}

async function makeCountriesInclude(countries) {
    const htmlElements = [];

    for (const country of countries) {
        htmlElements.push(`
            <a class="index__country" href="/countries/${country.code.toLowerCase()}/" data-country-name="${country.common_name}" data-independent="${country.independent ? 'true' : 'false'}">
                <img class="index__flag" src="/flags/${country.code.toLowerCase()}.svg" alt="${country.common_name}" />
                <span class="index__name">${country.common_name}</span>
            </a>`);
    }

    const html = htmlElements.join('');

    await Deno.writeTextFile(path.join(includesPath, "countries.html"), html);
}

async function makeContryFolders(countries) {
    try {
        await Deno.remove(countryFoldersPath, { recursive: true });
    } catch (ex) { }

    await Deno.mkdir(countryFoldersPath);

    for await (const country of countries) {
        const countryFileContent = createCountryFileContent(country);

        const countryFolderPath = path.join(countryFoldersPath, country.code.toLowerCase());
        const countryFilePath = path.join(countryFolderPath, 'index.html');

        await Deno.mkdir(countryFolderPath);
        await Deno.writeTextFile(countryFilePath, countryFileContent, { recursive: true });
    }
}

async function copyFlagsFromDataToSource() {
    try {
        await Deno.remove(flagsSourcePath, { recursive: true });
    } catch (ex) { }

    await Deno.mkdir(flagsSourcePath);

    for await (const dirEntry of Deno.readDir(flagsDataPath)) {
        const sourceFlagPath = path.join(flagsSourcePath, dirEntry.name);
        const dataFlagPath = path.join(flagsDataPath, dirEntry.name);
        await Deno.copyFile(dataFlagPath, sourceFlagPath);
    }
}

async function makeMapFiles(countries) {
    try {
        await Deno.remove(mapsSourcePath, { recursive: true });
    } catch (ex) { }

    await Deno.mkdir(mapsSourcePath);

    for await (const country of countries) {
        const mapPath = path.join(mapsSourcePath, country.code.toLowerCase() + '.svg');
        const mapContent = createMapContent(country);
        await Deno.writeTextFile(mapPath, mapContent);
    }
}

async function buildDataFiles(countries) {
    await Deno.writeTextFile(jsDataFile, 'export let countries = ' + JSON.stringify(countries, null, 4) + ';');
    await Deno.writeTextFile(jsonDataFile, JSON.stringify(countries, null, 4));
}

function createCountryFileContent(country) {
    return `---
title: ${country.common_name}
layout: country.html
---

<img class="country__flag" src="/flags/${country.code.toLowerCase()}.svg">
<h1 class="country__name">${country.common_name}</h1>
<div class="country__data">
    <div class="country__data-item">
        <div class="country__data-label">Official Name</div>
        <div class="country__data-value">${country.name}</div>
    </div>
    <div class="country__data-item">
        <div class="country__data-label">Capital</div>
        <div class="country__data-value">${country.capital ? country.capital : '-'}</div>
    </div>
    <div class="country__data-item">
        <div class="country__data-label">Continent</div>
        <div class="country__data-value">${country.continent ? country.continent : '-'}</div>
    </div>
    <div class="country__data-item">
        <div class="country__data-label">Independent</div>
        <div class="country__data-value">${country.independent ? 'Yes' : 'No'}</div>
    </div>
    <div class="country__data-item">
        <div class="country__data-label">Country Code</div>
        <div class="country__data-value">${country.code}</div>
    </div>
</div>
<img class="country__map" src="/maps/${country.code.toLowerCase()}.svg">`

}

function createMapContent(country) {
    return `<!-- map.svg, { viewBox: "${mapViewBox(country.continent)}", code: "${country.code.toLowerCase()}" } -->`;
}
