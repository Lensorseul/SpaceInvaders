function environnement(nbDeRangees, nbParLigne, vitesseEnnemi, vitesseBalleEnnemi, frequence, lvl) {
    THREE.Scene.call(this);
    this.camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 1, 10000);
    //this.cameraControls = new THREE.OrbitControls(this.camera);
    this.level = lvl;
    this.score = 0;
    this.hitBoxPlayer = new hitBoxPlayer();
    this.hitBoxPlayer.name ="Hitboxplayer";
    this.player = new joueur();
    this.player.name ="player";
    this.aliens = new groupHitBox(nbDeRangees, nbParLigne);
    this.aliensForme = new groupAlien(nbDeRangees, nbParLigne, vitesseBalleEnnemi, frequence);
    this.direction;
    this.raycasterBalleAllie = new THREE.Raycaster();
    this.raycasterEnnemi = new THREE.Raycaster();
    this.sol = new sol();
    this.defense = new defenseScn();
    this.sol.receiveShadow = true;
    this.enCours = false;
    this.nbDeVie = 3;
    this.velocityEnnemi = vitesseEnnemi;
    this.velocityBalleEnnemi = vitesseBalleEnnemi;
    this.nbRangees = nbDeRangees;
    this.nbLigne = nbParLigne;
    this.frequence = frequence;
    this.modeInvincible = false;
    this.raycasterBalleAllie.far = 3;
    this.raycasterEnnemi.far = 3;
    this.ext1 = new exterieurMove();
    this.ext1.position.x = 100;
    this.ext1.position.y = -350;
    this.add(this.ext1);
    this.lancement();
    this.nbTween = 0;
    var spotlight = new THREE.SpotLight();
    spotlight.position.set(200, 200, 200);
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
                size: 5,
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



    var materialFront = new THREE.MeshPhongMaterial({color: 0x33FF00});
    var materialSide = new THREE.MeshPhongMaterial({color: 0x009900});
    var materialArray = [materialFront, materialSide];
    var textGeom = new THREE.TextGeometry("Space Invaders !",
            {
                size: 30, height: 4, curveSegments: 3,
                font: "gentilis", weight: "bold", style: "normal",
                bevelThickness: 1, bevelSize: 2, bevelEnabled: true,
                material: 0, extrudeMaterial: 1
            });

    var textMaterial = new THREE.MeshFaceMaterial(materialArray);
    var textMesh = new THREE.Mesh(textGeom, textMaterial);

    textGeom.computeBoundingBox();
    var textWidth = textGeom.boundingBox.max.x - textGeom.boundingBox.min.x;

    textMesh.position.set(-0.5 * textWidth, 150, -300);
    textMesh.rotation.x = -Math.PI / 11;
    this.add(textMesh);
    
    var materialFront = new THREE.MeshPhongMaterial({color: 0x33FF00});
    var materialSide = new THREE.MeshPhongMaterial({color: 0x009900});
    var materialArray = [materialFront, materialSide];
    var textGeom = new THREE.TextGeometry("Score "+this.score,
            {
                size: 15, height: 4, curveSegments: 3,
                font: "gentilis", weight: "bold", style: "normal",
                bevelThickness: 1, bevelSize: 2, bevelEnabled: true,
                material: 0, extrudeMaterial: 1
            });

    textMaterial = new THREE.MeshFaceMaterial(materialArray);
    this.textvalscore = new THREE.Mesh(textGeom, textMaterial);

    textGeom.computeBoundingBox();
    var textWidth = textGeom.boundingBox.max.x - textGeom.boundingBox.min.x;

    this.textvalscore.position.set(-0.5 * textWidth, 100, -300);
    this.textvalscore.rotation.x = -Math.PI / 11;
    this.add(this.textvalscore);
}

environnement.prototype = Object.create(THREE.Scene.prototype);
environnement.prototype.constructor = environnement;

