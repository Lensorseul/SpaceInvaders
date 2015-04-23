var tes;var tesTween;var logo;var opac;var canva;var bitmap;var text;
function debuter(){
            // add Stats.js - https://github.com/mrdoob/stats.js
    stats = new Stats();
    stats.domElement.style.position	= 'absolute';
    stats.domElement.style.bottom	= '0px';
    document.body.appendChild( stats.domElement );
    env.camera.position.x = 0;
    env.camera.position.y = 600;
    env.camera.position.z = 40;
    env.camera.lookAt(new THREE.Vector3(0,0,-40)); 
    renderer.render( env, env.camera );
    logo = new createjs.Stage(renderer.domElement);
    logo.alpha = 0;

    
    bitmap = new createjs.Bitmap("src/medias/images/vie.png");

    logo.addChild(bitmap);
    createjs.Tween.get(logo).to({alpha:1}, 2000).call(anim).addEventListener("change", handleChange);
    
     text = new createjs.Text("Hello World", "20px Arial", "#ff7700");
 text.x = 100;
 text.textBaseline = "alphabetic";
    //canva = new createjs.Stage("gipCanvas");


    //canva.addChild(text);
    //createjs.Ticker.addEventListener("tick", handleTick);

        //console.log(document.getElementById("gipCanvas").firstChild);
    
}
 /*function handleTick(event) {
     bitmap.x += 10;
     logo.update();
 }*/
function handleComplete() {
   
    indiceCameraCourant=0;
    document.getElementById("popHelp").style.display = "block";
}
 function handleChange(event) {
    bitmap.x += 10;
    bitmap.y += 10;
    bitmap.z += 10;
    renderer.render( env, env.camera );

 }
  function handleChangeAnim(event) {
    env.camera.position.z = logo.z;
    env.camera.position.y = logo.y;
    env.camera.lookAt({x :0,y :0,z :env.camera.position.z *(-1)*(300/200) });
    renderer.render( env, env.camera );
 }
 function anim() {
    logo.x = env.camera.position.x;
    logo.y = env.camera.position.y;
    logo.z = env.camera.position.z;
    createjs.Tween.get(logo).to({x : 0, y : 60, z:300}, 2000).wait(500).call(handleComplete).addEventListener("change", handleChangeAnim);
 }

function commencer(){
    document.getElementById("popHelp").style.display = "none";
    document.getElementById("popHelp").style.marginTop = "";
    env.enCours = true;
    animate();
}