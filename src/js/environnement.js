function environnement(nbDeRangees, nbParLigne, vitesseEnnemi, vitesseBalleEnnemi, frequence) {
    THREE.Scene.call(this);
    this.camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 1, 10000 );
    //this.cameraControls = new THREE.OrbitControls(this.camera);
    this.light;
    this.hitBoxPlayer = new hitBoxPlayer();
    this.player = new joueur();
    this.aliens = new groupHitBox(nbDeRangees,nbParLigne,vitesseBalleEnnemi,frequence);
    this.aliensForme = new groupAlien(nbDeRangees,nbParLigne);
    this.direction;
    this.raycasterBalleAllie = new THREE.Raycaster();
    this.raycasterEnnemi = new THREE.Raycaster();
    this.sol = new sol();
    this.sol.receiveShadow= true;
    this.enCours = false;
    this.nbDeVie = 3;
    this.velocityEnnemi = vitesseEnnemi;
    this.velocityBalleEnnemi = vitesseBalleEnnemi;
    this.nbRangees = nbDeRangees;
    this.nbLigne = nbParLigne;
    this.frequence = frequence;
    this.raycasterBalleAllie.far = 3;
    this.raycasterEnnemi.far =3;
    this.ext1 = new exterieurMove();
    this.ext1.position.x = 100;
    this.ext1.position.y = -350;
    this.add(this.ext1);
    this.lancement();
    	var spotlight = new THREE.SpotLight();
	spotlight.position.set(200,200,150);
	spotlight.shadowCameraVisible = false;
	spotlight.shadowDarkness = 0.95;
	spotlight.intensity = 3;
	// must enable shadow casting ability for the light
	spotlight.castShadow = true;
	this.add(spotlight);
    
    var particleCount = 1800,
    particles = new THREE.Geometry(),
   pMaterial = new THREE.ParticleBasicMaterial({
  color: 0xFFFFFF,
  size: 10,
  map: THREE.ImageUtils.loadTexture(
    "src/medias/images/spikey.png"
  ),
  blending: THREE.AdditiveBlending,
  transparent: true
});
    




    // now create the individual particles
for (var p = 0; p < particleCount; p++) {

  // create a particle with random
  // position values, -250 -> 250
  var pX = Math.random() * 1000 - 600,
      pY = Math.random() * 1000 - 250,
      pZ = Math.random() * 1000 - 400,
      particle = 
        new THREE.Vector3(pX, pY, pZ);
  // add it to the geometry
  particles.vertices.push(particle);
  
}

// create the particle system
    this.particleSystem = new THREE.ParticleSystem(
    particles,
    pMaterial);
// add it to the scene

this.add(this.particleSystem);
this.particleSystem.sortParticles = true;



        var materialFront = new THREE.MeshBasicMaterial( { color: 0x33FF00 } );
	var materialSide = new THREE.MeshBasicMaterial( { color: 0x009900 } );
	var materialArray = [ materialFront, materialSide ];
	var textGeom = new THREE.TextGeometry( "Space Invaders !", 
	{
		size: 30, height: 4, curveSegments: 3,
		font: "gentilis", weight: "bold", style: "normal",
		bevelThickness: 1, bevelSize: 2, bevelEnabled: true,
		material: 0, extrudeMaterial: 1
	});
	
	var textMaterial = new THREE.MeshFaceMaterial(materialArray);
	var textMesh = new THREE.Mesh(textGeom, textMaterial );
	
	textGeom.computeBoundingBox();
	var textWidth = textGeom.boundingBox.max.x - textGeom.boundingBox.min.x;
	
	textMesh.position.set( -0.5 * textWidth, 200, -300 );
	textMesh.rotation.x = -Math.PI / 12;
	this.add(textMesh);




}

environnement.prototype = Object.create(THREE.Scene.prototype);
environnement.prototype.constructor = environnement;
  
