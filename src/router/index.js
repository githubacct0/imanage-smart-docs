import Vue from "vue";
import VueRouter from "vue-router";
import UploadFile from "@/views/UploadFile";
import Modify from "@/views/Modify";
import JsonView from "@/views/JsonView";

import store from "../store";

Vue.use(VueRouter);

const routes = new VueRouter({
  mode: "history",
  routes: [
    { path: "/upload-file", name: "uploadFile", component: UploadFile },
    { path: "/modify", name: "modify", component: Modify },
    { path: "/jsonview", name: "jsonview", component: JsonView },

    { path: "/*", redirect: "/upload-file" },
  ],
});

routes.beforeEach((to, from, next) => {
  if (to.path === "/modify") {
    if (store.state.document.file === null) {
      return next({ path: "/upload-file" });
    }
  }
  next();
});

export default routes;
