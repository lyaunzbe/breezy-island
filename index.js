import {
  polyfill
}
from 'es6-promise'
polyfill()

const $ = require('jqlite');

import THREE from 'three'
import domready from 'domready'
import viewer from './src/viewer'
import loadGeometry from './src/load-json-model'
import loadTexture from './src/load-texture'
import loadAudio from './src/load-audio'
import assign from 'object-assign'
import findMedia from './src/find-media'
import loadVideo from './src/load-video'
import CanvasTex from './src/add-canvas-tex'
import p5Tex from './src/p5tex';
import addBackground from './src/add-background'

domready(() => {
  let p5tex = new p5Tex();
  p5tex.init();
  // let ctex = new CanvasTex();
  // ctex.init();


  assign(document.body.style, {
    background: 'transparent',
    overflow: 'hidden',
    margin: 0
  })

  setTimeout(function() {
    const app = viewer({
      alpha: true,
      preserveDrawingBuffer: false,
      antialias: true
    }, null);

    $('body').prepend(app.canvas);
    app.start();

  },100);

  // findMedia().then((media) =>{
  //   loadVideo(media.images.original.mp4).then((vid) =>{
  //
  //   })
  //   // console.log(media);
  //
  // })

  // addBackground(app, vid);
  // app.controls.enabled = true;

})