environnement.prototype.lancement = function(){
        var materialFront = new THREE.MeshBasicMaterial( { color: 0x33FF00 } );
	var materialSide = new THREE.MeshBasicMaterial( { color: 0x009900 } );
	var materialArray = [ materialFront, materialSide ];
	var textGeom = new THREE.TextGeometry( "Commencer !", 
	{
		size: 20, height: 4, curveSegments: 3,
		font: "gentilis", weight: "bold", style: "normal",
		bevelThickness: 1, bevelSize: 2, bevelEnabled: true,
		material: 0, extrudeMaterial: 1
	});
	
	var textMaterial = new THREE.MeshFaceMaterial(materialArray);
	this.commencer = new THREE.Mesh(textGeom, textMaterial );
	
	textGeom.computeBoundingBox();
	var textWidth = textGeom.boundingBox.max.x - textGeom.boundingBox.min.x;
	
	this.commencer.position.set( -0.5 * textWidth, 50, 20);
	this.commencer.rotation.x = -Math.PI / 12;
	this.add(this.commencer);
}

environnement.prototype.finlancement = function(){
    this.commencer.position.y = 900;
    this.commencer.visible = false;
}
  
environnement.prototype.toucher = function(){
        var materialFront = new THREE.MeshBasicMaterial( { color: 0x33FF00 } );
	var materialSide = new THREE.MeshBasicMaterial( { color: 0x009900 } );
	var materialArray = [ materialFront, materialSide ];
	var textGeom = new THREE.TextGeometry( "Vous avez été touché !", 
	{
		size: 15, height: 4, curveSegments: 3,
		font: "gentilis", weight: "bold", style: "normal",
		bevelThickness: 1, bevelSize: 2, bevelEnabled: true,
		material: 0, extrudeMaterial: 1
	});
	
	var textMaterial = new THREE.MeshFaceMaterial(materialArray);
	this.textvousavezetetouche = new THREE.Mesh(textGeom, textMaterial );
	
	textGeom.computeBoundingBox();
	var textWidth = textGeom.boundingBox.max.x - textGeom.boundingBox.min.x;
	
	this.textvousavezetetouche.position.set( -0.5 * textWidth, 50, 20);
	this.textvousavezetetouche.rotation.x = -Math.PI / 12;
	this.add(this.textvousavezetetouche);
        
        
        var materialFront = new THREE.MeshBasicMaterial( { color: 0x33FF00 } );
	var materialSide = new THREE.MeshBasicMaterial( { color: 0x009900 } );
	var materialArray = [ materialFront, materialSide ];
	var textGeom = new THREE.TextGeometry( "Continuer", 
	{
		size: 10, height: 4, curveSegments: 3,
		font: "helvetiker", weight: "bold", style: "normal",
		bevelThickness: 1, bevelSize: 2, bevelEnabled: true,
		material: 0, extrudeMaterial: 1
	});
	
	var textMaterial = new THREE.MeshFaceMaterial(materialArray);
	this.textcontinuer = new THREE.Mesh(textGeom, textMaterial );
	
	textGeom.computeBoundingBox();
	var textWidth = textGeom.boundingBox.max.x - textGeom.boundingBox.min.x;
	
	this.textcontinuer.position.set( -0.5 * textWidth, 30, 20);
	this.textcontinuer.rotation.x = -Math.PI / 12;
	this.add(this.textcontinuer);
        
                var materialFront = new THREE.MeshBasicMaterial( { color: 0x33FF00 } );
	var materialSide = new THREE.MeshBasicMaterial( { color: 0x009900 } );
	var materialArray = [ materialFront, materialSide ];
	var textGeom = new THREE.TextGeometry( "Recommencer", 
	{
		size: 10, height: 4, curveSegments: 3,
		font: "helvetiker", weight: "bold", style: "normal",
		bevelThickness: 1, bevelSize: 2, bevelEnabled: true,
		material: 0, extrudeMaterial: 1
	});
	
	var textMaterial = new THREE.MeshFaceMaterial(materialArray);
	this.textrecommencer = new THREE.Mesh(textGeom, textMaterial );
	
	textGeom.computeBoundingBox();
	var textWidth = textGeom.boundingBox.max.x - textGeom.boundingBox.min.x;
	
	this.textrecommencer.position.set( -0.5 * textWidth, 10, 20);
	this.textrecommencer.rotation.x = -Math.PI / 12;
	this.add(this.textrecommencer);
}
  
