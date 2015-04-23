//Design du sol 

function sol(){
	THREE.Group.call(this);
        this.boxv= new Array();
        this.boxcolor= new Array();
	this.zone = new THREE.BoxGeometry( 450, 4, 4000 );
	this.boxh = new THREE.BoxGeometry( 470, 4, 1 );
        for(var i = 0 ; i < 8 ; i++)
            this.boxv[i] = new THREE.BoxGeometry( 20, 4, 4000 );
        this.boxcolorH = new THREE.MeshPhongMaterial({color: 0x33FF00});
        for(var i = 0 ; i < 8 ; i++)
            this.boxcolor[i] = new THREE.MeshPhongMaterial({color: 0x33FF00});
	this.boxesh = new Array();
	this.boxesv = new Array();
	
	for(var i=0; i<100; i++ ){
			this.boxesh[i] = new THREE.Mesh(this.boxh,this.boxcolorH);
			this.boxesh[i].position.y = 0;
			this.boxesh[i].position.z = i*40-2000;
			this.add(this.boxesh[i]);
	}
	
	for(var i=0; i<8; i++ ){
			this.boxesv[i] = new THREE.Mesh(this.boxv[i],this.boxcolor[i]);
			this.boxesv[i].position.y = -1;
			this.boxesv[i].position.x = i*64-225;
			this.add(this.boxesv[i]);
	}
	
	//createjs.Tween.get(box, {loop: true}, true).set({opacity: "0"}, box.style).wait(Math.random() * 1000 + 1 | 0).call(updateColor).to({top: y, left: x, width: 16, height: 4, opacity: 1}, Math.random() * 1500 + 1000, easeIn);

    sol = new createjs.Stage(renderer.domElement);                
    createjs.Tween.get(sol, {loop: true}, true)
    .to({colorSeed: 51}, 5)
    .call(loopHandle);

                
}var colorSeed = 50;

loopHandle = function(event) {
    for(var i = 0 ; i < 8 ; i++){
        couleur = "rgb("+ (0 + Math.floor(Math.random() * 150))+","+ (100 + Math.floor(Math.random() * 255))+","+ (0 + Math.floor(Math.random() * 150))+")";
        env.sol.boxcolor[i].color = new THREE.Color(couleur);
    }
    couleur = "rgb("+ (0 + Math.floor(Math.random() * 150))+","+ (100 + Math.floor(Math.random() * 255))+","+ (0 + Math.floor(Math.random() * 150))+")";
    env.sol.boxcolorH.color = new THREE.Color(couleur);
    colorSeed = 50;
}

sol.prototype = Object.create(THREE.Group.prototype);
sol.prototype.constructor = sol;