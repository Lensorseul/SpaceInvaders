function groupHitBox(nbR,nbL,vbe,freq) {
    THREE.Group.call(this);
    this.nbRanges = nbR;
    this.alienParRanges = nbL;
    this.vitesse=vbe;
    this.frequence = freq;
    this.balles = new THREE.Group();
    this.remplirAliens();
}

groupHitBox.prototype = Object.create(THREE.Group.prototype);
groupHitBox.prototype.constructor = groupHitBox;

groupHitBox.prototype.remplirAliens = function() {
    for(j = 0 ; j < this.nbRanges ; j++){
       var g = new rangesHitBox(this.alienParRanges, j*15);
       g.position.x=j*5;
       this.add(g);
    }
    this.position.x-=(this.nbRanges/2)*2;
    this.position.z=-52	;
    this.add(this.balles);
};

groupHitBox.prototype.print = function() {
    console.log("groupHitBox --> " + this);
};
groupHitBox.prototype.tir = function(){
    var min,max,alienMax;
    min = 1;
    max = this.frequence;

    if(this.children.length>1){
       alienMax=0 + Math.floor(Math.random() * (this.children.length-1));
        var number = min + Math.floor(Math.random() * max);

        if(number==1){
            var bal = new balleEnnemi(this.vitesse,new THREE.Vector3(0,0,0.1));
            bal.position.x= this.children[alienMax].position.x+this.children[alienMax].children[0].position.x;
            var id = this.children[alienMax].children.length;
            bal.position.y= 0;
            bal.position.z= this.children[alienMax].children[0].position.z;
            this.balles.add(bal);
        }
    }
};

