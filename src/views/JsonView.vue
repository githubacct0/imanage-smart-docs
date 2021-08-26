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
    <v-snackbar
      v-model="isSucceed"
      timeout="5000"
      color="success"
      elevation="2"
      top
      text
    >
      Document has been successfully created and hashed.
      <template v-slot:action="{ attrs }">
        <v-btn color="success" text v-bind="attrs" @click="isSucceed = false">
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
      <Header :cols="10" />
      <v-col
        cols="10"
        class="d-flex flex-column mx-auto mb-4 pa-0 overflow-auto form-container"
      >
        <div class="control-container mb-15"></div>

        <v-row class="ma-0 pa-1 overflow-auto">
          <v-col
            cols="12"
            class="d-flex flex-column pa-0 ml-2 elevation-2 rounded overflow-hidden white"
            :style="{ height: '100%', flex: 1 }"
          >
            <div class="field-container">
              <h2 class="ml-5">JSON Fields</h2>
            </div>
            <div class="overflow-auto pa-3" :style="{ flex: 1 }">
              <!-- <vue-json-pretty :path="'res'" :data="meta" @click="handleClick">
              </vue-json-pretty> -->
              <JSONView :data="meta" :maxDepth="3" />
            </div>
          </v-col>
        </v-row>
      </v-col>
    </v-col>
  </v-container>
</template>

<script>
import { mapState } from "vuex";
import Header from "@/components/Header.vue";
import randomProfile from "random-profile-generator";
import JSZip from "jszip";
import moment from "moment";
// import VueJsonPretty from "vue-json-pretty";
import "vue-json-pretty/lib/styles.css";
import { JSONView } from "vue-json-component";

