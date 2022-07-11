(function () {

    /*  =====================================
        Selector
        ===================================== */

    const Selector = {
        BODY: '.index__body',
        MAIN: '.index__main',
        HIDE_DEPENDENT_COUNTRIES_INPUT: '[data-element="index.hide-dependent-countries-input"]',
        SHOW_COUNTRY_NAMES_INPUT: '[data-element="index.show-country-names-input"]',
        SEARCH_INPUT: '[data-element="index.search-input"]',
        COUNTRY_ELEMENT: '.index__country'
    };



    /*  =====================================
        Attribute
        ===================================== */

    const Attribute = {
        COUNTRY_NAME: 'data-country-name',
        INDEPENDENT: 'data-independent'
    };



    /*  =====================================
        ClassName
        ===================================== */

    const ClassName = {
        SHOW_COUNTRY_NAMES: 'SHOW-COUNTRY-NAMES',
        SHOW_BODY: 'SHOW-BODY'
    };



    /*  =====================================
        Countries
        ===================================== */

    const countries = Array.from(document.querySelectorAll(Selector.COUNTRY_ELEMENT)).map(countryElement => {
        return {
            name: countryElement.getAttribute(Attribute.COUNTRY_NAME),
            independent: countryElement.getAttribute(Attribute.INDEPENDENT) === 'true' ? true : false,
            element: countryElement
        };
    });



    /*  =====================================
        Elements
        ===================================== */

    const body = document.querySelector(Selector.BODY);
    const main = document.querySelector(Selector.MAIN);
    const hideDependentCountriesInput = document.querySelector(Selector.HIDE_DEPENDENT_COUNTRIES_INPUT);
    const showCountryNamesInput = document.querySelector(Selector.SHOW_COUNTRY_NAMES_INPUT);
    const searchInput = document.querySelector(Selector.SEARCH_INPUT);



    /*  =====================================
        Events
        ===================================== */

    window.addEventListener('pageshow', filter);
    hideDependentCountriesInput.addEventListener('change', filter);
    showCountryNamesInput.addEventListener('change', filter);
    searchInput.addEventListener('input', debouncedFilter);



    /*  =====================================
        Filter
        ===================================== */

    function filter(event) {

        // Persisted?
        if (event?.persisted) {

            // On pageshow for persisted page, we don't need to
            // run the filter. This is typical in production, but
            // in development, pages are not persisted (because Piko
            // uses websockets).

            return;
        }

        // Filter values
        const hideDependentCountries = hideDependentCountriesInput.checked;
        const showCountryNames = showCountryNamesInput.checked;
        const searchQuery = searchInput.value.toLowerCase();

        // 1. Show Country Names
        if (showCountryNames) {
            main.classList.add(ClassName.SHOW_COUNTRY_NAMES);
        } else {
            main.classList.remove(ClassName.SHOW_COUNTRY_NAMES);
        }

        countries.forEach(country => {

            // 2. Search Match?
            if (!country.name.toLowerCase().includes(searchQuery)) {
                country.element.style.display = 'none';
                return;
            }

            // 3. Dependency Match?
            if (!country.independent && hideDependentCountries) {
                country.element.style.display = 'none';
                return;
            }

            country.element.style.display = '';
        });

        // 4. Show
        body.classList.add(ClassName.SHOW_BODY);
    }



    /*  =====================================
        Debounced Filter
        ===================================== */

    const decouncedFilterDelay = 400;
    let debouncedFilterTimeout = null;

    function debouncedFilter() {

        if (debouncedFilterTimeout) {
            clearTimeout(debouncedFilterTimeout);
        }

        debouncedFilterTimeout = setTimeout(filter, decouncedFilterDelay);
    }

})();
