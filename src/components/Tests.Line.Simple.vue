<template>
  <div style="height: 400vh;left:10%;position:absolute;top:10vh;width:100%;">

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
        stroke-width=".2"
      />
    </svg>

  </div>
</template>


<script>
export default {
  props: {},
  data: () => ({ position: 300 }),

  mounted() {

    var path = document.querySelector("#star-path");
    var pathLength = path.getTotalLength();
    path.style.strokeDasharray = pathLength + " " + pathLength;
    path.style.strokeDashoffset = pathLength;
    path.getBoundingClientRect();
    var timer = null;
    window.addEventListener("scroll", function(e) {
      var scrollPercentage =
        (document.documentElement.scrollTop + document.body.scrollTop) /
        (document.documentElement.scrollHeight -
          document.documentElement.clientHeight);
      var drawLength = pathLength * scrollPercentage;
      path.style.strokeDashoffset = pathLength - drawLength;
      if (scrollPercentage >= 0.99) {
        path.style.strokeDasharray = "none";
      } else {
        path.style.strokeDasharray = pathLength + " " + pathLength;
      }
    });






  }



};
</script>
