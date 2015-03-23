var ship_data= [];

ship_data = [		[0,0,0,0,0,0,0,0,0,0,0,0,0],
					[0,0,0,0,0,0,4,0,0,0,0,0,0],
					[0,0,0,0,0,4,4,4,0,0,0,0,0],
					[0,4,6,6,6,8,8,8,6,6,6,4,0],
					[4,4,6,6,6,8,10,8,6,6,6,4,4],
					[0,4,6,6,6,8,8,8,6,6,6,4,0],
					[0,0,0,0,0,4,4,4,0,0,0,0,0],
					[0,0,0,0,0,0,4,0,0,0,0,0,0],
					[0,0,0,0,0,0,0,0,0,0,0,0,0]];
 

function vaisseau(mat){
	THREE.Group.call(this);
	this.shipdata = mat;
	
	this.invadergeo2 = new THREE.BoxGeometry(1,1,2);
	this.invadergeo4 = new THREE.BoxGeometry(1,1,4);
	this.invadergeo6 = new THREE.BoxGeometry(1,1,6);
	this.invadergeo8 = new THREE.BoxGeometry(1,1,8);
	this.invadergeo10 = new THREE.BoxGeometry(1,1,10);

	this.shipmaterial = new THREE.MeshLambertMaterial();	
	
        var geo = new THREE.Geometry();
	for (var i=0; i<this.shipdata.length ; i++){
  		for (var j=0; j<this.shipdata[0].length ; j++){
    	if (this.shipdata[i][j] == 4){
      		var unitary_mesh = new THREE.Mesh(this.invadergeo4,this.shipmaterial);
      		unitary_mesh.position.set(i,j,1);
                unitary_mesh.updateMatrix();
                geo.merge(unitary_mesh.geometry,unitary_mesh.matrix);
    	}
    	if (this.shipdata[i][j] == 6){
      		var unitary_mesh = new THREE.Mesh(this.invadergeo6,this.shipmaterial);
      		unitary_mesh.position.set(i,j,0);
                unitary_mesh.updateMatrix();
                geo.merge(unitary_mesh.geometry,unitary_mesh.matrix);
    	}
    	if (this.shipdata[i][j] == 8){
     		var unitary_mesh = new THREE.Mesh(this.invadergeo8,this.shipmaterial);
      		unitary_mesh.position.set(i,j,-1);
                unitary_mesh.updateMatrix();
                geo.merge(unitary_mesh.geometry,unitary_mesh.matrix);
    	}
    	if (this.shipdata[i][j] == 10){
     		var unitary_mesh = new THREE.Mesh(this.invadergeo10,this.shipmaterial);
      		unitary_mesh.position.set(i,j,-2);
                unitary_mesh.updateMatrix();
                geo.merge(unitary_mesh.geometry,unitary_mesh.matrix);
    	}
    
  	}
	}
        this.add(new THREE.Mesh(geo,this.shipmaterial));
	this.rotation.z=270*(3.1415/180);
	
}

vaisseau.prototype = Object.create(THREE.Group.prototype);
vaisseau.prototype.constructor = vaisseau;




