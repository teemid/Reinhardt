var CoffeeHouse = CoffeeHouse || {};

var CoffeeHouse = (function (CoffeeHouse) {
    function CoffeeHouse() {
        var self = this;

        self.beverages = new CoffeeHouse.List({
            url: '/api/v1/beverages',
            list: '.beverage-list',
            form: '.beverage-form',
            createElement: createBeverage,
            removeButton: '.beverage-remove-button',
        });
        self.extras = new CoffeeHouse.List({
            url: '/api/v1/extras',
            list: '.extra-list',
            form: '.extra-form',
            createElement: createExtra,
            removeButton: '.extra-remove-button',
        });
        self.orders = new CoffeeHouse.Order(
            '/api/v1/orders',
            '.order-form',
            '.order-total',
            '.order-hidden-total'
        );

        self.beverages.initialize();
        self.extras.initialize();
    }

    var event = new CustomEvent('order_add', { 'detail': {} });

    function addProductListener(event) {
        var beverageElement = event.target.parentElement;
        var id = beverageElement.dataset.listId;
        var beverage = beverages.get(id);

        orders.add('beverage', beverage);
    }

    function addExtraListener(event) {
        console.log(event);
        var extraElement = event.target.parentElement;
        var id = extraElement.dataset.listId;
        var extra = extras.get(id);

        orders.add('extra', extra);
    }

    function createBeverage(product) {
        var listElement  = CoffeeHouse.DOM.createElement('li', { class: 'list-element beverage' });
        var nameNode     = CoffeeHouse.DOM.createParagraph('beverage-name', product.name);
        var priceNode    = CoffeeHouse.DOM.createParagraph('beverage-price', product.price);
        var addButton    = CoffeeHouse.DOM.createElement('i', { class: 'beverage-add-button fa fa-cart-plus' });
        var removeButton = CoffeeHouse.DOM.createElement('i', { class: 'beverage-remove-button fa fa-times' });

        addButton.addEventListener('click', addProductListener);

        CoffeeHouse.DOM.append(listElement, [nameNode, priceNode, addButton, removeButton]);

        return listElement;
    }

    function createExtra(extra) {
        var priceText    = extra.price == 0 ? 'Free' : extra.price;
        var listElement  = CoffeeHouse.DOM.createElement('li', { class: 'list-element extra' });
        var nameNode     = CoffeeHouse.DOM.createParagraph('extra-name', extra.name);
        var priceNode    = CoffeeHouse.DOM.createParagraph('extra-price', priceText);
        var addButton    = CoffeeHouse.DOM.createElement('i', { class: 'extra-add-button fa fa-cart-plus' });
        var removeButton = CoffeeHouse.DOM.createElement('i', { class: 'extra-remove-button fa fa-times' });

        addButton.addEventListener('click', addExtraListener);

        CoffeeHouse.DOM.append(listElement, [nameNode, priceNode, addButton, removeButton]);

        return listElement;
    }

    return CoffeeHouse;
})(CoffeeHouse);

document.addEventListener("DOMContentLoaded", function (event) {
    var coffeeHouse = CoffeeHouse();
});
