<template>
  <div
    class="text-center"
    v-show="loading"
    style="text-align: center; margin-top: 1%"
  >
    <div
      class="v-sync v-sync1"
      v-bind:style="[spinnerStyle, spinnerDelay1]"
    ></div>
    <div
      class="v-sync v-sync2"
      v-bind:style="[spinnerStyle, spinnerDelay2]"
    ></div>
    <div
      class="v-sync v-sync3"
      v-bind:style="[spinnerStyle, spinnerDelay3]"
    ></div>
  </div>
</template>

<script>
export default {
  name: "SyncLoader",

  props: {
    loading: {
      type: Boolean,
      default: true,
    },
    color: {
      type: String,
      default: "#FEB9AA",
    },
    size: {
      type: String,
      default: "1rem",
    },
    margin: {
      type: String,
      default: "0.25rem",
    },
    radius: {
      type: String,
      default: "100%",
    },
  },
  data() {
    return {
      spinnerStyle: {
        backgroundColor: this.color,
        height: this.size,
        width: this.size,
        margin: this.margin,
        borderRadius: this.radius,

        display: "inline-block",
        animationName: "v-syncStretchDelay",
        animationDuration: "0.6s",
        animationIterationCount: "infinite",
        animationTimingFunction: "ease-in-out",
        animationFillMode: "both",
      },
      spinnerDelay1: {
        animationDelay: "0.07s",
      },
      spinnerDelay2: {
        animationDelay: "0.14s",
      },
      spinnerDelay3: {
        animationDelay: "0.21s",
      },
    };
  },
};
</script>

<style>
@-webkit-keyframes v-syncStretchDelay {
  33% {
    -webkit-transform: translateY(10px);
    transform: translateY(10px);
  }
  66% {
    -webkit-transform: translateY(-10px);
    transform: translateY(-10px);
  }
  100% {
    -webkit-transform: translateY(0);
    transform: translateY(0);
  }
}

@keyframes v-syncStretchDelay {
  33% {
    -webkit-transform: translateY(10px);
    transform: translateY(10px);
  }
  66% {
    -webkit-transform: translateY(-10px);
    transform: translateY(-10px);
  }
  100% {
    -webkit-transform: translateY(0);
    transform: translateY(0);
  }
}
</style>
