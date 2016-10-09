var CoffeeHouse = window.CoffeeHouse | {};

var CoffeeHouse = (function () {
    function CoffeeHouse () {
        var self = this;

        self.elements = {};
        self.elements['items'] = document.querySelector('.product-list');
        self.items = getItems();

        addItems(self.items);

        function getItems() {
            return [
                { name: 'Java', price: 39 },
                { name: 'Kaffe', price: 29 },
                { name: 'Espresso', price: 29 },
            ];
        }

        function createItem(item) {
            var listElement = document.createElement('li');
            var nameNode = document.createElement('p');
            var priceNode = document.createElement('p');

            nameNode.innerHTML = item.name;
            priceNode.innerHTML = item.price;

            listElement.appendChild(nameNode);
            listElement.appendChild(priceNode);

            return listElement;
        }

        function addItems(items) {
            for (var i = 0; i < items.length; i++)
            {
                var item = createItem(items[i]);

                self.elements.items.appendChild(item);
            }
        }

        function removeItems() {

        }
    }

    return CoffeeHouse;
})();

document.addEventListener("DOMContentLoaded", function (event) {
    var coffee = CoffeeHouse();
});
