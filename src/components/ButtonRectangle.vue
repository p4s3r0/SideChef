<template>
    <div id="container-component-ButtonRectangle">
      <button @click="$emit('clickedAdd')">
        <svg v-if="this.type == 'arrow'" width="40" height="40" viewBox="0 0 40 40" fill="none">
          <path d="M9.99989 20L29.9999 20M29.9999 20L23.3332 13.3334M29.9999 20L23.3332 26.6667" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
        <svg v-if="this.type == 'add'" width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M11.6666 19.9999H20M20 19.9999H28.3333M20 19.9999V11.6666M20 19.9999V28.3333M35.8333 20C35.8333 28.7445 28.7445 35.8333 20 35.8333C11.2554 35.8333 4.16663 28.7445 4.16663 20C4.16663 11.2554 11.2554 4.16663 20 4.16663C28.7445 4.16663 35.8333 11.2554 35.8333 20Z" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
        <svg v-if="this.type == 'minus'" width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M11.6666 20.0001H28.3333M35.8333 20.0001C35.8333 28.7446 28.7445 35.8334 20 35.8334C11.2554 35.8334 4.16663 28.7446 4.16663 20.0001C4.16663 11.2556 11.2554 4.16675 20 4.16675C28.7445 4.16675 35.8333 11.2556 35.8333 20.0001Z" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>


      </button>
    </div>
</template>

<script>
export default {
  name: 'ButtonRectangle',
  props: ["type"],
  data() {
      return {
        password: "",
      }
  },
}
</script>
  
<style scoped>
#container-component-ButtonRectangle { 
}

button {
  position: relative;
  right: 0px;
  width: 70px;
  height: 70px;
  background-color: white;
  border: 1px rgba(0, 0, 0, 0.1) solid;
  border-radius: 20px;
  left: 50%;
  transform: translateX(-50%);
}

svg {
  background-color: white;
}

</style>
  