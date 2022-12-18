(function () {

    /*  =====================================
        Selector
        ===================================== */

    const Selector = {
        BODY: '.index__body',
        MAIN: '.index__main',
        SHOW_DEPENDENT_COUNTRIES_INPUT: '[data-element="index.show-dependent-countries-input"]',
        HIDE_COUNTRY_NAMES_INPUT: '[data-element="index.hide-country-names-input"]',
        SEARCH_INPUT: '[data-element="index.search-input"]',
        SEARCH_INPUT_CLEAR_BUTTON: '[data-element="index.search-input-clear-button"]',
        COUNTRY_ELEMENT: '.index__country'
    };



    /*  =====================================
        Attribute
        ===================================== */

    const Attribute = {
        COUNTRY_NAME: 'data-country-name',
        CONTINENT: 'data-continent',
        INDEPENDENT: 'data-independent'
    };



    /*  =====================================
        ClassName
        ===================================== */

    const ClassName = {
        HIDE_COUNTRY_NAMES: 'HIDE-COUNTRY-NAMES',
        SHOW_BODY: 'SHOW-BODY'
    };



    /*  =====================================
        Countries
        ===================================== */

    const countries = Array.from(document.querySelectorAll(Selector.COUNTRY_ELEMENT)).map(countryElement => {
        return {
            name: countryElement.getAttribute(Attribute.COUNTRY_NAME),
            continent: countryElement.getAttribute(Attribute.CONTINENT),
            independent: countryElement.getAttribute(Attribute.INDEPENDENT) === 'true' ? true : false,
            element: countryElement
        };
    });



    /*  =====================================
        Elements
        ===================================== */

    const body = document.querySelector(Selector.BODY);
    const main = document.querySelector(Selector.MAIN);
    const showDependentCountriesInput = document.querySelector(Selector.SHOW_DEPENDENT_COUNTRIES_INPUT);
    const hideCountryNamesInput = document.querySelector(Selector.HIDE_COUNTRY_NAMES_INPUT);
    const searchInput = document.querySelector(Selector.SEARCH_INPUT);
    const searchInputClearButton = document.querySelector(Selector.SEARCH_INPUT_CLEAR_BUTTON);



    /*  =====================================
        Events
        ===================================== */

    window.addEventListener('pageshow', filter);
    showDependentCountriesInput.addEventListener('change', filter);
    hideCountryNamesInput.addEventListener('change', filter);
    searchInput.addEventListener('keydown', searchInputKeyDown);
    searchInput.addEventListener('input', searchInputChange);
    searchInputClearButton.addEventListener('click', clearSearchInput);



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

            // Foucs search input if has value.

            if (searchInput.value !== '') {
                searchInput.focus();
            }

            return;
        }

        // Filter values
        const showDependentCountries = showDependentCountriesInput.checked;
        const hideCountryNames = hideCountryNamesInput.checked;
        const searchString = searchInput.value.trim().toLowerCase();


        requestAnimationFrame(() => {

            // 1. Hide Country Names
            if (hideCountryNames) {
                main.classList.add(ClassName.HIDE_COUNTRY_NAMES);
            } else {
                main.classList.remove(ClassName.HIDE_COUNTRY_NAMES);
            }

            // Extract Search Parts
            const searchParts = searchString.split(' ');

            for (const country of countries) {

                // 2. Search Match (Inclusive)
                let searchMatch = false;
                for (const searchPart of searchParts) {
                    if (country.name.toLowerCase().includes(searchPart) || country.continent.toLowerCase().includes(searchPart)) {
                        searchMatch = true;
                        break;
                    }
                }
                if (!searchMatch) {
                    country.element.style.display = 'none';
                    continue;
                }

                // 3. Dependent Match?
                if (!country.independent && !showDependentCountries) {
                    country.element.style.display = 'none';
                    continue;
                }

                country.element.style.display = '';
            }

            // 4. Show
            body.classList.add(ClassName.SHOW_BODY);

        });
    }



    /*  =====================================
        Search Input Key Down
        ===================================== */

    function searchInputKeyDown(event) {
        if (event.key === 'Enter') {
            event.preventDefault();
        }
    }



    /*  =====================================
        Search Input Change
        ===================================== */

    const searchInputDelay = 400;
    let searchInputTimeout = null;

    function searchInputChange() {

        if (searchInputTimeout) {
            clearTimeout(searchInputTimeout);
        }

        searchInputTimeout = setTimeout(filter, searchInputDelay);
    }


    /*  =====================================
        Clear Search Input
        ===================================== */

    function clearSearchInput() {
        searchInput.value = '';
        searchInput.focus();
        filter();
    }

})();
