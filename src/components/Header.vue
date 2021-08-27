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
      <h1 class="mt-2">Integra Drag and Drop Starter App</h1>
      <p class="mt-5">
        This is a simple node application developed by Integra to help other
        developers get a head start on processing Smart Documents. The
        application simply takes a Smart PDF Document and checks the hash of the
        document against the Integra Ledger Blockchain, if it is valid it will
        return the metadata contained within the document and return it to the
        user as a JSON object.<br />
        The repo can be found at
        <a
          href="https://github.com/IntegraLedger/DragAndDropStarter"
          target="_blank"
          style="color:white"
          ><i><u>https://github.com/IntegraLedger/DragAndDropStarter</u></i>
        </a>
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
