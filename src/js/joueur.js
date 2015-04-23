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
    this.materiel = new THREE.MeshLambertMaterial({color:  0x00FFFF, opacity: 0.5,transparent: true });
    this.geometrie = new THREE.SphereGeometry(8, 20, 20 );
    this.meshInvincible = new THREE.Mesh(this.geometrie,this.materiel);
    this.meshInvincible.position.x = 6; 
    this.meshInvincible.position.y = -3; 
    this.meshInvincible.position.z+=8;
    this.meshInvincible.visible = false;
    this.meshInvincible.material.side = THREE.DoubleSide;
    this.add(this.meshInvincible);
}

joueur.prototype = Object.create(THREE.Group.prototype);
joueur.prototype.constructor = joueur;

joueur.prototype.print = function() {
    console.log("joueur --> " + this);
};
joueur.prototype.tir = function(){
    this.uneBalle = new balleJoueur(-5,new THREE.Vector3(0,0,0.1));
    this.uneBalle.position.x=this.position.x+6;
    this.uneBalle.position.y=this.position.y-3;
    this.uneBalle.position.z=this.position.z;
    sound.effects["impulse_canon"].stop();
    sound.effects["impulse_canon"].play();
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
        if(this.position.x>=-200)
            this.position.x-=4;
    }
}

joueur.prototype.moveRight = function(){
    if(this.bougerD){
        if(this.position.x<=190)
            this.position.x+=4;
    }
}

joueur.prototype.afficheBouclier = function(etat){
    if(etat){
        aparaitreBouclier();
    }
    else
        disparaitreBouclier();
}
var bouclier;
disparaitreBouclier = function(){
                    bouclier = new createjs.Stage(renderer.domElement);
                    bouclier.scale = env.player.meshInvincible.scale.x;
                    bouclier.opacity = env.player.meshInvincible.material.opacity;
                    createjs.Tween.get(bouclier)
                            .to({scale : 8
                                ,opacity : 0}, 500)
                            .call(handleDiparu)
                            .addEventListener("change", handleDisparait);  
}
aparaitreBouclier = function(){
                    bouclier = new createjs.Stage(renderer.domElement);
                    env.player.meshInvincible.scale.set(5,5,5);
                    env.player.meshInvincible.material.opacity=0;
                    env.player.meshInvincible.visible =true;
                    bouclier.opacity = 0;
                    bouclier.scale = 8;
                    createjs.Tween.get(bouclier)
                            .to({scale : 2
                                ,opacity : 0.5}, 500)
                            .addEventListener("change", handleAparait);  
}
handleDisparait = function(event) {
    env.player.meshInvincible.scale.set(bouclier.scale,bouclier.scale,bouclier.scale);
    env.player.meshInvincible.material.opacity = bouclier.opacity;
}
handleDiparu = function(event) {
    env.player.meshInvincible.visible = false;
}
handleAparait = function(event) {
    env.player.meshInvincible.scale.set(bouclier.scale,bouclier.scale,bouclier.scale);
    env.player.meshInvincible.material.opacity = bouclier.opacity;
}

getPosBalle = function(){
    return this.uneBalle.getPosBalle();
}
