<template>
  <div class="revolver">
    <section class="revolver__part"></section>
    <section class="revolver__part"></section>
    <section class="revolver__part"></section>
    <section class="revolver__part"></section>
    <section class="revolver__part"></section>
    <section class="revolver__part"></section>
  </div>
</template>

<script>
export default {
  name: "AppLoader"
}
</script>

<style lang="scss" scoped>
// Options
$black: #2c3e50;
$white: #ccc;
// Pen specific


.revolver {
  height: 80px;
  width: 80px;
  border-radius: 50px;
  display: flex;
  justify-content: center;
  position: relative;
  background: $white;
  transform: rotate(30deg);
  animation: rotate 5s cubic-bezier(0.74, 0.61, 0, 1.33) infinite;
&__part {
   height: 40px;
   width: 30px;
   border-radius: 5px;
   transform-origin: bottom center;
   position: absolute;
   display: flex;
   justify-content: center;
 }
&__part:after,
&__part:before {
   content: " ";
   display: block;
   background: $black;
   height: 26px;
   width: 26px;
   border-radius: 13px;
   margin-top: -18px;
 }
&__part:before {
   position: absolute;
   height: 12px;
   width: 12px;
   margin-top: 11px;
   right: -5px;
   background: $black;
   border: 2px solid $black;
 }
}

@for $i from 1 through 6 {
  section:nth-of-type(#{$i}) {
    transform: rotateZ(calc(60deg * #{$i}));
  }
}

@keyframes rotate {
  0% {
    transform: rotate(30deg);
  }
  16% {
    transform: rotate(90deg);
  }
  32% {
    transform: rotate(150deg);
  }
  48% {
    transform: rotate(210deg);
  }
  64% {
    transform: rotate(270deg);
  }
  82% {
    transform: rotate(330deg);
  }
  100% {
    transform: rotate(390deg);
  }
}

</style>