environnement.prototype.lancement = function () {
    var materialFront = new THREE.MeshPhongMaterial({color: 0x33FF00});
    var materialSide = new THREE.MeshPhongMaterial({color: 0x009900});
    var materialArray = [materialFront, materialSide];
    var textGeom = new THREE.TextGeometry("Commencer !",
            {
                size: 20, height: 4, curveSegments: 3,
                font: "gentilis", weight: "bold", style: "normal",
                bevelThickness: 1, bevelSize: 2, bevelEnabled: true,
                material: 0, extrudeMaterial: 1
            });

    var textMaterial = new THREE.MeshFaceMaterial(materialArray);
    this.commencer = new THREE.Mesh(textGeom, textMaterial);

    textGeom.computeBoundingBox();
    var textWidth = textGeom.boundingBox.max.x - textGeom.boundingBox.min.x;

    this.commencer.position.set(-0.5 * textWidth, 50, -150);
    this.commencer.rotation.x = -Math.PI / 11;
    this.add(this.commencer);
}
environnement.prototype.finlancement = function () {
    this.remove(this.commencer);
}

environnement.prototype.toucher = function () {
    var materialFront = new THREE.MeshPhongMaterial({color: 0x33FF00});
    var materialSide = new THREE.MeshPhongMaterial({color: 0x009900});
    var materialArray = [materialFront, materialSide];
    var textGeom = new THREE.TextGeometry("Vous avez été touché !",
            {
                size: 15, height: 4, curveSegments: 3,
                font: "gentilis", weight: "bold", style: "normal",
                bevelThickness: 1, bevelSize: 2, bevelEnabled: true,
                material: 0, extrudeMaterial: 1
            });

    var textMaterial = new THREE.MeshFaceMaterial(materialArray);
    this.textvousavezetetouche = new THREE.Mesh(textGeom, textMaterial);

    textGeom.computeBoundingBox();
    var textWidth = textGeom.boundingBox.max.x - textGeom.boundingBox.min.x;

    this.textvousavezetetouche.position.set(-0.5 * textWidth, 50, -150);
    this.textvousavezetetouche.rotation.x = -Math.PI / 11;
    this.add(this.textvousavezetetouche);


    var materialFront = new THREE.MeshPhongMaterial({color: 0x33FF00});
    var materialSide = new THREE.MeshPhongMaterial({color: 0x009900});
    var materialArray = [materialFront, materialSide];
    var textGeom = new THREE.TextGeometry("Continuer",
            {
                size: 10, height: 4, curveSegments: 3,
                font: "gentilis", weight: "bold", style: "normal",
                bevelThickness: 1, bevelSize: 2, bevelEnabled: true,
                material: 0, extrudeMaterial: 1
            });

    var textMaterial = new THREE.MeshFaceMaterial(materialArray);
    this.textcontinuert = new THREE.Mesh(textGeom, textMaterial);

    textGeom.computeBoundingBox();
    var textWidth = textGeom.boundingBox.max.x - textGeom.boundingBox.min.x;

    this.textcontinuert.position.set(-0.5 * textWidth, 30, -130);
    this.textcontinuert.rotation.x = -Math.PI / 11;
    this.add(this.textcontinuert );

    var materialFront = new THREE.MeshPhongMaterial({color: 0x33FF00});
    var materialSide = new THREE.MeshPhongMaterial({color: 0x009900});
    var materialArray = [materialFront, materialSide];
    var textGeom = new THREE.TextGeometry("Recommencer",
            {
                size: 10, height: 4, curveSegments: 3,
                font: "gentilis", weight: "bold", style: "normal",
                bevelThickness: 1, bevelSize: 2, bevelEnabled: true,
                material: 0, extrudeMaterial: 1
            });

    var textMaterial = new THREE.MeshFaceMaterial(materialArray);
    this.textrecommencert = new THREE.Mesh(textGeom, textMaterial);

    textGeom.computeBoundingBox();
    var textWidth = textGeom.boundingBox.max.x - textGeom.boundingBox.min.x;

    this.textrecommencert.position.set(-0.5 * textWidth, 10, -110);
    this.textrecommencert.rotation.x = -Math.PI / 11;
    this.add(this.textrecommencert);
}

environnement.prototype.fintoucher = function () {
    this.remove(this.textvousavezetetouche);
    this.remove(this.textcontinuert);    
    this.remove(this.textrecommencert);
}


