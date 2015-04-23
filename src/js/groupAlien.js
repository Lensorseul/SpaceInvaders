function groupAlien(nbR , nbL,vbe,freq) {
    THREE.Group.call(this);
    this.nbRanges = nbR;
    this.alienParRanges = nbL;
    this.balles = new THREE.Group();
    this.vitesse=vbe;
    this.frequence = freq;
    this.remplirAliens();
}

groupAlien.prototype = Object.create(THREE.Group.prototype);
groupAlien.prototype.constructor = groupAlien;

groupAlien.prototype.remplirAliens = function() {
    for(j = 0 ; j < this.nbRanges ; j++){
       var g = new rangesAlien(this.alienParRanges, 0);
       g.position.x=j*30;
       console.log(j*20);
       this.add(g);
    }
    console.log(this.children[0].position.x+" "+this.children[this.children.length-1].position.x);
    this.position.x-=10;
    this.position.z=-52;
    this.add(this.balles);
};

groupAlien.prototype.print = function() {
    console.log("groupAlien --> " + this);
};

groupAlien.prototype.tir = function(){
    var min,max,alienMax;
    min = 1;
    max = this.frequence;

    if(this.children.length>1){
       alienMax=0 + Math.floor(Math.random() * (this.children.length-1));
        var number = min + Math.floor(Math.random() * max);
        if(number==1){
                    console.log(this.children[alienMax].children[0].children[0].children[0].material);
            var bal = new balleEnnemi(this.vitesse,new THREE.Vector3(0,0,0.1),this.children[alienMax].children[0].children[0].children[0].material);
            bal.position.x= this.children[alienMax].position.x+this.children[alienMax].children[0].position.x;
            var id = this.children[alienMax].children.length;
            bal.position.y= 0;
            bal.position.z= this.children[alienMax].children[0].position.z;
            this.balles.add(bal);
            sound.effects["laser"].stop();
            sound.effects["laser"].play();
        }
    }
};

