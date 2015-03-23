function balleEnnemi(v,d) {
    this.materiel = new THREE.MeshBasicMaterial({color:  0xFFFFFF});
    this.geometrie = new THREE.SphereGeometry( 1, 5, 5 );
    balle.call(this,v,d,this.geometrie,this.materiel);
}

balleEnnemi.prototype = Object.create(balle.prototype);
balleEnnemi.prototype.constructor = balleEnnemi;

balleEnnemi.prototype.print = function() {
    console.log("balleEnnemi --> "+this.vitesse);
    console.log("balleEnnemi --> "+this.direction);
};
