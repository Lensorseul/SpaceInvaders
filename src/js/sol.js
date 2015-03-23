//Design du sol 

function sol(){
	THREE.Group.call(this);
	this.defenses = new Array();
	this.zone = new THREE.BoxGeometry( 400, 1, 4000 );
	this.boxh = new THREE.BoxGeometry( 400, 1, 1 );
	this.boxv = new THREE.BoxGeometry( 1, 1, 4000 );

	this.boxcolor = new THREE.MeshPhongMaterial({color: 0x33FF00});
	this.boxesh = new Array();
	this.boxesv = new Array();
	
	for(var i=0; i<100; i++ ){
			this.boxesh[i] = new THREE.Mesh(this.boxh,this.boxcolor);
			this.boxesh[i].position.y = 3;
			this.boxesh[i].position.z = i*40-2000;
			this.add(this.boxesh[i]);
	}
	
	for(var i=0; i<11; i++ ){
			this.boxesv[i] = new THREE.Mesh(this.boxv,this.boxcolor);
			this.boxesv[i].position.y = 3;
			this.boxesv[i].position.x = i*40-200;
			this.add(this.boxesv[i]);
	}
	
	for(var i=0; i<3; i++){
		this.defenses[i] = new defense(defense_data);
		this.defenses[i].position.x = i*100-100;
		this.defenses[i].position.z = 100;
		this.defenses[i].position.y = 10;
		this.add(this.defenses[i]);
	}
	
}

sol.prototype = Object.create(THREE.Group.prototype);
sol.prototype.constructor = sol;