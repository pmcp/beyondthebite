require("normalize.css/normalize.css");
require("./styles/index.scss");

import updateOnScroll from "uos";
import anime from "animejs";
import { SSL_OP_SSLEAY_080_CLIENT_DH_BUG } from "constants";



let animateRoad = anime({
  targets: ".road__container path ",
  strokeDashoffset: [anime.setDashoffset, 0],
  // easing: 'easeInOutSine',
  duration: 1000
});


function Drawing(id) {


  
  // this.animation = anime({
  //   targets: "#" + id + " path",
  //   strokeDashoffset: [anime.setDashoffset, 0],
  //   // delay: function(el, i) { return i * 250 },
  //   duration: 1000,
  //   easing: 'easeInOutSine',

  // });

  this.animation = anime.timeline({})
  .add({
    targets: "#" + id + " path.animatedRoad",
    strokeDashoffset: [anime.setDashoffset, 0],
    // delay: function(el, i) { return i * 250 },
    duration: 1000,
    easing: 'easeInOutSine',
  })
  .add({
    targets: "#" + id + " path.animatedLine",
    strokeDashoffset: [anime.setDashoffset, 0],
    duration: 1000,   
    easing: 'easeInOutSine',
  })
}


let drawings = {}
drawings.drawingOne = new Drawing('drawingOne');
drawings.drawingTwo = new Drawing('drawingTwo');
drawings.drawingThree = new Drawing('drawingThree');
drawings.drawingFour = new Drawing('drawingFour');
drawings.drawingFive = new Drawing('drawingFive');






// // Get jQuery out of here <3
// function drawRoads() {
//   $(".animate_road").each(function () {
//     console.log('test')
//       const screenTop = window.pageYOffset || document.documentElement.scrollTop;
//       const screenBottom = (window.pageYOffset || document.documentElement.scrollTop) + $(window).height();
//       const boxTop = $(this).offset().top;
//       const boxHeight = $(this).height();
//       const boxBottom = boxTop + boxHeight;
//       const ani = drawings[this.id].animation;     


//       let percent = (screenBottom - boxTop) / boxHeight;
//        ani.seek(ani.duration * percent * 0.6);            
//   });
// }

// Get jQuery out of here <3
function drawChapters() {
  $(".animate_svg").each(function () {
      const screenTop = window.pageYOffset || document.documentElement.scrollTop;
      const screenBottom = (window.pageYOffset || document.documentElement.scrollTop) + $(window).height();
      const boxTop = $(this).offset().top;
      const boxHeight = $(this).height();
      const boxBottom = boxTop + boxHeight;
      const ani = drawings[this.id].animation;     
      ani.seek(ani.duration * 100);
      if(boxTop > screenTop) {
        // ani.seek(ani.duration * 100);
          if(boxBottom < screenBottom -200) {
            console.log('test 1')
              ani.seek(ani.duration * 100);
          } else if(boxTop < screenBottom) {
            console.log('test 2')
              let percent = (screenBottom - boxTop -200) / boxHeight;
              ani.seek(ani.duration * percent);            
          }
      } else if(boxBottom > screenTop) {
        console.log('test 2')
          let percent = (screenBottom - boxTop) / boxHeight;
          ani.seek(ani.duration);
      }
  });
}

$(function () {
  drawChapters();
  // drawRoads();
  $(window).on("scroll", function() {
    drawChapters();
    // drawRoads();
  });
  
});