environnement.prototype.vieepuise = function () {
    sound.effects["game_over"].play();
    var materialFront = new THREE.MeshPhongMaterial({color: 0x33FF00});
    var materialSide = new THREE.MeshPhongMaterial({color: 0x009900});
    var materialArray = [materialFront, materialSide];
    var textGeom = new THREE.TextGeometry("Vous avez perdu !",
            {
                size: 15, height: 4, curveSegments: 3,
                font: "gentilis", weight: "bold", style: "normal",
                bevelThickness: 1, bevelSize: 2, bevelEnabled: true,
                material: 0, extrudeMaterial: 1
            });

    var textMaterial = new THREE.MeshFaceMaterial(materialArray);
    this.textperdu = new THREE.Mesh(textGeom, textMaterial);

    textGeom.computeBoundingBox();
    var textWidth = textGeom.boundingBox.max.x - textGeom.boundingBox.min.x;

    this.textperdu.position.set(-0.5 * textWidth, 30, -150);
    this.textperdu.rotation.x = -Math.PI / 12;
    this.add(this.textperdu);

    var materialFront = new THREE.MeshPhongMaterial({color: 0x33FF00});
    var materialSide = new THREE.MeshPhongMaterial({color: 0x009900});
    var materialArray = [materialFront, materialSide];
    var textGeom = new THREE.TextGeometry("Recommencer",
            {
                size: 10, height: 4, curveSegments: 3,
                font: "helvetiker", weight: "bold", style: "normal",
                bevelThickness: 1, bevelSize: 2, bevelEnabled: true,
                material: 0, extrudeMaterial: 1
            });

    var textMaterial = new THREE.MeshFaceMaterial(materialArray);
    this.textrecommencer = new THREE.Mesh(textGeom, textMaterial);

    textGeom.computeBoundingBox();
    var textWidth = textGeom.boundingBox.max.x - textGeom.boundingBox.min.x;

    this.textrecommencer.position.set(-0.5 * textWidth, 10, -130);
    this.textrecommencer.rotation.x = -Math.PI / 12;
    this.add(this.textrecommencer);
}

environnement.prototype.finperdu = function () {
    this.remove(this.textperdu);
    this.remove(this.textrecommencer);
}


environnement.prototype.gagner = function () {
    sound.effects["complete"].play();
    var materialFront = new THREE.MeshPhongMaterial({color: 0x33FF00});
    var materialSide = new THREE.MeshPhongMaterial({color: 0x009900});
    var materialArray = [materialFront, materialSide];
    var textGeom = new THREE.TextGeometry("Vous avez gagné !",
            {
                size: 15, height: 4, curveSegments: 3,
                font: "gentilis", weight: "bold", style: "normal",
                bevelThickness: 1, bevelSize: 2, bevelEnabled: true,
                material: 0, extrudeMaterial: 1
            });

    var textMaterial = new THREE.MeshFaceMaterial(materialArray);
    this.textvousavezgagne = new THREE.Mesh(textGeom, textMaterial);

    textGeom.computeBoundingBox();
    var textWidth = textGeom.boundingBox.max.x - textGeom.boundingBox.min.x;

    this.textvousavezgagne.position.set(-0.5 * textWidth, 50, -150);
    this.textvousavezgagne.rotation.x = -Math.PI / 12;
    this.add(this.textvousavezgagne);


    var materialFront = new THREE.MeshPhongMaterial({color: 0x33FF00});
    var materialSide = new THREE.MeshPhongMaterial({color: 0x009900});
    var materialArray = [materialFront, materialSide];
    var textGeom = new THREE.TextGeometry("Continuer",
            {
                size: 10, height: 4, curveSegments: 3,
                font: "gentilis", weight: "bold", style: "normal",
                bevelThickness: 1, bevelSize: 2, bevelEnabled: true,
                material: 0, extrudeMaterial: 1
            });

    var textMaterial = new THREE.MeshFaceMaterial(materialArray);
    this.textcontinuer1 = new THREE.Mesh(textGeom, textMaterial);

    textGeom.computeBoundingBox();
    var textWidth = textGeom.boundingBox.max.x - textGeom.boundingBox.min.x;

    this.textcontinuer1.position.set(-0.5 * textWidth, 30, -130);
    this.textcontinuer1.rotation.x = -Math.PI / 12;
    this.add(this.textcontinuer1);
}

environnement.prototype.fingagner = function () {
    this.remove(this.textvousavezgagne);
    this.remove(this.textcontinuer1);
}


