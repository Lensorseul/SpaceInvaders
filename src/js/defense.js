var defense_data = [];

defense_data = [	[0,0,0,6,6,6,6,6,6,6,6,6,6,0,0,0],
					[0,0,6,6,6,6,6,6,6,6,6,6,6,6,0,0],
					[0,6,6,6,6,6,6,6,6,6,6,6,6,6,6,0],
					[6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6],
					[6,6,6,6,6,0,0,0,0,0,0,6,6,6,6,6],
					[6,6,6,6,0,0,0,0,0,0,0,0,6,6,6,6],
					[6,6,6,6,0,0,0,0,0,0,0,0,6,6,6,6],
					[6,6,6,6,0,0,0,0,0,0,0,0,6,6,6,6],
					[6,6,6,6,0,0,0,0,0,0,0,0,6,6,6,6]];
 
function defense(mat){
	THREE.Group.call(this);
	this.defensedata = mat;

	this.invadergeo6 = new THREE.BoxGeometry(1,1,6);

	this.defensematerial = new THREE.MeshPhongMaterial({color:  0x33FF00});	
	
	for (var i=0; i<this.defensedata.length ; i++){
  		for (var j=0; j<this.defensedata[0].length ; j++){
	    	if (this.defensedata[i][j] == 6){
	      		var unitary_mesh = new THREE.Mesh(this.invadergeo6,this.defensematerial);
	      		unitary_mesh.position.set(i,j,0);
	      		this.add(unitary_mesh);
	    	}
  		}
	}
	this.rotation.z=270*(3.1415/180);
	this.rotation.x=270*(3.1415/180);
	
}

defense.prototype = Object.create(THREE.Group.prototype);
defense.prototype.constructor = defense;