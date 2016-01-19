const p5 = require('p5');
const $ = require('jqlite');

import Element from './wanderer';
import music from './music';
import events from './events';

import getGif from './find-media';

export default class {

  constructor () {
    this.p5instance = null;
    this.canvas = null;
  }
  init () {
    this.p5instance = new p5(this.sketch.bind(this));
  }
  sketch(p) {
    let cursor;
  	let elements;
  	let emotes, shapes;
  	let despair, dissapointment, heh, okay, sad, cool, ok, sos, brush;
  	let index;
  	let bg;
    let hue;
    let bpm;
    let hueIncrement;
    let _this = this;
    let mouseMovedLast = Date.now();
    let smoothedBPM = 150;
    let start = Date.now();
    let beatHit = false;
    let lastGIFSwitch = null;
    let gifCollection = [
      'http://media3.giphy.com/media/tMIlpns0pywqQ/giphy.gif',
      'http://media2.giphy.com/media/12Dnf7QeGjDNVS/giphy.gif',
      'http://media2.giphy.com/media/VfJVLsmYzacsE/giphy.gif',
      'http://media0.giphy.com/media/F2RK8wRFtRExq/giphy.gif',
      'http://media2.giphy.com/media/PjMvp0oZKK90c/giphy.gif',
      'http://media2.giphy.com/media/LQqJp4mgWHS5G/giphy.gif',
      'http://media4.giphy.com/media/xpqdG0EWMR0kg/giphy.gif',
      'http://media0.giphy.com/media/FcjFRdprFJHZ6/giphy.gif',
      'http://media1.giphy.com/media/d5xLYOkjRNUrK/giphy.gif',
      'http://media.giphy.com/media/Qw4X3FM5UtA1OKdOn4I/giphy.gif',
      'https://media.giphy.com/media/b0uFCAItzJZZu/giphy.gif',
      'https://media.giphy.com/media/TG8YhV85Pkwta/giphy.gif',
      'https://media.giphy.com/media/IWoZqzqk7LZn2/giphy.gif',
      'https://media.giphy.com/media/jMAqG14dTDJhm/giphy.gif',

    ];

    p.preload = function () {
      // okay = p.loadImage('src/emoji/okay.png');
    }

    p.setup = function() {
      music.init();
      hue =  p.random(0,255);
      hueIncrement = 0.55;
      window.music = music;
      // p.createCanvas(p.windowWidth, p.windowHeight);
      // let defaultCanvas0 = $('#defaultCanvas0');
      // $('#defaultCanvas0').remove();
      // $('body').prepend(defaultCanvas0);
  		p.noStroke();
  		p.smooth();
      // _this.canvas = p.canvas;
      p.colorMode('HSB', 255);
      bg = p.color(169,255,200, 1.999);
      bpm = music.getActualBPM();
      let x = getGif().then(function(result){
        $('.x1').append('<x-gif class="xgif" src="'+gifCollection[ gifCollection.length-2]+'" snap  ping-pong bpm="'+bpm+'"></x-gif>');
        $('.x2').append('<x-gif class="xgif" src="'+gifCollection[ gifCollection.length-2]+'" snap ping-pong bpm="'+bpm+'"></x-gif>');
        $('.x3').append('<x-gif class="xgif" src="'+gifCollection[ gifCollection.length-2]+'" snap ping-pong bpm="'+bpm+'"></x-gif>');
        $('.x4').append('<x-gif class="xgif" src="'+gifCollection[ gifCollection.length-2]+'" snap ping-pong bpm="'+bpm+'"></x-gif>');

        // $('.x2').append('<x-gif class="xgif" src="'+gifCollection[Math.round(p.random(0, gifCollection.length-1))]+'" snap ping-pong bpm="'+bpm+'"></x-gif>');
        // $('.x3').append('<x-gif class="xgif" src="'+gifCollection[Math.round(p.random(0, gifCollection.length-1))]+'" snap ping-pong snap bpm="'+bpm+'"></x-gif>');
        // $('.x4').append('<x-gif class="xgif" src="'+gifCollection[Math.round(p.random(0, gifCollection.length-1))]+'" snap ping-pong bpm="'+bpm+'"></x-gif>');

      })
      events.registerEvent('onBeat', function () {
        beatHit = true;
      }.bind(this))

    }
    p.mouseMoved = function () {
      mouseMovedLast = Date.now();
    }

    p.draw = function() {
      // p.background(bg);

      music.update();
      // console.log(music.level())
      let currentTime = (Date.now() - start)/1000;
      // console.log(currentTime);
      if (music.level() && (music.level() >= 0.35) && beatHit && (!lastGIFSwitch || ((Date.now() - lastGIFSwitch)/1000) > .5)) {
        lastGIFSwitch = Date.now();

        beatHit = false;
        // getGif().then(function(result){
        //   console.log(result)
        //   $('.xgif').attr('src', result.image_url );
        // })
        // $('.xgif').attr('src', gifCollection[Math.round(p.random(0, gifCollection.length-1))] );


        // if (p.random(0, 100) > 50) {
        //   if ($('.x1').css('visibility') === 'visible') {
        //     $('.x1').css('visibility', 'hidden') ;
        //   }else{
        //     $('.x1').css('visibility', 'visible') ;
        //   }
        //   if ($('.x4').css('visibility') === 'visible') {
        //     $('.x4').css('visibility', 'hidden') ;
        //   }else{
        //     $('.x4').css('visibility', 'visible') ;
        //   }
        //
        // } else {
        //   if ($('.x2').css('visibility') === 'visible') {
        //     $('.x2').css('visibility', 'hidden') ;
        //   }else{
        //     $('.x2').css('visibility', 'visible') ;
        //   }
        //   if ($('.x3').css('visibility') === 'visible') {
        //     $('.x3').css('visibility', 'hidden') ;
        //   }else{
        //     $('.x3').css('visibility', 'visible') ;
        //   }
        //
        // }

      }

      if(music.getBPM() ){
        beatHit = false;
        smoothedBPM += (Math.round(music.getBPM()) - smoothedBPM) *0.1;
        if (p.frameCount % 60.0 === 0){
          $('.x1 .xgif').replaceWith('<x-gif class="xgif" src="'+ gifCollection[ gifCollection.length-2]+'" ping-pong snap bpm="'+smoothedBPM+'"></x-gif>');
          $('.x2 .xgif').replaceWith('<x-gif class="xgif" src="'+ gifCollection[ gifCollection.length-2]+'" ping-pong snap bpm="'+smoothedBPM+'"></x-gif>');
          $('.x3 .xgif').replaceWith('<x-gif class="xgif" src="'+ gifCollection[ gifCollection.length-2]+'" ping-pong snap bpm="'+smoothedBPM+'"></x-gif>');
          $('.x4 .xgif').replaceWith('<x-gif class="xgif" src="'+ gifCollection[ gifCollection.length-2]+'" ping-pong snap bpm="'+smoothedBPM+'"></x-gif>');


        }

      }
      $('.x1').css('top', 65 + (Math.sin(p.frameCount/150.0)*10) + "%");
      $('.x2').css('top', 65 + (Math.sin(p.frameCount/150.0)*-10)+ "%");
      $('.x3').css('top', 65 + (Math.sin(p.frameCount/150.0)*10)+ "%");
      $('.x4').css('top', 65 + (Math.sin(p.frameCount/150.0)*-10)+ "%");

      $('.x1').css('left', 15 + (Math.sin(p.frameCount/150.0)*5) + "%");
      $('.x2').css('left', 35 + (Math.sin(p.frameCount/150.0)*-5)+ "%");
      $('.x3').css('left', 55 + (Math.sin(p.frameCount/150.0)*5)+ "%");
      $('.x4').css('left', 75 + (Math.sin(p.frameCount/150.0)*-5)+ "%");

      // $('.xgif').attr('bpm', Math.round(smoothedBPM));

      // (0 1 2 3)(4 5 6 7)(8 9 10 11)( 12 13 14 15)
      // console.log(music.levelsData())
      // console.log($('body'));
      let levelsData = music.levelsData();
      // lodash_
      // let partioned = [
      //   [levelsData[0], levelsData[1], levelsData[2], levelsData[3]],
      //   [levelsData[4], levelsData[5], levelsData[6], levelsData[7]],
      //   [levelsData[8], levelsData[9], levelsData[10], levelsData[11]],
      //   [levelsData[12], levelsData[13], levelsData[14], levelsData[15]]
      // ];

      // let mouseIsMoving = !((Date.now()-mouseMovedLast) > 2000);

  		// for (var i = 0; i < elements.length; i++) {
  		// 	elements[i].wander(music,mouseIsMoving);
  		// 	elements[i].run(music);
  		// 	// elements[i].mousesMoved(elements[10].location.x,elements[10].location.y);
  		// }
  		// element.wander();
  		// element.run();
  	}
  }

}
