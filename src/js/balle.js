var balle = function(v,d,geo,mat) {
    THREE.Mesh.call(this,geo,mat);
    this.vitesse = v;
    this.direction = d;
}

balle.prototype = Object.create(THREE.Mesh.prototype);
balle.prototype.constructor = balle;

balle.prototype.move = function(){
    this.position.z+=this.vitesse; 
}