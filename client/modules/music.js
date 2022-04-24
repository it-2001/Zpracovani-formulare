class AudioPLR {
    constructor() {
        this.bg = {
            tracks:{},
            playing: null, 
            Volume: 50,
            muted: false,
            add(name, src){
                this.tracks[name] = new Audio(src)
                var song = this.tracks[name]
                song.volume = this.Volume / 100
                song.loop = true
            },
            play(name){
                if(this.playing != null && this.playing != name){
                    this.tracks[this.playing].pause()
                    this.tracks[this.playing].currentTime = 0
                }
                this.playing = name
                this.tracks[name].play()
            },
            pause(){
                this.tracks[this.playing].pause()
            },
            volume(value){
                this.Volume += value
                this.Volume = overUnderFlow(this.Volume, 0, 100)
                for(var i in this.tracks)
                    this.tracks[i].volume = this.Volume / 100
                return this.Volume
            },
            mute(){
                if(this.muted){
                    this.muted = false
                    for(var i in this.tracks)
                        this.tracks[i].volume = this.Volume / 100
                    return true
                }
                this.muted = true
                for(var i in this.tracks)
                    this.tracks[i].volume = 0
                return false
            }
        }
        this.sfx = {
            tracks:{},
            Volume: 50,
            playing: [],
            add(name, src){/*
                this.tracks[name] = new Audio(src)
                var song = this.tracks[name]
                song.volume = this.Volume / 100
                song.loop = false*/
                this.tracks[name] = src
            },
            play(name){
                /*this.tracks[name].play()*/
                var song = new Audio(this.tracks[name])
                this.playing.push(song)
                song.volume = this.Volume / 100
                song.play()
            },
            pause(){
                for(var i in this.playing){
                    this.playing[i].pause()
                }
            },
            volume(value){
                this.Volume += value
                this.Volume = overUnderFlow(this.Volume, 0, 100)
                for(var i in this.playing)
                    this.playing[i].volume = this.Volume / 100
                return this.Volume
            },
            mute(){
                if(this.muted){
                    this.muted = false
                    for(var i in this.playing)
                        this.playing[i].volume = this.Volume / 100
                    return true
                }
                this.muted = true
                for(var i in this.playing)
                    this.playing[i].volume = 0
                return false
            }
        }
    }
}