environnement.prototype.reinit = function (nbDeRangees, nbParLigne, vitesseEnnemi, vitesseBalleEnnemi, frequence, lvl) {
    this.remove(this.defense);
    this.remove(this.player.uneBalle);
    this.remove(this.player);
    this.remove(this.hitBoxPlayer);
    this.remove(this.aliens);
    this.remove(this.aliensForme);
    this.level=lvl;
    this.nbDeVie = 3;
    this.hitBoxPlayer = new hitBoxPlayer();
    this.player = new joueur();
    this.aliens = new groupHitBox(nbDeRangees, nbParLigne);
    this.aliensForme = new groupAlien(nbDeRangees, nbParLigne, vitesseBalleEnnemi, frequence);
    this.velocityEnnemi = vitesseEnnemi;
    this.velocityBalleEnnemi = vitesseBalleEnnemi;
    this.nbRangees = nbDeRangees;
    this.nbLigne = nbParLigne;
    this.frequence = frequence;
    this.defense = new defenseScn();
    this.add(this.player);
    this.add(this.hitBoxPlayer);
    this.add(this.aliens);
    this.add(this.aliensForme);
    this.add(this.defense);
    this.player.position.y = 3;
    this.player.position.z = 85;
    this.nbTween = 0;
    if(indiceNiveauCourant===2){
        this.aliens.position.z-=100;
        this.aliensForme.position.z-=100;
        this.chefEnnemi =new invader(invader5_data,new THREE.MeshLambertMaterial({color:  0x18391E}));
        this.chefEnnemi.scale.set(5,5,5);
        this.chefEnnemi.position.z =-300;
        this.chefEnnemi.position.y =70;
        this.chefEnnemi.position.x =-35;
        this.add(this.chefEnnemi);
        this.balleChef;
    chef = new createjs.Stage(renderer.domElement);                
    createjs.Tween.get(chef, {loop: true}, true)
    .to({colorchef: 51}, 5)
    .call(chefHandle);
    this.tirchef();
    }

}
var tweenBalleChef;
var colorchef = 51;
chefHandle = function(event) {
        couleur = "rgb("+ (0 + Math.floor(Math.random() * 150))+","+ (100 + Math.floor(Math.random() * 255))+","+ (0 + Math.floor(Math.random() * 150))+")";
        env.chefEnnemi.invader1_material.color = new THREE.Color(couleur);
    colorchef = 50;
}
handleBalleChef = function(event) {
    env.balleChef.position.z=tweenBalleChef.z;
    env.balleChef.position.y=tweenBalleChef.y;
    env.balleChef.position.x=tweenBalleChef.x;
    if(!env.modeInvincible && env.enCours){
        if(env.balleChef.position.x>=env.hitBoxPlayer.position.x-12 && env.balleChef.position.x<env.hitBoxPlayer.position.x+20
                && env.balleChef.position.z>=env.hitBoxPlayer.position.z && env.balleChef.position.z<env.hitBoxPlayer.position.z+20){
            env.remove(env.balleChef);
            delete env.balleChef;
            env.enCours = false;
            if (env.nbDeVie > 0) {
                env.toucher();
                targetContinuer.push(env.textcontinuert);
                targetRecommencer.push(env.textrecommencert);
            } else {
                env.vieepuise();
                targetRecommencer.push(env.textrecommencer);
            }
        }
    }
    if(tweenBalleChef.z >= env.player.position.z+49){
        env.remove(env.balleChef);
        delete env.balleChef;
    }
}
deleteBalleChef = function(event) {
    if(indiceNiveauCourant==2)
        env.tirchef();
    else{
        env.remove(env.chefEnnemi);
    }
}
environnement.prototype.tirchef = function () {
       this.balleChef = new balleEnnemi(4,4,this.chefEnnemi.material);
    this.balleChef.position.y = this.chefEnnemi.position.y;
    this.balleChef.position.z = this.chefEnnemi.position.z;
    this.balleChef.scale.set(4,1,4);
    this.add(this.balleChef);
    sound.effects["laser"].stop();
    sound.effects["laser"].play();
    tweenBalleChef = new createjs.Stage(renderer.domElement);
    tweenBalleChef.z=this.balleChef.position.z;
    tweenBalleChef.y=this.balleChef.position.y;
    tweenBalleChef.x=this.balleChef.position.x;
    createjs.Tween.get(tweenBalleChef).to({x:this.player.position.x,y:this.player.position.y-10,z:this.player.position.z+50}, 2000).wait(1000).call(deleteBalleChef).addEventListener("change", handleBalleChef);

}
environnement.prototype.init = function () {
    //ajout des éléments sur la scene
    this.add(this.camera);
    this.add(this.sol);
    this.add(this.player);
    this.add(this.hitBoxPlayer);
    this.add(this.aliens);
    this.add(this.aliensForme);
    this.add(this.defense);
    this.direction = "droite";
    this.nbTween = 0;

    // positionnement des elements
    this.sol.position.z -= 50;
    this.sol.position.y -= 10;
    this.player.position.y = 3;
    this.player.position.z = 85;
    this.camera.position.x = (cameras[indiceCameraCourant]["position"].x);
    this.camera.position.y = (cameras[indiceCameraCourant]["position"].y);
    this.camera.position.z = (cameras[indiceCameraCourant]["position"].z);
    this.camera.lookAt(cameras[indiceCameraCourant]["lookat"]);
};

