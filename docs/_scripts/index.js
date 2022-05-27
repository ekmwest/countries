(function () {

    /*  =====================================
        Selector
        ==================================== */

    const Selector = {
        SEARCH_INPUT: '[data-element="index.search-input"]',
        COUNTRY_ELEMENT: '.index__country'
    };



    /*  =====================================
        Attribute
        ==================================== */

    const Attribute = {
        COUNTRY_NAME: 'data-country-name',
        INDEPENDENT: 'data-independent'
    };



    /*  =====================================
        Countries
        ==================================== */

    const countries = Array.from(document.querySelectorAll(Selector.COUNTRY_ELEMENT)).map(countryElement => {
        return {
            name: countryElement.getAttribute(Attribute.COUNTRY_NAME),
            independent: countryElement.getAttribute(Attribute.INDEPENDENT),
            element: countryElement
        };
    });



    /*  =====================================
        Elements
        ==================================== */

    const searchInput = document.querySelector(Selector.SEARCH_INPUT);



    /*  =====================================
        Events
        ==================================== */

    searchInput.addEventListener('input', filter);
    window.addEventListener('pageshow', filter);



    /*  =====================================
        Filter
        ==================================== */

    const searchDebounce = 400;
    let searchDebounceTimeout = null;

    function filter() {

        if (searchDebounceTimeout) {
            clearTimeout(searchDebounceTimeout);
        }

        searchDebounceTimeout = setTimeout(() => {
            const searchQuery = searchInput.value.toLowerCase();
            const independence = document.querySelector('input[name="independence"]:checked').value;
            const hideName = document.querySelector('[name="hide-name"]').checked;

            console.log('hideName', hideName);

            countries.forEach(country => {
                if (country.name.toLowerCase().includes(searchQuery)) {
                    country.element.style.display = '';
                } else {
                    country.element.style.display = 'none';
                }
            });

            countries.forEach(country => {
                const countryNameElement = country.element.querySelector('.index__name');
                if (hideName) {
                    countryNameElement.style.display = 'none';
                } else {
                    countryNameElement.style.display = '';
                }

            })
        }, searchDebounce);
    }

})();
