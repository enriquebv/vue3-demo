<script setup lang="ts">
interface Props {
  url: string
}

const props = defineProps<Props>()
</script>

<template>
  <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 327.846 318.144">
    <defs>
      <clipPath id="image">
        <path
          transform="translate(40) rotate(15) scale(1.2)"
          d="M172.871,0a28.906,28.906,0,0,1,25.009,14.412L245.805,97.1a28.906,28.906,0,0,1,0,28.989L197.88,208.784A28.906,28.906,0,0,1,172.871,223.2H76.831a28.906,28.906,0,0,1-25.009-14.412L3.9,126.092A28.906,28.906,0,0,1,3.9,97.1L51.821,14.412A28.906,28.906,0,0,1,76.831,0Z"
        />
      </clipPath>
    </defs>
    <image
      clip-path="url(#image)"
      height="100%"
      width="100%"
      :xlink:href="props.url"
      preserveAspectRatio="xMidYMin slice"
    ></image>
    <path
      fill="none"
      d="M172.871,0a28.906,28.906,0,0,1,25.009,14.412L245.805,97.1a28.906,28.906,0,0,1,0,28.989L197.88,208.784A28.906,28.906,0,0,1,172.871,223.2H76.831a28.906,28.906,0,0,1-25.009-14.412L3.9,126.092A28.906,28.906,0,0,1,3.9,97.1L51.821,14.412A28.906,28.906,0,0,1,76.831,0Z"
      transform="translate(111.598) rotate(30)"
    />
  </svg>
</template>