environnement.prototype.moveBalleJoueur = function () {
    if (this.player.uneBalle) {
        if (this.player.uneBalle.position.z > this.player.position.z || this.player.uneBalle.position.z < -350) {
            this.remove(this.player.uneBalle);
            this.player.uneBalle = undefined;
        }
        else {
            this.player.uneBalle.move();
            //this.detecterToucheJoueur();
        }
    }
}

environnement.prototype.moveEnv = function () {
    this.particleSystem.rotation.x += 0.009;
}


environnement.prototype.action1 = function () {
    this.ext1.rotation.x += 0.01;
}

environnement.prototype.moveSol = function () {
    for (var i = 0; i < 100; i++) {
        if (this.sol.boxesh[i].position.z == 2000) {
            this.sol.boxesh[i].position.z = -2000;
        }
        this.sol.boxesh[i].position.z += 2;
    }

}


environnement.prototype.moveBalleEnnemi = function () {
    if (this.aliensForme.balles.length != 0) {
        for (var i = 0; i < this.aliensForme.balles.children.length; i++) {
            if ((this.aliensForme.balles.children[i].position.z + this.aliensForme.position.z - 10) > this.player.position.z) {
                this.aliensForme.balles.remove(this.aliensForme.balles.children[i]);
            }
            else {
                this.aliensForme.balles.children[i].move();
                if (this.enCours)
                    if (this.detecteJoueurToucher(this.aliensForme.balles.children[i])) {
                        return false;
                    }
                var defensetouche = this.detecterDefenseToucher(this.aliensForme.balles.children[i]);
                if (defensetouche != undefined) {
                    var indice = this.defense.defenses.indexOf(defensetouche);
                    if (indice > -1) {
                        if (this.defense.defenses[indice].children.length > 5) {
                            for (var k = 0; k < 10; k++) {
                                this.defense.defenses[indice].remove(this.defense.defenses[indice].children[k]);
                            }
                        } else {
                            this.defense.remove(this.defense.defenses[indice]);
                        }
                    }
                    this.aliensForme.balles.remove(this.aliensForme.balles.children[i]);
                }
            }
        }
    }
    return true;
}


environnement.prototype.deplacementEnnemi = function (dir,inv) {
    if (dir == "gauche" || dir == "droite") {
        if(!inv){
            this.aliens.position.z += 5;
            this.aliensForme.position.z += 5;
        }
        this.direction = dir;
    }
    if (this.direction == "droite") {
        for(var i = 0 ; i < this.aliens.children.length ; i++){
            this.aliens.children[i].position.x += this.velocityEnnemi;
            this.aliensForme.children[i].position.x += this.velocityEnnemi;
        }
    }
    else if (this.direction == "gauche") {
        for(var i = 0 ; i < this.aliens.children.length ; i++){
            this.aliens.children[i].position.x -= this.velocityEnnemi;
            this.aliensForme.children[i].position.x -= this.velocityEnnemi;
        }
    }
}

