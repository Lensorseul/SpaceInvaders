function rangesHitBox(nbA, px) {
    THREE.Group.call(this);
    this.remplirAliens(nbA, px);
}

rangesHitBox.prototype = Object.create(THREE.Group.prototype);
rangesHitBox.prototype.constructor = rangesHitBox;

rangesHitBox.prototype.print = function() {
    console.log("rangesHitBox --> " + this);
};
rangesHitBox.prototype.remplirAliens = function(nbA, px){
    for(var i = 0; i < nbA ; i++){
        var alien = new hitBox();
        alien.scale.set(2,2,2);
        alien.position.x  = (px*2)+2 ;
        alien.position.z  = -i*20-45 ;
        alien.position.y  = 3 ;
        alien.uuid=i;
        this.add(alien);
    }
};
