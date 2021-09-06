<template>
  <v-container fill-height fluid pa-0>
    <v-snackbar
      v-model="isTypeError"
      timeout="5000"
      color="warning"
      elevation="2"
      top
      text
    >
      {{ errorMessage }}
      <template v-slot:action="{ attrs }">
        <v-btn color="warning" text v-bind="attrs" @click="isTypeError = false">
          Close
        </v-btn>
      </template>
    </v-snackbar>
    <v-overlay :value="loading">
      <v-progress-circular
        :size="50"
        color="primary"
        indeterminate
      ></v-progress-circular>
    </v-overlay>
    <v-col class="d-flex flex-column pa-0" :style="{ height: '100%' }">
      <Header :cols="6" />
      <v-col
        cols="6"
        :style="{ flex: 1 }"
        class="d-flex white mx-auto mt-n16 mb-16 rounded pa-8 elevation-24"
        @drop.prevent="addDocument"
        @dragover.prevent
        @dragenter.prevent
        @dragleave.prevent
      >
        <v-col
          class="d-flex flex-column justify-center align-center drop-container"
        >
          <img src="../assets/pdf-icon.svg" class="mb-10" />
          <h2>Drag and drop PDF documents here</h2>
          <p class="or-container">OR</p>
          <v-file-input
            label="File input"
            class="d-none"
            ref="fileInput"
            @change="onFileAdd"
            multiple
          />
          <v-btn
            color="primary"
            small
            class="no-uppercase pa-5"
            @click="openFileInput()"
          >
            Browse PDF files from your computer
          </v-btn>
        </v-col>
      </v-col>
    </v-col>
  </v-container>
</template>

<script>
import { mapState } from "vuex";
import Header from "@/components/Header.vue";

export default {
  name: "UploadFile",
  components: {
    Header,
  },
  computed: mapState({
    loading: (state) => state.document.loading,
  }),
  data: () => ({
    isTypeError: false,
    errorMessage: "",
  }),
  methods: {
    openFileInput() {
      this.$refs.fileInput.$refs.input.click();
    },
    onFileAdd(files) {
      this.handleFile(files);
    },
    addDocument(e) {
      let droppedFiles = e.dataTransfer.files;
      if (!droppedFiles) return;
      this.handleFile(droppedFiles);
    },

    async handleFile(files) {
      try {
        let i = 1;
        const allJsonResponses = {}
        for (const file of files) {
          const data = new FormData();
          data.append('file', file, file.name)
          const res = await fetch('https://integraapiproduction.azurewebsites.net/analyze/', {
            method: 'POST',
            body: data,
          });
          // const res = await this.$store.dispatch("document/loadData", {
          //   data,
          // });
          const jsonResp = await res.json();
          const resultKeys = Object.keys(jsonResp.result);
          resultKeys.forEach((key) => {
            try {
              jsonResp.result[key] = JSON.parse(jsonResp.result[key])
            } catch (e) {
              // 
            }
          });
          allJsonResponses[i.toString()] = jsonResp.result
          // allJsonResponses[i.toString()] = res
          i++
        }
        this.$store.commit("document/updateMeta", allJsonResponses || {});
        setTimeout(() => {
          this.$router.push("/jsonview");
        }, 500);
      } catch (error) {
        console.log(error);
        this.isTypeError = true;
        this.errorMessage = "Unknown Error Occured";
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.drop-container {
  flex: 1;
  background: #f4f8fe;
  border: 1px dashed #89adec;
}
.or-container {
  display: flex;
  color: gray;
  margin: 24px 0;
  &::before {
    content: " ";
    border-bottom: 1px solid;
    width: 100px;
    height: 50%;
    margin-right: 25px;
    display: block;
  }
  &::after {
    content: " ";
    border-bottom: 1px solid;
    width: 120px;
    height: 50%;
    margin-left: 25px;
    display: block;
  }
}
.no-uppercase {
  text-transform: none;
}
</style>
