function hitBox() {
	this.materiel = new THREE.MeshNormalMaterial({visible : false});
	this.geometrie = new THREE.BoxGeometry( 10, 10, 1 );
	THREE.Mesh.call(this,this.geometrie,this.materiel);
}

hitBox.prototype = Object.create(THREE.Mesh.prototype);
hitBox.prototype.constructor = hitBox;

hitBox.prototype.print = function() {
  console.log("ennemi --> " + this);
};
