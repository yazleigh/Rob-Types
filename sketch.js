function preload(){
  song = loadSound("type.mp3")
  playing = false
  song.onended(() => {playing = false; document.getElementById("audio").innerText = "Play"; a = 0})
  fr = 60
}

function setup() {
  createCanvas(500, 500);
  layer = createGraphics(width, height)
  
  background('black')
  
  fft = new p5.FFT(0, 256);
  
  a = 360/((song.duration()) * fr)
  b = a
  
  frameRate(fr)
  
  //layer.clear()
}

function draw() {
  
  background('black');
    
  layer.noFill()
  layer.colorMode(RGB)
  
  var spectrumA = fft.analyze()
  var spectrumB = spectrumA.reverse()
  spectrumB.splice(0, 40)
  
  push()
  translate(250, 250)
  noFill()
  stroke(245, 142, 219)
  
  
  beginShape()
    
    for(let i = 0; i < spectrumB.length; i++){
      var amp = spectrumB[i]
      var x = map(amp, 0, 256, -2, 2)
      var y = map(i, 0, spectrumB.length, 30, 215)
      
      vertex(x, y)
    }
  endShape()
  
  pop()
  
  
  push()
    
    translate(width/2, height/2)
    rotate(radians(a))
  
    layer.push()
      layer.translate(width/2, height/2)
      layer.rotate(radians(-a))
      
      for(let i = 0; i < spectrumB.length; i++){
      
      layer.strokeWeight(0.018 * spectrumB[i])
      layer.stroke(255 , 255, 255 + spectrumB[i], spectrumB[i]/40)
      layer.line(0, i, 0, i)
    }
  
    layer.pop()
    
    image(layer, -width/2, -height/2)
  pop()
  
  if(playing)a += b
  
}

function toggleAudio(){
  if(!playing){
    song.play()
    console.log("playing")
    document.getElementById("audio").innerText = "Pause"   
  }
  else{
    song.pause()
    console.log("pasued")
    document.getElementById("audio").innerText = "Play"
  }
  
  playing = !playing
}