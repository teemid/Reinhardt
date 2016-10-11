var CoffeeHouse = CoffeeHouse || {};


(function (CoffeeHouse) {
    function append(parent, children) {
        if (children.constructor === Array) {
            children.map(parent.appendChild, parent);
        }
        else
        {
            parent.appendChild(children);
        }
    }

    function createElement(elementName, attributes) {
        var element = document.createElement(elementName);

        if (attributes) {
            element.className = ('class' in attributes) ? attributes['class'] : '';

            if ('dataset' in attributes) {
                var dataset = attributes['dataset'];

                for (var key in dataset) {
                    element.dataset[key] = dataset[key];
                }
            }

            if ('text' in attributes) {
                element.innerHTML = attributes['text'];
            }
        }

        return element;
    }

    function createParagraph(className, text) {
        return createElement('p', { class: className, text: text });
    }

    CoffeeHouse.DOM = {
        append: append,
        createElement: createElement,
        createParagraph: createParagraph,
    };
})(CoffeeHouse);
