function groupAlien(nbR , nbL) {
    THREE.Group.call(this);
    this.nbRanges = nbR;
    this.alienParRanges = nbL;
    this.remplirAliens();
}

groupAlien.prototype = Object.create(THREE.Group.prototype);
groupAlien.prototype.constructor = groupAlien;

groupAlien.prototype.remplirAliens = function() {
    for(j = 0 ; j < this.nbRanges ; j++){
       var g = new rangesAlien(this.alienParRanges, j*15);
       g.position.x=j*20;
       this.add(g);
    }
    this.position.x-=(this.nbRanges/2)*2+10;
    this.position.z=-52;
};

groupAlien.prototype.print = function() {
    console.log("groupAlien --> " + this);
};


