var CoffeeHouse = CoffeeHouse || {};

var CoffeeHouse = (function (CoffeeHouse) {
    function CoffeeHouse() {
        var self = this;

        self.products = new CoffeeHouse.List({
            url: '/api/v1/products',
            list: '.product-list',
            form: '.product-form',
            createElement: createProduct,
            removeButton: '.product-remove-button',
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
            '.order-list',
            '.order-total'
        );

        self.products.initialize();
        self.extras.initialize();
    }

    var event = new CustomEvent('order_add', { 'detail': {} });

    function addProductListener(event) {
        var productElement = event.target.parentElement;
        var id = productElement.dataset.listId;
        var product = products.get(id);

        orders.add(product);
    }

    function createProduct(product) {
        var listElement  = CoffeeHouse.DOM.createElement('li', { class: 'list-element product' });
        var nameNode     = CoffeeHouse.DOM.createParagraph('product-name', product.name);
        var priceNode    = CoffeeHouse.DOM.createParagraph('product-price', product.price);
        var addButton    = CoffeeHouse.DOM.createElement('i', { class: 'product-add-button fa fa-cart-plus' });
        var removeButton = CoffeeHouse.DOM.createElement('i', { class: 'product-remove-button fa fa-times' });

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

        CoffeeHouse.DOM.append(listElement, [nameNode, priceNode, addButton, removeButton]);

        return listElement;
    }

    return CoffeeHouse;
})(CoffeeHouse);