environnement.prototype.fintoucher = function(){
    this.commencer.position.y = 900;
    this.commencer.visible = false;
    
    this.textvousavezetetouche.position.y = 900;
    this.textcontinuer.position.y = 900;
    this.textrecommencer.position.y = 900;
    this.textvousavezetetouche.visible = false;
    this.textcontinuer.visible = false;
    this.textrecommencer.visible = false;
    
}
  
  
  environnement.prototype.gagner = function(){
        var materialFront = new THREE.MeshBasicMaterial( { color: 0x33FF00 } );
	var materialSide = new THREE.MeshBasicMaterial( { color: 0x009900 } );
	var materialArray = [ materialFront, materialSide ];
	var textGeom = new THREE.TextGeometry( "Vous avez gagné !", 
	{
		size: 15, height: 4, curveSegments: 3,
		font: "gentilis", weight: "bold", style: "normal",
		bevelThickness: 1, bevelSize: 2, bevelEnabled: true,
		material: 0, extrudeMaterial: 1
	});
	
	var textMaterial = new THREE.MeshFaceMaterial(materialArray);
	this.textvousavezgagne = new THREE.Mesh(textGeom, textMaterial );
	
	textGeom.computeBoundingBox();
	var textWidth = textGeom.boundingBox.max.x - textGeom.boundingBox.min.x;
	
	this.textvousavezgagne.position.set( -0.5 * textWidth, 50, 20);
	this.textvousavezgagne.rotation.x = -Math.PI / 12;
	this.add(this.textvousavezgagne);
        
        
        var materialFront = new THREE.MeshBasicMaterial( { color: 0x33FF00 } );
	var materialSide = new THREE.MeshBasicMaterial( { color: 0x009900 } );
	var materialArray = [ materialFront, materialSide ];
	var textGeom = new THREE.TextGeometry( "Continuer", 
	{
		size: 10, height: 4, curveSegments: 3,
		font: "helvetiker", weight: "bold", style: "normal",
		bevelThickness: 1, bevelSize: 2, bevelEnabled: true,
		material: 0, extrudeMaterial: 1
	});
	
	var textMaterial = new THREE.MeshFaceMaterial(materialArray);
	this.textcontinuer1 = new THREE.Mesh(textGeom, textMaterial );
	
	textGeom.computeBoundingBox();
	var textWidth = textGeom.boundingBox.max.x - textGeom.boundingBox.min.x;
	
	this.textcontinuer1.position.set( -0.5 * textWidth, 30, 20);
	this.textcontinuer1.rotation.x = -Math.PI / 12;
	this.add(this.textcontinuer1);
}
  
  environnement.prototype.fingagner = function(){
    
    this.textvousavezgagne.position.y = 900;
    this.textcontinuer1.position.y = 900;

    this.textvousavezgagne.visible = false;
    this.textcontinuer1.visible = false;

    
}
  
    
environnement.prototype.reinit = function(){
    this.remove(this.camera);
    this.remove(this.sol);
    this.remove(this.player.uneBalle);
    this.remove(this.player);
    this.remove(this.hitBoxPlayer);
    this.remove(this.aliens);
    this.remove(this.aliensForme);
    this.nbDeVie = 3;
    this.hitBoxPlayer = new hitBoxPlayer();
    this.player = new joueur();
    this.aliens = new groupHitBox(this.nbRangees,this.nbLigne,this.velocityBalleEnnemi, this.frequence);
    this.aliensForme = new groupAlien(this.nbRangees,this.nbLigne);
    this.sol = new sol();
    this.add(this.camera);
    this.add(this.sol);
    this.add(this.player);
    this.add(this.hitBoxPlayer);
    this.add(this.aliens);
    this.add(this.aliensForme); 
    this.sol.position.z-=50;
    this.sol.position.y-=10;
    this.hitBoxPlayer.position.z=85;
    this.hitBoxPlayer.position.x=6;
    this.player.position.y=3;
    this.player.position.z=85;

}

