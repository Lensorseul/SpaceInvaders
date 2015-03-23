function joueur() {
    /*this.materiel = new THREE.MeshNormalMaterial();
    this.geometrie = new THREE.BoxGeometry(10, 10, 10 );
    THREE.Mesh.call(this,this.geometrie,this.materiel);*/
    THREE.Group.call(this);
    this.position.z=0;
    this.uneBalle;
    this.bougerG= false;
    this.bougerD= false;
    this.add(new vaisseau(ship_data));
}

joueur.prototype = Object.create(THREE.Group.prototype);
joueur.prototype.constructor = joueur;

joueur.prototype.print = function() {
    console.log("joueur --> " + this);
};
joueur.prototype.tir = function(){
    this.uneBalle = new balleJoueur(-5,new THREE.Vector3(0,0,0.1));
    this.uneBalle.position.x=this.position.x+6;
    this.uneBalle.position.y=this.position.y;
    this.uneBalle.position.z=this.position.z;
    return (this.uneBalle);
};

joueur.prototype.move = function(direction,bool){
    if(direction=="left")
        this.bougerG = bool;
    if(direction=="right")
        this.bougerD = bool;
}

joueur.prototype.moveLeft = function(){
    if(this.bougerG){
        this.position.x-=4;
    }
}

joueur.prototype.moveRight = function(){
    if(this.bougerD){
        this.position.x+=4;
    }
}

joueur.prototype.getPosBalle = function(){
    return this.uneBalle.getPosBalle();
}
