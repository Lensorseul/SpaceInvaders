function balleJoueur(v,d) {
    this.materiel = new THREE.MeshBasicMaterial({color:  0xFFFFFF});
    this.geometrie = new THREE.SphereGeometry( 1, 5, 5 );
    balle.call(this,v,d,this.geometrie,this.materiel);
    this.raycaster = new THREE.Raycaster();
}

balleJoueur.prototype = Object.create(balle.prototype);
balleJoueur.prototype.constructor = balleJoueur;

balleJoueur.prototype.print = function() {
    console.log("balleJoueur --> "+this.vitesse);
    console.log("balleJoueur --> "+this.direction);
};

balleJoueur.prototype.getPosBalle = function(){
    return new THREE.Vector3(this.position.x,this.position.y,this.position.z);
}