export default {
  name: "JsonView",
  components: {
    Header,
    // VueJsonPretty,
    JSONView,
  },
  computed: mapState({
    loading: (state) => state.document.loading,
    file: (state) => state.document.file,
    meta: (state) => state.document.meta,
  }),
  data: () => ({
    metaArray: [],
    isTypeError: false,
    isSucceed: false,
    errorMessage: "",
    previewUrl: null,
    applyQR: true,
    confirmDialogVisible: false,
    settingDialogVisible: false,
    numberMin: 0,
    numberMax: 100,
    percentMin: 0,
    percentMax: 100,
    downloadAsZip: true,
    copies: 1,
    items: [
      {
        text: "Same Value",
        value: "same-value",
      },
      {
        text: "Date",
        value: "date",
      },
      {
        text: "Address",
        value: "address",
      },
      {
        text: "City",
        value: "city",
      },
      {
        text: "State",
        value: "state",
      },
      {
        text: "Street",
        value: "street",
      },
      {
        text: "Zip",
        value: "zip",
      },
      {
        text: "Percent",
        value: "percent",
      },
      {
        text: "Name",
        value: "name",
      },
      {
        text: "Number",
        value: "number",
      },
      {
        text: "Ignore",
        value: "ignore",
      },
    ],
    dateFormats: [
      "YYYY-MM-DD",
      "MM-DD-YYYY",
      "DD-MM-YYYY",
      "MMMM DD, YYYY",
      "MM/DD/YYYY",
      "DD.MM.YYYY",
    ],
    dateFormat: "MM/DD/YYYY",
    isReload: false,
  }),
  mounted() {
    console.log("this.meta", this.meta);
    this.metaArray = Object.entries(this.meta);
    this.previewUrl = URL.createObjectURL(this.file);
    this.metaArray.forEach((item) => {
      item[1] = item[1] || "";
      item[0] = this.snakeCase(item[0]);
      const index = this.items.findIndex((obj) => item[0].includes(obj.value));
      if (index !== -1) {
        item.push(this.items[index].value);
      } else {
        item.push("same-value");
      }
    });
  },
  methods: {
    snakeCase(string) {
      return string
        .replace(/\W+/g, " ")
        .split(/ |\B(?=[A-Z])/)
        .map((word) => word.toLowerCase())
        .join("_");
    },
    handleClick(string) {
      console.log("handleClick", string);
    },
    randomDate(start, end) {
      return new Date(
        start.getTime() + Math.random() * (end.getTime() - start.getTime())
      );
    },
    hideSettings() {
      this.settingDialogVisible = null;
      this.isReload = true;
    },
    reload() {
      this.isReload = false;
      const ary = JSON.parse(JSON.stringify(this.metaArray));
      ary.forEach((item) => {
        const index = this.items.findIndex((obj) =>
          item[0].includes(obj.value)
        );
        if (index !== -1) {
          console.log(this.items[index].value, item[2]);
          item[2] = this.items[index].value;
        } else {
          item[2] = "same-value";
        }
      });
      this.metaArray = ary;
    },
    saveAs() {
      this.confirmDialogVisible = false;
      const promises = [];
      const numberMax = parseInt(this.numberMax);
      const numberMin = parseInt(this.numberMin);
      const percentMax = parseInt(this.percentMax);
      const percentMin = parseInt(this.percentMin);
      for (let i = 0; i < this.copies; i++) {
        const json = {};
        this.metaArray.forEach((item) => {
          if (item[2] === "same-value") json[item[0]] = item[1] || "";
          else if (item[2] === "date") {
            const date = moment(
              this.randomDate(new Date(2012, 0, 1), new Date())
            );
            json[item[0]] = date.format(this.dateFormat);
          } else if (item[2] === "address") {
            const address = randomProfile.address();
            json[item[0]] = address;
          } else if (item[2] === "city") {
            const city = randomProfile.address().split(", ")[1];
            json[item[0]] = city;
          } else if (item[2] === "state") {
            const state = randomProfile.state();
            json[item[0]] = state;
          } else if (item[2] === "street") {
            const street = randomProfile.address().split(", ")[0];
            json[item[0]] = street;
          } else if (item[2] === "zip") {
            const zip = randomProfile.zip();
            json[item[0]] = zip;
          } else if (item[2] === "percent") {
            json[item[0]] = `${Math.floor(
              percentMin + Math.random() * (percentMax - percentMin)
            )}%`;
          } else if (item[2] === "name") {
            const name = randomProfile.name();
            json[item[0]] = name;
          } else if (item[2] === "number") {
            json[item[0]] = Math.floor(
              numberMin + Math.random() * (numberMax - numberMin)
            ).toString();
          }
        });

        const file = new File([this.file], i + 1 + this.file.name, {
          type: this.file.type,
        });
        promises.push(
          this.$store.dispatch("document/createSignedDocument", {
            file,
            result: json,
            form: {},
            hideQr: !this.applyQR,
          })
        );
      }
      Promise.all(promises)
        .then((results) => {
          const zip = new JSZip();
          results.map((res) => {
            if (res.succeed) {
              if (this.downloadAsZip) {
                zip.file(res.filename, new Blob([res.result]));
              } else {
                const url = window.URL.createObjectURL(new Blob([res.result]));
                this.downloadFile(url, res.filename);
              }
            }
          });
          if (this.downloadAsZip) {
            zip.generateAsync({ type: "blob" }).then((content) => {
              this.downloadFile(
                window.URL.createObjectURL(content),
                "smartdocuments.zip"
              );
            });
          }
        })
        .catch(() => {
          this.isTypeError = true;
          this.errorMessage = "Unknown Error Occured";
        });
    },
  },
};
</script>

<style lang="scss" scoped>
.form-container {
  margin-top: -150px;
  flex: 1;
  .control-container {
    margin-left: auto;
  }
  .field-container {
    border-bottom: 1px solid #e2effa;
    height: 60px;
    display: flex;
    align-items: center;
  }
  .field-wrapper {
    border-bottom: 1px solid #e2effa;
    background: #f4f8fe;
  }
}
.dialog-content {
  border-top: 1px solid #e2effa;
  background: #f4f8fe;
}
.w-150 {
  width: 150px;
}
.w-50 {
  width: 50px;
}
.border-light {
  border-bottom: 1px solid #e2effa;
}
</style>
