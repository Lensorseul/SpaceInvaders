/*** this file define all the invaders and a wave of invaders ***/
/** Invaders data definition **/

var invader2_data = [];
invader2_data = [	[0,0,0,2,0,0,0,0,0,2,0,0,0],
					[0,0,0,0,2,0,0,0,2,0,0,0,0],
					[0,0,0,0,2,0,0,0,2,0,0,0,0],
					[0,0,0,6,6,6,6,6,6,6,0,0,0],
					[0,0,2,6,0,6,6,6,0,6,2,0,0],
					[0,2,0,6,0,6,6,6,0,6,0,2,0],
					[0,2,0,6,6,6,6,6,6,6,0,2,0],
					[0,2,0,2,0,0,0,0,0,2,0,2,0],
					[0,2,0,0,2,2,0,2,2,0,0,2,0]];
				
var invader_data = [];		
invader_data = [	[0,0,0,0,0,2,2,2,0,0,0,0,0],
					[0,0,0,0,6,6,6,6,6,0,0,0,0],
					[0,0,0,6,6,6,6,6,6,6,6,0,0],
					[0,0,6,6,0,6,6,6,0,6,6,0,0],
					[0,0,6,6,6,6,6,6,6,6,6,0,0],
					[0,0,0,2,0,2,2,2,0,2,0,0,0],
					[0,0,2,0,0,0,0,0,0,0,2,0,0],
					[0,0,0,2,0,0,0,0,0,2,0,0,0],
					[0,0,0,0,2,0,0,0,2,0,0,0,0]];

var invader1_data = [];
invader1_data = [	[0,0,0,0,2,0,0,0,2,0,0,0,0],
					[0,0,0,0,0,2,0,2,0,0,0,0,0],
					[0,0,0,6,6,6,6,6,6,6,0,0,0],
					[0,0,6,6,6,6,6,6,6,6,6,0,0],
					[0,6,6,6,0,6,6,6,0,6,6,6,0],
					[2,0,6,6,6,6,6,6,6,6,6,0,2],
					[2,0,0,6,6,6,6,6,6,6,0,0,2],
					[0,0,0,0,2,0,0,0,2,0,0,0,0],
					[0,0,2,2,0,0,0,0,0,2,2,0,0]];
				
var invader3_data = [];
invader3_data = [	[0,0,0,0,2,0,0,0,2,0,0,0,0],
					[0,0,0,0,0,2,0,2,0,0,0,0,0],
					[0,6,6,6,6,6,6,6,6,6,6,6,0],
					[6,6,6,0,0,6,6,6,0,0,6,6,6],
					[6,6,6,6,6,6,6,6,6,6,6,6,6],
					[0,6,6,6,6,6,6,6,6,6,6,6,0],
					[0,0,0,0,2,0,2,0,2,0,0,0,0],
					[0,0,0,2,0,2,0,2,0,2,0,0,0],
					[0,2,2,0,0,0,2,0,0,0,2,2,0]];
				
var invader4_data = [];
invader4_data = [	[0,0,0,0,2,0,0,0,2,0,0,0,0],
					[0,0,0,0,0,2,0,2,0,0,0,0,0],
					[0,0,6,6,6,6,6,6,6,6,6,0,0],
					[0,6,6,6,6,6,6,6,6,6,6,6,0],
					[6,6,6,0,0,6,6,6,0,0,6,6,6],
					[0,6,6,6,6,6,6,6,6,6,6,6,0],
					[0,0,6,6,6,6,6,6,6,6,6,0,0],
					[0,0,0,0,2,0,2,0,2,0,0,0,0],
					[0,0,0,2,0,0,0,0,0,2,0,0,0]];
					
var invader5_data = [];
invader5_data = [	[0,0,0,0,0,6,6,6,6,6,6,0,0,0,0,0],
					[0,0,0,6,6,6,6,6,6,6,6,6,6,0,0,0],
					[0,0,6,6,6,6,6,6,6,6,6,6,6,6,0,0],
					[0,6,6,6,0,6,6,0,6,0,6,6,0,6,6,0],
					[6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6],
					[0,0,2,2,2,0,0,2,2,0,0,2,2,2,0,0],
					[0,0,0,2,0,0,0,0,0,0,0,0,2,0,0,0]];
				
function invader(mat,materiel){
	THREE.Group.call(this);
	this.invaderdata=mat;
		
	//invaders geometry
	this.invadergeo2 = new THREE.BoxGeometry(1,1,1);
	this.invadergeo4 = new THREE.BoxGeometry(1,1,4);
	this.invadergeo6 = new THREE.BoxGeometry(1,1,1);
	this.invadergeo8 = new THREE.BoxGeometry(1,1,8);
	this.invadergeo10 = new THREE.BoxGeometry(1,1,10);
        this.invader1_material = materiel;
	//this.invader1_material = new THREE.MeshLambertMaterial({color:  0xFFFFFF});
	
var geo = new THREE.Geometry();
	for (var i=0; i<this.invaderdata.length ; i++){
  		for (var j=0; j<this.invaderdata[0].length ; j++){
                    if (this.invaderdata[i][j] == 2){
      		var unitary_mesh = new THREE.Mesh(this.invadergeo2,this.invader1_material);
      		unitary_mesh.position.set(i,j,1);
                unitary_mesh.updateMatrix();
                geo.merge(unitary_mesh.geometry,unitary_mesh.matrix);
    	}
    	if (this.invaderdata[i][j] == 4){
      		var unitary_mesh = new THREE.Mesh(this.invadergeo4,this.invader1_material);
      		unitary_mesh.position.set(i,j,1);
                unitary_mesh.updateMatrix();
                geo.merge(unitary_mesh.geometry,unitary_mesh.matrix);
    	}
    	if (this.invaderdata[i][j] == 6){
      		var unitary_mesh = new THREE.Mesh(this.invadergeo6,this.invader1_material);
      		unitary_mesh.position.set(i,j,0);
                unitary_mesh.updateMatrix();
                geo.merge(unitary_mesh.geometry,unitary_mesh.matrix);
    	}
    	if (this.invaderdata[i][j] == 8){
     		var unitary_mesh = new THREE.Mesh(this.invadergeo8,this.invader1_material);
      		unitary_mesh.position.set(i,j,-1);
                unitary_mesh.updateMatrix();
                geo.merge(unitary_mesh.geometry,unitary_mesh.matrix);
    	}
    	if (this.invaderdata[i][j] == 10){
     		var unitary_mesh = new THREE.Mesh(this.invadergeo10,this.invader1_material);
      		unitary_mesh.position.set(i,j,-2);
                unitary_mesh.updateMatrix();
                geo.merge(unitary_mesh.geometry,unitary_mesh.matrix);
    	}
    
  	}
	}
        this.add(new THREE.Mesh(geo,this.invader1_material));
	this.rotation.z=270*(3.1415/180);
}

invader.prototype = Object.create(THREE.Group.prototype);
invader.prototype.constructor = invader;