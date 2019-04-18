<template>
  <div style="height: 400vh;left:50%;position:relative;top:30vh;">

    <svg
      style="position: relative;"
      id="star-svg"
      height="60%"
      viewBox="0 0 158 852"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        id="star-path"
        d="M52 2C71.5 3.16667 108.8 24.8 102 102C93.5 198.5 2.00004 282 2.00003 334C2 557.5 176.201 638 153 767C140.5 836.5 2.00003 1077 52 1326C92 1525.2 102 1638.33 102 1670"
        stroke="black"
        stroke-width="1"
      />
    </svg>
  </div>
</template>


<script>
export default {
  props: {},
  data: () => ({ thex: null }),

  methods: {},
  mounted() {
    // Get a reference to the <path>
    var path = document.querySelector("#star-path");

    // Get length of path... ~577px in this case
    var pathLength = path.getTotalLength();

    // Make very long dashes (the length of the path itself)
    path.style.strokeDasharray = pathLength + " " + pathLength;

    // Offset the dashes so the it appears hidden entirely
    path.style.strokeDashoffset = pathLength;

    // Jake Archibald says so
    // https://jakearchibald.com/2013/animated-line-drawing-svg/
    path.getBoundingClientRect();

    // When the page scrolls...
    window.addEventListener("scroll", function(e) {
      // What % down is it?
      // https://stackoverflow.com/questions/2387136/cross-browser-method-to-determine-vertical-scroll-percentage-in-javascript/2387222#2387222
      // Had to try three or four differnet methods here. Kind of a cross-browser nightmare.
      var scrollPercentage =
        (document.documentElement.scrollTop + document.body.scrollTop) /
        (document.documentElement.scrollHeight -
          document.documentElement.clientHeight);

      // Length to offset the dashes
      var drawLength = pathLength * scrollPercentage;

      // Draw in reverse
      path.style.strokeDashoffset = pathLength - drawLength;

      // When complete, remove the dash array, otherwise shape isn't quite sharp
      // Accounts for fuzzy math
      if (scrollPercentage >= 0.99) {
        path.style.strokeDasharray = "none";
      } else {
        path.style.strokeDasharray = pathLength + " " + pathLength;
      }
    });
  }
};
</script>
