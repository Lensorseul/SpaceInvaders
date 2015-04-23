function groupHitBox(nbR,nbL) {
    THREE.Group.call(this);
    this.nbRanges = nbR;
    this.alienParRanges = nbL;
    this.remplirAliens();
}

groupHitBox.prototype = Object.create(THREE.Group.prototype);
groupHitBox.prototype.constructor = groupHitBox;

groupHitBox.prototype.remplirAliens = function() {
    for(j = 0 ; j < this.nbRanges ; j++){
       var g = new rangesHitBox(this.alienParRanges, 0);
       g.position.x=j*30;
       this.add(g);
    }
    //this.position.x=-(this.nbRanges*12)+10;
    this.position.z=-52	;
    this.add(this.balles);
};

groupHitBox.prototype.print = function() {
    console.log("groupHitBox --> " + this);
};

