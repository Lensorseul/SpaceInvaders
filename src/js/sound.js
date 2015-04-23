function sound() {
    this.musics = new Array();
    this.effects = new Array();
    this.effec_is_on = true;
    this.musics_is_on = true;
    this.musics["stronger"] = new buzz.sound("src/medias/sounds/musics/Stronger.mp3");
    this.musics["stronger"].setVolume(50);
    this.effects["complete"] = new buzz.sound("src/medias/sounds/effects/complete.mp3");
    this.effects["game_over"] = new buzz.sound("src/medias/sounds/effects/game_over.mp3");
    this.effects["impulse_canon"] = new buzz.sound("src/medias/sounds/effects/impulse_canon.mp3");
    this.effects["laser"] = new buzz.sound("src/medias/sounds/effects/laser.mp3");
    this.effects["shield"] = new buzz.sound("src/medias/sounds/effects/shield.mp3");
}

sound.prototype.muteMusics = function () {
    this.music_is_on = !this.music_is_on;
    console.log("ici");
    if (this.music_is_on) {
         document.getElementById("music").innerHTML = "<a onclick='sound.muteMusics()'>Unmute musique</a>";
    } else {
        document.getElementById("music").innerHTML = "<a onclick='sound.muteMusics()'>Mute musique</a>";
       
    }
    for (var sound in this.musics) {
        this.musics[sound].toggleMute();
    }
};

sound.prototype.muteEffects = function () {
    this.effec_is_on = !this.effec_is_on;

    if (this.effec_is_on) {
        document.getElementById("effect").innerHTML = "<a onclick='sound.muteEffects()'>Mute effets</a>";
    } else {
        document.getElementById("effect").innerHTML = "<a onclick='sound.muteEffects()'>Unmute effets</a>";
    }
    for (var sound in this.effects) {
        this.effects[sound].toggleMute();
    }
};