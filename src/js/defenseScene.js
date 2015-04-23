//Design du sol 

function defenseScn(){
	THREE.Group.call(this);
	this.defenses = new Array();

	for(var i=0; i<3; i++){
		this.defenses[i] = new defense(defense_data);
		this.defenses[i].position.x = i*150-170;
		this.defenses[i].position.z = 50;
		this.defenses[i].position.y = 0;
                this.defenses[i].scale.set(1,3,1);
		this.add(this.defenses[i]);
	}
             
}

defenseScn.prototype = Object.create(THREE.Group.prototype);
defenseScn.prototype.constructor = defenseScn;