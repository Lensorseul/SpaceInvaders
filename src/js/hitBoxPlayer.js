function hitBoxPlayer() {
    this.materiel = new THREE.MeshNormalMaterial({visible : false});
    this.geometrie = new THREE.BoxGeometry(26, 10, 20 );
    THREE.Group.call(this,this.geometrie,this.materiel);
    this.add(new THREE.Mesh(this.geometrie,this.materiel));
    this.position.z = 90;
    this.position.x = 6;
    this.bougerG= false;
    this.bougerD= false;
    this.name="hitBox";
}

hitBoxPlayer.prototype = Object.create(THREE.Group.prototype);
hitBoxPlayer.prototype.constructor = hitBoxPlayer;

hitBoxPlayer.prototype.print = function() {
    console.log("hitBoxPlayer --> " + this);
};

hitBoxPlayer.prototype.move = function(direction,bool){
    if(direction=="left")
        this.bougerG = bool;
    if(direction=="right")
        this.bougerD = bool;
}

hitBoxPlayer.prototype.moveLeft = function(){
    if(this.bougerG)
        if(this.position.x>=-195)
            this.position.x-=4;
}

hitBoxPlayer.prototype.moveRight = function(){
    if(this.bougerD)
        if(this.position.x<=195)
            this.position.x+=4;
}

hitBoxPlayer.prototype.getPosBalle = function(){
    return this.uneBalle.getPosBalle();
}
