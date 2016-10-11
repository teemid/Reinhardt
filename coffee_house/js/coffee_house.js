var CoffeeHouse = CoffeeHouse || {};

var CoffeeHouse = (function (CoffeeHouse) {
    function CoffeeHouse() {
        var self = this;

        self.products = new CoffeeHouse.List({
            url: '/api/v1/products',
            list: '.products-list',
            form: '.products-form',
            createElement: createProduct,
            removeButton: '.products-remove',
        });
        self.extras = new CoffeeHouse.List({
            url: '/api/v1/extras',
            list: '.extras-list',
            form: '.extras-form',
            createElement: createProduct,
            removeButton: '.extras-remove',
        });
        self.orders = new CoffeeHouse.Order('/api/v1/orders');

        self.products.initialize();
        self.extras.initialize();
    }

    var event = new CustomEvent('order_add', { 'detail': {} });

    function addProductListener(event) {
        var productElement = event.target.parentElement;
        var id = productElement.dataset.productId;
        var product = products.get(id);

        orders.add(product);
    }

    function createProduct(product) {
        var listElement = document.createElement('li');
        var nameNode = document.createElement('p');
        var priceNode = document.createElement('p');
        var addButton = document.createElement('i');
        var removeButton = document.createElement('i');

        listElement.className = 'product';
        addButton.className = 'fa fa-cart-plus';
        removeButton.className = 'fa fa-times';

        nameNode.innerHTML = product.name;
        priceNode.innerHTML = product.price;

        listElement.dataset.productId = product.id;

        listElement.appendChild(nameNode);
        listElement.appendChild(priceNode);
        listElement.appendChild(addButton);
        listElement.appendChild(removeButton);

        return listElement;
    }

    function createExtra(extra) {
        var listElement = document.createElement('li');
        var nameNode = document.createElement('p');
        var priceNode = document.createElement('p');
        var addButton = document.createElement('i');
        var removeButton = document.createElement('i');

        listElement.className = 'product';
        addButton.className = 'fa fa-cart-plus';
        removeButton.className = 'fa fa-times';

        nameNode.innerHTML = extra.name;
        priceNode.innerHTML = extra.price;

        listElement.dataset.extraId = extra.id;

        listElement.appendChild(nameNode);
        listElement.appendChild(priceNode);
        listElement.appendChild(addButton);
        listElement.appendChild(removeButton);

        return listElement;
    }

    return CoffeeHouse;
})(CoffeeHouse);
