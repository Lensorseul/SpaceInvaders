function balleEnnemi(v,d,mat) {
    this.materiel = new THREE.MeshBasicMaterial({color:  0xFFFF00});
    this.geometrie = new THREE.BoxGeometry( 3, 3, 6 );
    balle.call(this,v,d,this.geometrie,mat);
}

balleEnnemi.prototype = Object.create(balle.prototype);
balleEnnemi.prototype.constructor = balleEnnemi;

balleEnnemi.prototype.print = function() {
    console.log("balleEnnemi --> "+this.vitesse);
    console.log("balleEnnemi --> "+this.direction);
};
