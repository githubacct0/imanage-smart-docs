import Api from "@/Api";

const state = {
  file: null,
  meta: {},
  loading: false,
};

const getters = {};

const actions = {
  getFormField({ commit }, params) {
    commit("loading");
    const formData = new FormData();
    formData.append("file", params.file);

    return Api.post("/form-field", formData)
      .then((res) => {
        commit("loaded");
        return {
          succeed: true,
          result: res.data,
        };
      })
      .catch((err) => {
        commit("loaded");
        return {
          succeed: false,
          message: err.message || "Unknown Error Occured.",
        };
      });
  },
  async loadData({ commit }, params) {
    console.log("params", params);
    commit("loading");
    try {
      let url = "/analyze/";
      const response = await Api.post(url, params.formData, {
        headers:
          process.env.VERSION === "PROD"
            ? {
                "Content-Type": `multipart/form-data`,
                "x-subscription-key": "1dd112297841405491073392d19c7fa1",
              }
            : {
                "Content-Type": `multipart/form-data`,
              },
      });
      commit("loaded");
      return {
        succeed: true,
        result: response.data,
      };
    } catch (error) {
      commit("loaded");
      console.log(error);
      return {
        succeed: false,
        message: error.message || "Unknown Error Occured.",
      };
    }
  },
  createSignedDocument({ commit }, params) {
    commit("loading");
    const formData = new FormData();
    formData.append("file", params.file);
    formData.append("meta_form", JSON.stringify(params.result));
    formData.append("data_form", JSON.stringify(params.form));
    if (params.hideQr) {
      formData.append("hide_qr", true);
    }

    return Api.post("/pdf", formData, {
      responseType: "blob",
    })
      .then((res) => {
        commit("loaded");
        return {
          succeed: true,
          result: res.data,
          filename: res.headers["file-name"],
          id: res.headers["id"],
          hash: res.headers["hash"],
        };
      })
      .catch((err) => {
        commit("loaded");
        return {
          succeed: false,
          message: err.response.statusText || "Unknown Error Occured.",
        };
      });
  },
};

const mutations = {
  loading(state) {
    state.loading = true;
  },
  loaded(state) {
    state.loading = false;
  },
  updateDocument(state, result) {
    state.file = result;
  },
  updateMeta(state, result) {
    state.meta = result;
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
