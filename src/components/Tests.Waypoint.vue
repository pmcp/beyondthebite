<template>
  <div v-waypoint="{ active: true, callback: onWaypoint, options: intersectionOptions }">WAYPOINT</div>
</template>

<script>
export default {
  data: () => ({
    intersectionOptions: {
      root: null,
      rootMargin: '0px 0px 0px 0px',
      threshold: [0, 1] // [0.25, 0.75] if you want a 25% offset!
    } // https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API
  }),
  methods: {
    onWaypoint ({ going, direction }) {
      // going: in, out
      // direction: top, right, bottom, left
      if (going === this.$waypointMap.GOING_IN) {
        
        console.log('waypoint going in!')
        this.$emit('in', 10000)
      }

      if (direction === this.$waypointMap.DIRECTION_TOP) {
        console.log('waypoint going top!')
      }
    }
  }
}
</script>
