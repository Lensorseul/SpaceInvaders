function rangesAlien(nbA, px) {
    THREE.Group.call(this);
    this.invader1_mat = new THREE.MeshLambertMaterial({color:  0x2C75FF});
    this.invader2_mat = new THREE.MeshLambertMaterial({color:  0x24445C});
    this.invader3_mat = new THREE.MeshLambertMaterial({color:  0x997A8D});
    this.invader4_mat = new THREE.MeshLambertMaterial({color:  0xA91101});
    this.invader5_mat = new THREE.MeshLambertMaterial({color:  0xCC5500});
    this.invader6_mat = new THREE.MeshLambertMaterial({color:  0x798933});
    this.invader7_mat = new THREE.MeshLambertMaterial({color:  0x3A9D23});
    this.invader8_mat = new THREE.MeshLambertMaterial({color:  0x18391E});
    
    this.forme = new Array(new invader(invader_data,this.invader1_mat),
                            new invader(invader1_data,this.invader2_mat),
                            new invader(invader2_data,this.invader3_mat),
                            new invader(invader4_data,this.invader4_mat),
                            new invader(invader1_data,this.invader5_mat),
                            new invader(invader2_data,this.invader6_mat),
                            new invader(invader3_data,this.invader7_mat),
                            new invader(invader4_data,this.invader8_mat));
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
        alien.position.x  = px;
        alien.position.z  = -i*20-45 ;
        alien.position.y  = 6 ;
        alien.name=i;
        this.add(alien);
    }
};
