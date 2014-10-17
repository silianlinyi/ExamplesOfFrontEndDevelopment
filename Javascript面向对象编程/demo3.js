function Animal() {
}
Animal.prototype.species = '动物';

function Cat(name, color) {
	this.name = name;
	this.color = color;
}
Cat.prototype = Animal.prototype;
Cat.prototype.constructor = Cat;

var cat1 = new Cat('大毛', '黄色');
alert(cat1.species);
