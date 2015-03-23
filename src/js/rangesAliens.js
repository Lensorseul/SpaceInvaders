function rangesAlien(nbA, px) {
    THREE.Group.call(this);
    this.invader1_mat = new THREE.MeshLambertMaterial({color:  0x00FFFF});
    this.invader2_mat = new THREE.MeshLambertMaterial({color:  0xFF0000});
    this.invader3_mat = new THREE.MeshLambertMaterial({color:  0x0000FF});
    
    this.forme = new Array(new invader(invader_data,this.invader1_mat),new invader(invader1_data,this.invader2_mat),new invader(invader2_data,this.invader3_mat),new invader(invader4_data,this.invader1_mat),new invader(invader1_data,this.invader1_mat),new invader(invader2_data,this.invader1_mat),new invader(invader3_data,this.invader1_mat),new invader(invader4_data,this.invader1_mat),new invader(invader5_data,this.invader1_mat));
    this.remplirAliens(nbA, px);
}

rangesAlien.prototype = Object.create(THREE.Group.prototype);
rangesAlien.prototype.constructor = rangesAlien;

rangesAlien.prototype.print = function() {
    console.log("rangesAlien --> " + this);
};
rangesAlien.prototype.remplirAliens = function(nbA, px){
    for(var i = 0; i < nbA ; i++){
        var alien = new ennemi(this.forme[i]);
        alien.scale.set(2,2,2);
        alien.position.x  = -36;
        alien.position.z  = -i*20-45 ;
        alien.position.y  = 6 ;
        alien.name=i;
        this.add(alien);
    }
};
