<template>
  <div class="d-flex flex-column" :style="{ height: '100%' }">
    <div class="pdf-options">
      <v-btn class="mr-2" color="primary" @click="currentPage--">&lt;</v-btn>
      <v-text-field
        hide-details="auto"
        solo
        dense
        type="number"
        class="mr-2 shrink"
        label="Page Number"
        v-on:change="updateCurrentPage"
        v-model="pageInput"
        outlined
      ></v-text-field>
      of {{ pageCount }}
      <v-btn class="ml-2" color="primary" @click="currentPage++">&gt;</v-btn>
    </div>
    <pdf
      :src="data"
      class="pdf-preview"
      :page="currentPage"
      @num-pages="
        pageCount = $event;
        currentPage = 1;
      "
    />
  </div>
</template>

<script>
import pdf from "vue-pdf";

export default {
  name: "PDFPreview",
  components: {
    pdf,
  },
  data() {
    return {
      currentPage: 1,
      pageCount: 0,
      pageInput: 1,
    };
  },
  watch: {
    currentPage: function(val) {
      if (val > this.pageCount) this.currentPage = this.pageCount;
      if (val < 1) this.currentPage = 1;
      this.pageInput = this.currentPage;
    },
  },
  props: {
    data: String,
  },
  methods: {
    updateCurrentPage() {
      this.currentPage = parseInt(this.pageInput);
    },
  },
};
</script>

<style lang="scss" scoped>
.pdf-options {
  display: flex;
  justify-content: center;
  align-items: center;
  background: white;
  padding: 10px 0;
  button {
    &:first-child {
      border-top-right-radius: 0;
      border-bottom-right-radius: 0;
    }
    &:last-child {
      border-top-left-radius: 0;
      border-bottom-left-radius: 0;
    }
  }
}
.pdf-preview {
  flex: 1;
  overflow: auto;
  margin: 0;
  border-top: 1px solid #e2effa;
}
</style>
