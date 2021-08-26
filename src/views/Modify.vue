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
    <v-snackbar v-model="isReload" multi-line>
      Reload form fields?
      <template v-slot:action="{ attrs }">
        <v-btn color="red" text v-bind="attrs" @click="reload()">
          Yes
        </v-btn>
        <v-btn color="primary" text v-bind="attrs" @click="isReload = false">
          No, keep as it is
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
        <div class="control-container">
          <div class="d-flex justify-center">
            <v-btn
              color="primary"
              class="mr-2"
              @click="settingDialogVisible = true"
            >
              Settings
            </v-btn>
            <v-btn color="white" @click="confirmDialogVisible = true">
              Generate Smart Documents
            </v-btn>
          </div>
          <v-row class="justify-center my-0">
            <v-checkbox
              v-model="applyQR"
              hide-details
              color="white"
              dense
              class="my-2 pt-0 align-center"
            >
              <template v-slot:label>
                <span class="white--text">
                  Apply QR Code
                </span>
              </template>
            </v-checkbox>
          </v-row>
        </div>

        <v-row class="ma-0 pa-1 overflow-auto">
          <v-col
            cols="6"
            class="pa-0 mr-2 elevation-2 rounded overflow-hidden"
            :style="{ height: '100%', flex: 1 }"
          >
            <PDFPreview v-if="previewUrl" :data="previewUrl" />
          </v-col>

          <v-col
            cols="6"
            class="d-flex flex-column pa-0 ml-2 elevation-2 rounded overflow-hidden white"
            :style="{ height: '100%', flex: 1 }"
          >
            <div class="field-container">
              <h2 class="ml-5">Input Fields</h2>
            </div>
            <div class="overflow-auto pa-3" :style="{ flex: 1 }">
              <v-row
                v-for="(item, index) in metaArray"
                :key="index"
                class="field-wrapper"
              >
                <v-col cols="4" class="overflow-hidden">
                  <v-subheader>{{ item[0] }}</v-subheader>
                </v-col>
                <v-row class="ma-0 align-center" cols="5">
                  <v-text-field
                    :label="item[0]"
                    :disabled="item[2] !== 'same-value'"
                    v-model="item[1]"
                    solo
                    dense
                    hide-details="auto"
                  ></v-text-field>
                </v-row>
                <v-col class="ma-0 d-flex align-center" cols="3">
                  <v-select
                    v-model="item[2]"
                    :items="items"
                    label="Solo field"
                    solo
                    dense
                    hide-details="auto"
                  ></v-select>
                </v-col>
              </v-row>
            </div>
          </v-col>
        </v-row>
      </v-col>
    </v-col>
    <v-dialog
      v-model="confirmDialogVisible"
      scrollable
      width="50%"
      overlay-opacity="0.7"
      overlay-color="black"
    >
      <v-card>
        <v-toolbar flat color="white">
          <v-toolbar-title>Confirm Metadata</v-toolbar-title>
          <v-spacer></v-spacer>
          <div class="d-flex justify-center align-center mr-2">
            <span class="mr-2">Number of copies:</span>
            <v-text-field
              v-model="copies"
              solo
              dense
              hide-details
              type="number"
              class="w-50"
            ></v-text-field>
          </div>
          <v-toolbar-items class="py-4">
            <v-btn
              color="primary"
              outlined
              class="mr-4"
              @click="confirmDialogVisible = null"
            >
              Cancel
            </v-btn>
            <v-btn color="primary" @click="saveAs()">Confirm</v-btn>
          </v-toolbar-items>
        </v-toolbar>
        <v-card-text class="dialog-content overflow-auto">
          <template v-for="(item, index) in metaArray">
            <div
              v-if="item[2] !== 'ignore'"
              :key="'dialog' + index"
              class="mt-2 pb-2 border-light"
            >
              <span>{{ item[0] }}:</span>
              <span>
                {{
                  item[2] === "same-value"
                    ? item[1]
                    : "Randomly generated value at the time of Smart document generation"
                }}
              </span>
            </div>
          </template>
        </v-card-text>
      </v-card>
    </v-dialog>
    <v-dialog
      v-model="settingDialogVisible"
      scrollable
      persistent
      width="50%"
      overlay-opacity="0.7"
      overlay-color="black"
    >
      <v-card>
        <v-toolbar flat color="white">
          <v-toolbar-title>Settings</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-toolbar-items>
            <v-btn color="red darken-1" text @click="hideSettings()">
              Close
            </v-btn>
          </v-toolbar-items>
        </v-toolbar>
        <v-card-text class="dialog-content">
          <v-col>
            <v-row
              align="center"
              justify="center"
              class="my-2 pb-2 border-light"
            >
              <span class="w-150">Number</span>
              <v-text-field
                label="From"
                v-model="numberMin"
                solo
                dense
                hide-details
                type="number"
                class="mr-2"
              ></v-text-field>
              <v-text-field
                label="To"
                v-model="numberMax"
                solo
                dense
                hide-details
                type="number"
              ></v-text-field>
            </v-row>
            <v-row
              align="center"
              justify="center"
              class="my-2 pb-2 border-light"
            >
              <span class="w-150">Percent</span>
              <v-text-field
                label="From Number"
                v-model="percentMin"
                solo
                dense
                hide-details
                type="number"
                class="mr-2"
              ></v-text-field>
              <v-text-field
                label="To Number"
                v-model="percentMax"
                solo
                dense
                hide-details
                type="number"
              ></v-text-field>
            </v-row>
            <v-row class="my-2 pb-2 border-light border-light">
              <span class="w-150">Download as ZIP</span>
              <v-checkbox
                v-model="downloadAsZip"
                hide-details
                dense
                class="mt-0 pt-0 align-center"
              ></v-checkbox>
            </v-row>
            <v-row
              align="center"
              justify="center"
              class="my-2 pb-2 border-light"
            >
              <span class="w-150">Date Format</span>
              <v-select
                v-model="dateFormat"
                :items="dateFormats"
                label="Date Format"
                hide-details
                dense
                solo
              ></v-select>
            </v-row>
          </v-col>

          <h2 class="mt-6">
            Auto-select default terms (These are the terms that will auto-select
            the dropdown)
          </h2>
          <v-col class="pt-0">
            <template v-for="(item, index) in items">
              <v-row
                align="center"
                justify="center"
                class="my-2 pb-2 border-light"
                v-if="index !== 0 && index !== items.length - 1"
                :key="index"
              >
                <span class="w-150">{{ item.text }}</span>
                <v-text-field
                  label="From Number"
                  v-model="item.value"
                  solo
                  dense
                  hide-details
                ></v-text-field>
              </v-row>
            </template>
          </v-col>
        </v-card-text>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
import { mapState } from "vuex";
import Header from "@/components/Header.vue";
import PDFPreview from "@/components/PDFPreview.vue";
import randomProfile from "random-profile-generator";
import JSZip from "jszip";
import moment from "moment";

export default {
  name: "Modify",
  components: {
    Header,
    PDFPreview,
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