environnement.prototype.init = function(){
    //ajout des éléments sur la scene
    this.add(this.camera);
    this.add(this.sol);
    this.add(this.player);
    this.add(this.hitBoxPlayer);
    this.add(this.aliens);
    this.add(this.aliensForme);
    this.direction = "droite";

    // positionnement des elements
    this.sol.position.z-=50;
    this.sol.position.y-=10;
    this.hitBoxPlayer.position.z=85;
    this.hitBoxPlayer.position.x=6;
    this.player.position.y=3;
    this.player.position.z=85;
    this.camera.position.x = (cameras[indiceCameraCourant]["position"].x);
    this.camera.position.y = (cameras[indiceCameraCourant]["position"].y);
    this.camera.position.z = (cameras[indiceCameraCourant]["position"].z);
    this.camera.lookAt(cameras[indiceCameraCourant]["lookat"]);
};

environnement.prototype.moveBalleJoueur = function(){
    if(this.player.uneBalle){
        if(this.player.uneBalle.position.z>this.player.position.z||this.player.uneBalle.position.z<-200){
            this.remove(this.player.uneBalle);
            this.player.uneBalle = undefined;
        }
        else{
            this.player.uneBalle.move();
            //this.detecterToucheJoueur();
        }
    }
}

environnement.prototype.moveEnv = function(){
    this.particleSystem.rotation.x += 0.009;

}


environnement.prototype.action1 = function(){
    this.ext1.rotation.x += 0.01;
}

environnement.prototype.moveSol = function(){	
	for(var i=0; i<100; i++ ){
		if(this.sol.boxesh[i].position.z==2000){
			this.sol.boxesh[i].position.z=-2000;
		}
		this.sol.boxesh[i].position.z +=2;
	}

}


environnement.prototype.moveBalleEnnemi = function(){
    if(this.aliens.balles.length!=0){
        for(var i = 0 ; i < this.aliens.balles.children.length; i++){
            if((this.aliens.balles.children[i].position.z+this.aliens.position.z-10)>this.player.position.z){
                this.aliens.balles.remove(this.aliens.balles.children[i]);   
            }
            else {     
                this.aliens.balles.children[i].move();
                if(this.enCours)
                    if(this.detecteJoueurToucher(this.aliens.balles.children[i])){
                        return false;
                    }
                    var defensetouche = this.detecterDefenseToucher(this.aliens.balles.children[i]);
                    if(defensetouche!=undefined){
                    	var indice = this.sol.defenses.indexOf(defensetouche);
                    	if(indice>-1){
                            if(this.sol.defenses[indice].children.length >5){
                            for(var k=0; k<10; k++){
                    		this.sol.defenses[indice].remove(this.sol.defenses[indice].children[k]);
                            }
                        }else{
                                this.sol.remove(this.sol.defenses[indice]);
                            }
                        }
                    		this.aliens.balles.remove(this.aliens.balles.children[i]);
                    	}               	        	
                    }
            }
        }
        return true;
    }


environnement.prototype.deplacementEnnemi = function(dir){
    if(dir == "gauche" || dir == "droite"){
        this.aliens.position.z+=5;
        this.aliensForme.position.z+=5;
        this.direction = dir;
    }
    if(this.direction == "droite"){
        this.aliens.position.x+=this.velocityEnnemi;
        this.aliensForme.position.x+=this.velocityEnnemi;
    }
    else if(this.direction == "gauche"){
        this.aliens.position.x-=this.velocityEnnemi;
        this.aliensForme.position.x-=this.velocityEnnemi;
    }
}

