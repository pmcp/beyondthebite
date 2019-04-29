require("normalize.css/normalize.css");
require("./styles/index.scss");

import updateOnScroll from "uos";
import anime from "animejs";



let animateRoad = anime({
  targets: ".road__container path",
  strokeDashoffset: [anime.setDashoffset, 0],
  // easing: 'easeInOutSine',
  duration: 1000
});


function Drawing(id) {
  this.animation = anime({
    targets: "#" + id + " path",
    strokeDashoffset: [anime.setDashoffset, 0],
    // delay: function(el, i) { return i * 250 },
    duration: 1000,
    easing: 'easeInOutSine',
  });
}


let drawings = {}
drawings.drawingOne = new Drawing('drawingOne');
drawings.drawingTwo = new Drawing('drawingTwo');


// Seek location on timeline
let scrollToTimelineRoad = function(scrollPercentage){
  animateRoad.seek(animateRoad.duration * scrollPercentage/10);
}


document.addEventListener("scroll", function() {
  let h = document.documentElement,
    b = document.body,
    st = "scrollTop",
    sh = "scrollHeight";
  // Need to doc this, but this was horrible, document.documentElement.scrollHeight kept changing in other browsers due to ThreeJS (I think)
  function getDocHeight() {
    var D = document;
    return Math.max(
      D.body.scrollHeight,
      D.documentElement.scrollHeight,
      D.body.offsetHeight,
      D.documentElement.offsetHeight,
      D.body.clientHeight,
      D.documentElement.clientHeight
    );
  }

  let scrollPercentage =
    (h[st] || b[st]) / ((getDocHeight() || b[sh]) - h.clientHeight);
    scrollToTimelineRoad(scrollPercentage)
});



scrollToTimelineRoad(0);







function listVisibleBoxes() {
    
  $(".animate_svg").each(function () {
      const screenTop = window.pageYOffset || document.documentElement.scrollTop;
      const screenBottom = (window.pageYOffset || document.documentElement.scrollTop) + $(window).height();
      const boxTop = $(this).offset().top;
      const boxHeight = $(this).height();
      const boxBottom = boxTop + boxHeight;
      const ani = drawings[this.id].animation;     
      if(boxTop > screenTop) {
          if(boxBottom < screenBottom) {
              ani.seek(ani.duration * 100);
          } else if(boxTop < screenBottom) {
              let percent = (screenBottom - boxTop) / boxHeight;
              console.log(percent)
              ani.seek(ani.duration * percent);              
          }
      } else if(boxBottom > screenTop) {
          let percent = (screenBottom - boxTop) / boxHeight;
          ani.seek(ani.duration * percent);
      }
  });
  
}

$(function () {
  listVisibleBoxes();
  $(window).on("scroll", function() {
    console.log('scrolling')
    listVisibleBoxes();
  });
  
});

