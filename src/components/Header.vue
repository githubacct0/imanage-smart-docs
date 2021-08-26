<template>
  <v-sheet
    height="300"
    class="d-flex flex-column white--text"
    :style="{
      backgroundImage: 'url(' + require('@/assets/bg-image.jpg') + ')',
      backgroundPosition: 'center',
      backgroundSize: 'cover',
    }"
  >
    <v-col class="d-flex flex-column pa-0 mx-auto" :cols="cols">
      <router-link
        class="mt-2 white--text"
        :style="[
          currentRoute !== 'uploadFile'
            ? { visibility: 'visible' }
            : { visibility: 'hidden' },
        ]"
        :to="{ name: 'uploadFile' }"
      >
        &lt; Back
      </router-link>
      <h1 class="mt-2">PDF Form Smart</h1>
      <h1 class="mb-4">Document Creator</h1>
      <p class="mb-0">
        If you are new to Integra and Smart Documents, spend the next few
        minutes going through the
      </p>
      <p class="mb-0">
        steps of how the Integra Smart Document Center works which will allow
        you to better understand
      </p>
      <p class="mb-0">
        the technology behind Integra and how it works.
      </p>
    </v-col>
  </v-sheet>
</template>

<script>
export default {
  name: "Header",
  props: {
    cols: Number,
  },
  computed: {
    currentRoute() {
      return this.$route.name;
    },
  },
  data: () => ({}),
};
</script>

<style lang="scss" scoped>
h1 {
  line-height: 1.1;
}
a {
  text-decoration: none;
}
</style>
