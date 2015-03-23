function ennemi(forme) {
        THREE.Group.call(this);
        this.add(forme);
}

ennemi.prototype = Object.create(THREE.Group.prototype);
ennemi.prototype.constructor = ennemi;

ennemi.prototype.print = function() {
  console.log(this);
};