environnement.prototype.reinitScore = function(){
    this.score = 0;
    this.majScore();
}
environnement.prototype.majScore = function(){
    this.remove(this.textvalscore);
    var materialFront = new THREE.MeshPhongMaterial({color: 0x33FF00});
    var materialSide = new THREE.MeshPhongMaterial({color: 0x009900});
    var materialArray = [materialFront, materialSide];
    var textGeom = new THREE.TextGeometry("Score "+this.score,
            {
                size: 15, height: 4, curveSegments: 3,
                font: "gentilis", weight: "bold", style: "normal",
                bevelThickness: 1, bevelSize: 2, bevelEnabled: true,
                material: 0, extrudeMaterial: 1
            });

    var textMaterial = new THREE.MeshFaceMaterial(materialArray);
    this.textvalscore = new THREE.Mesh(textGeom, textMaterial);

    textGeom.computeBoundingBox();
    var textWidth = textGeom.boundingBox.max.x - textGeom.boundingBox.min.x;

    this.textvalscore.position.set(-0.5 * textWidth, 100, -300);
    this.textvalscore.rotation.x = -Math.PI / 11;
    this.add(this.textvalscore);
}
var newQueen= new Array();
supprEnnemiTween = function(i,ali,range){

    newQueen = ali.clone();
    env.add(newQueen);
    newQueen.position.x += env.aliensForme.children[range].position.x;
    newQueen.position.y += env.aliensForme.children[range].position.y;
    newQueen.position.z += env.aliensForme.children[range].position.z+env.aliensForme.position.z;
                    enn = new createjs.Stage(renderer.domElement);
                    enn.x = newQueen.position.x;
                    enn.y = newQueen.position.y;
                    enn.z = newQueen.position.z;
                    createjs.Tween.get(enn)
                            .to({x : 0
                                ,y : 100, z:-300}, 200)
                            .call(handleSuppr)
                            .addEventListener("change", handleEnnemi);
}
handleEnnemi = function(event) {
    newQueen.position.x= enn.x;
    newQueen.position.y = enn.y;
    newQueen.position.z = enn.z;
}
handleSuppr = function(event) {
    env.remove(newQueen);
    if(env.level==1){
        env.score += 100;
    }else if(env.level ==  2){
        env.score += 200;
    }else if(env.level == 3){
        env.score += 300;
    }
    env.majScore();
    console.log(env.textvalscore.material.materials[1].color);
        scoreC = new createjs.Stage(renderer.domElement);  
        env.textvalscore.material.materials[0].color.r = 1;
        env.textvalscore.material.materials[0].color.g = 0.2;
        env.textvalscore.material.materials[1].color.r = 1;
        env.textvalscore.material.materials[1].color.g = 0;
        scoreC.r0=env.textvalscore.material.materials[0].color.r;
        scoreC.g0=env.textvalscore.material.materials[0].color.g;
        scoreC.r1=env.textvalscore.material.materials[1].color.r;
        scoreC.g1=env.textvalscore.material.materials[1].color.g;
    createjs.Tween.get(scoreC)
    .to({r1: 0, g1:0.6 , r0:0.2, g0:1}, 500)
    .addEventListener("change",couleurHandle);

                
}

