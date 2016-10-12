var CoffeeHouse = CoffeeHouse || {};


(function (CoffeeHouse) {
    function append(parent, children) {
        if (children.constructor === Array) {
            children.forEach(parent.appendChild.bind(parent));
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

            var attrs = Object.keys(attributes);

            attrs.forEach(function (attr) {
                switch (attr) {
                    case 'dataset':
                        var dataset = attributes[attr];
                        for (var key in dataset) {
                            element.dataset[key] = dataset[key];
                        }
                        break;
                    case 'text':
                        element.innerHTML = attributes[attr];
                        break;
                    case 'class':
                        element.className = attributes[attr];
                        break;
                    default:
                        element[attr] = attributes[attr];
                }
            });
        }

        return element;
    }

    function createParagraph(className, text) {
        return createElement('p', { class: className, text: text });
    }

    function createInput(type, value, attributes) {
        var input = createElement('input', attributes);
        input.setAttribute('type', type);
        input.value = value;

        return input;
    }

    CoffeeHouse.DOM = {
        append: append,
        createElement: createElement,
        createParagraph: createParagraph,
        createInput: createInput,
    };
})(CoffeeHouse);
