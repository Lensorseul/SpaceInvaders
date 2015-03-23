
function exterieurMove(){
	THREE.Group.call(this);
            this.invader1_mlm = new THREE.MeshLambertMaterial({color:  0x00FFFF});

        this.vaisseauP = new vaisseau(ship_data,this.invader1_mlm);
        this.enemyP = new invader(invader5_data);
        this.vaisseauP.position.z=400;
        this.vaisseauP.rotation.x=270*(3.1415/180);
        this.vaisseauP.position.y=10;
        this.vaisseauP.position.x=2;
        this.enemyP.position.z=400;
        this.enemyP.rotation.x=270*(3.1415/180);
        this.enemyP.rotation.z=90*(3.1415/180);
        this.enemyP.position.y=-10;
        this.enemyP.position.x=15;

        this.add(this.vaisseauP);
        this.add(this.enemyP);
}

exterieurMove.prototype = Object.create(THREE.Group.prototype);
exterieurMove.prototype.constructor = exterieurMove;