couleurHandle = function(event) {
        env.textvalscore.material.materials[0].color.r = scoreC.r0;
        env.textvalscore.material.materials[0].color.g = scoreC.g0;
        env.textvalscore.material.materials[1].color.r = scoreC.r1;
        env.textvalscore.material.materials[1].color.g = scoreC.g1;
}
environnement.prototype.detecteEnnemi = function () {
    if (this.player.uneBalle) {
        var position = new THREE.Vector3(this.player.uneBalle.position.x, this.player.uneBalle.position.y, this.player.uneBalle.position.z);
        var directions = new Array();
        directions.push(new THREE.Vector3(0, 0, this.player.uneBalle.vitesse / 10));
        directions.push(new THREE.Vector3(0.01, 0, 0));
        directions.push(new THREE.Vector3(-0.01, 0, 0));
        for (var j = 0; j < directions.length; j++) {
            this.raycasterBalleAllie.set(position, directions[j]);
            for (var i = 0; i < this.aliens.children.length; i++) {
                var intersects = this.raycasterBalleAllie.intersectObjects(this.aliens.children[i].children, true);
                if (intersects.length != 0) {
                    var id = intersects[0].object.uuid;
                    this.remove(this.player.uneBalle);
                    this.player.uneBalle = undefined;
                    this.aliens.children[i].remove(intersects[0].object);
                    console.log(this.level);
                    supprEnnemiTween(this.nbTween,this.aliensForme.children[i].getObjectByName(id),i);
                    this.nbTween++;
                    this.aliensForme.children[i].remove(this.aliensForme.children[i].getObjectByName(id));
                    
                    if (this.aliens.children[i].children.length == 0) {
                        this.aliens.remove(this.aliens.children[i]);
                        this.aliensForme.remove(this.aliensForme.children[i]);
                    }

                }
            }
        }
        this.raycasterBalleAllie.set(position, directions[0]);
        for (var i = 0; i < this.defense.defenses.length; i++) {
                var intersects = this.raycasterBalleAllie.intersectObjects(this.defense.defenses[i].children, true);
                if (intersects.length != 0) {
                    this.remove(this.player.uneBalle);
                    this.player.uneBalle = undefined;
                    this.defense.defenses[i].children[i].remove(intersects[0].object);
                    var indice = this.defense.defenses.indexOf(this.defense.defenses[i]);
                    if (indice > -1) {
                        if (this.defense.defenses[indice].children.length > 31) {
                            var taille =this.defense.defenses[indice].children.length-10;
                            for (var k = this.defense.defenses[indice].children.length; k > taille; k--) {
                                this.defense.defenses[indice].remove(this.defense.defenses[indice].children[k]);
                            }
                        } else {
                            if (this.defense.defenses[indice].children.length > 9){
                                for (var k = 0; k < this.defense.defenses[indice].children.length; k++) {
                                    this.defense.defenses[indice].remove(this.defense.defenses[indice].children[k]);
                                }
                            }
                            else
                                while (this.defense.defenses[indice].children.length!=0) {
                                    this.defense.defenses[indice].remove(this.defense.defenses[indice].children[0]);
                                }
                        }
                    }
                }
        }
    }
    return false;
}

environnement.prototype.detecteJoueurToucher = function (balle) {
    var position = new THREE.Vector3(balle.position.x + this.aliens.position.x,
            balle.position.y + this.aliens.position.y,
            balle.position.z + this.aliens.position.z);

    var directions = new Array();
    directions.push(new THREE.Vector3(0, 0, balle.vitesse / 10));
    directions.push(new THREE.Vector3(0.01, 0, 0));
    directions.push(new THREE.Vector3(-0.01, 0, 0));

    for (var j = 0; j < directions.length; j++) {
        this.raycasterBalleAllie.set(position, directions[j]);
        var intersects = this.raycasterBalleAllie.intersectObjects(this.hitBoxPlayer.children, true);
        if (intersects.length != 0) {
            if (!this.modeInvincible)
                this.enCours = false;
            this.aliensForme.balles.remove(balle);
            return true;
        }
    }
    return false;
}

environnement.prototype.detecterDefenseToucher = function (balle) {
    var position = new THREE.Vector3(balle.position.x + this.aliens.position.x,
            balle.position.y + this.aliens.position.y,
            balle.position.z + this.aliens.position.z);

    var directions = new Array();
    directions.push(new THREE.Vector3(0, 0, balle.vitesse / 10));
    directions.push(new THREE.Vector3(0.01, 0, 0));
    directions.push(new THREE.Vector3(-0.01, 0, 0));

    for (var j = 0; j < directions.length; j++) {
        this.raycasterBalleAllie.set(position, directions[j]);
        for (var i = 0; i < this.defense.defenses.length; i++) {
            var intersects = this.raycasterBalleAllie.intersectObjects(this.defense.defenses[i].children, true);
            if (intersects.length != 0) {
                return this.defense.defenses[i];
            }
        }

    }
    return undefined;
}                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               

environnement.prototype.mouvementEnnemi = function (inv) {
    if(this.aliens.children.length!=0){      
        if (this.aliens.children[this.aliens.children.length-1].position.x>= 200)
            this.deplacementEnnemi("gauche",inv);
        else if (this.aliens.children[0].position.x <= -200)
            this.deplacementEnnemi("droite",inv);
        else
            this.deplacementEnnemi();
    }
}