environnement.prototype.detecteEnnemi = function(){
    if(this.player.uneBalle){
        var position = new THREE.Vector3(this.player.uneBalle.position.x,this.player.uneBalle.position.y,this.player.uneBalle.position.z);
        var directions = new Array();
            directions.push(new THREE.Vector3(0,0,this.player.uneBalle.vitesse/10));
            directions.push(new THREE.Vector3(0.01,0,0));
            directions.push(new THREE.Vector3(-0.01,0,0));
        for(var j = 0 ; j < directions.length ; j++){
                this.raycasterBalleAllie.set(position,directions[j]);
                for(var i = 0 ; i < this.aliens.children.length-1 ; i++){
                    var intersects = this.raycasterBalleAllie.intersectObjects( this.aliens.children[i].children, true );
                        if(intersects.length!=0){
                            //console.log(this.aliens.children[i].getObjectById(intersects[0].object.uuid));

                                //if(this.player.uneBalle.position.z<=intersects[0].object.position.z){
                            var id = intersects[0].object.uuid;
                            //console.log(intersects[0].object.uuid);
                            this.remove(this.player.uneBalle);
                            this.player.uneBalle=undefined;
                            this.aliens.children[i].remove(intersects[0].object);

                            this.aliensForme.children[i].remove(this.aliensForme.children[i].getObjectByName(id));
                            //console.log(this.aliens.children[i].length);
                            if(this.aliens.children[i].children.length==0){
                                            this.aliens.remove(this.aliens.children[i]);
                                            this.aliensForme.remove(this.aliensForme.children[i]);
                            }

                        }
                }
        }
    }
    return false;
}

environnement.prototype.detecteJoueurToucher = function(balle){
        var position = new THREE.Vector3(balle.position.x+this.aliens.position.x,
                                         balle.position.y+this.aliens.position.y,
                                         balle.position.z+this.aliens.position.z);
                                         
        var directions = new Array();
            directions.push(new THREE.Vector3(0,0,balle.vitesse/10));
            directions.push(new THREE.Vector3(0.01,0,0));
            directions.push(new THREE.Vector3(-0.01,0,0));
            
        for(var j = 0 ; j < directions.length ; j++){
                this.raycasterBalleAllie.set(position,directions[j]);
                    var intersects = this.raycasterBalleAllie.intersectObjects( this.hitBoxPlayer.children, true );
                        if(intersects.length!=0){
                            this.enCours = false;
                            this.aliens.balles.remove(balle);
                            return true;
                        }
        }
        return false;
}

environnement.prototype.detecterDefenseToucher = function(balle){
	        var position = new THREE.Vector3(balle.position.x+this.aliens.position.x,
                                         balle.position.y+this.aliens.position.y,
                                         balle.position.z+this.aliens.position.z);
                                         
        var directions = new Array();
            directions.push(new THREE.Vector3(0,0,balle.vitesse/10));
            directions.push(new THREE.Vector3(0.01,0,0));
            directions.push(new THREE.Vector3(-0.01,0,0));
            
        for(var j = 0 ; j < directions.length ; j++){
                this.raycasterBalleAllie.set(position,directions[j]);
                for(var i=0; i<this.sol.defenses.length; i++){
                	var intersects = this.raycasterBalleAllie.intersectObjects(this.sol.defenses[i].children, true );
                        if(intersects.length!=0){
                            return this.sol.defenses[i];
                        }
                }
                    
         }
         return undefined;
}

environnement.prototype.mouvementEnnemi = function(){

    if(this.aliens.position.x>=100)
        this.deplacementEnnemi("gauche");
    else if(this.aliens.position.x<=-100-(env.aliens.nbRanges*4-4))
        this.deplacementEnnemi("droite");
    else
        this.deplacementEnnemi();
}