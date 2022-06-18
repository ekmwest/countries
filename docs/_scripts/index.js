(function () {

    /*  =====================================
        Selector
        ===================================== */

    const Selector = {
        SEARCH_INPUT: '[data-element="index.search-input"]',
        INDEPENDENT_INPUT: '[data-element="index.independent-input"]',
        DEPENDENT_INPUT: '[data-element="index.dependent-input"]',
        NAME_INPUT: '[data-element="index.name-input"]',
        MAIN: '.index__main',
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
        HIDE_NAME: 'HIDE-NAME'
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

    const searchInput = document.querySelector(Selector.SEARCH_INPUT);
    const independentInput = document.querySelector(Selector.INDEPENDENT_INPUT);
    const dependentInput = document.querySelector(Selector.DEPENDENT_INPUT);
    const nameInput = document.querySelector(Selector.NAME_INPUT);
    const main = document.querySelector(Selector.MAIN);



    /*  =====================================
        Events
        ===================================== */

    independentInput.addEventListener('change', filter);
    dependentInput.addEventListener('change', filter);
    nameInput.addEventListener('change', filter);
    window.addEventListener('pageshow', filter);
    searchInput.addEventListener('input', debouncedFilter);



    /*  =====================================
        Filter
        ===================================== */

    function filter() {
        const searchQuery = searchInput.value.toLowerCase();
        const showIndependent = independentInput.checked;
        const showDependent = dependentInput.checked;
        const showName = nameInput.checked;

        // 1. Show Name
        if (showName) {
            main.classList.remove(ClassName.HIDE_NAME);
        } else {
            main.classList.add(ClassName.HIDE_NAME);
        }

        countries.forEach(country => {

            // 2. Search
            if (!country.name.toLowerCase().includes(searchQuery)) {
                country.element.style.display = 'none';
                return;
            }

            // 3. Independent
            if (country.independent && !showIndependent) {
                country.element.style.display = 'none';
                return;
            }

            // 4. Dependent
            if (!country.independent && !showDependent) {
                country.element.style.display = 'none';
                return;
            }

            country.element.style.display = '';
        });
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
