<template>
  <div>
    <div class="content-header">
      <div class="container-fluid">
        <div class="row mb-2">
          <div class="col-sm-6">
            <h1 class="m-0">Admin Modules</h1>
          </div>
          <div class="col-sm-6">
            <ol class="breadcrumb float-sm-right">
              <li class="breadcrumb-item">
                <a href="#">Home</a>
              </li>
              <li class="breadcrumb-item active">Modules</li>
            </ol>
          </div>
        </div>
      </div>
    </div>
    <div class="content">
      <div class="container-fluid">
        <div class="row">
          <div class="col-5">
            <div class="card card-info">
              <div class="card-header">
                <h3 class="card-title">Disabled Modules</h3>
              </div>
              <div class="card-body" style="height: 239px;">
                <select v-model="add" multiple="multiple" size="8" class="form-control">
                  <option v-for="(item, index) in disabledModules" v-bind:value="index" v-bind:key="index">{{ item.name }}</option>
                </select>
              </div>
            </div>
          </div>
          <div class="col-2 d-flex justify-content-center align-items-center">
            <a @click="disableModules" class="btn btn-default remove_option" rel="facilities2" id="remove">
              <i class="fa fa-arrow-left" aria-hidden="true" />
            </a>
            <a @click="enableModules" class="btn btn-default add_option" rel="facilities2" id="add">
              <i class="fa fa-arrow-right" aria-hidden="true" />
            </a>
          </div>
          <div class="col-5">
            <div class="card card-success">
              <div class="card-header">
                <h3 class="card-title">Enabled Modules</h3>
              </div>
              <div class="card-body" style="height: 239px;">
                <select v-model="remove" multiple="multiple" size="8" class="form-control">
                  <option v-for="(item, index) in enabledModules" v-bind:value="index" v-bind:key="index">{{ item.name }}</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      add: [],
      remove: [],
      enabledModules: [],
      disabledModules: []
    };
  },
  created() {
    axios.get("/admin/module").then(response => {this.enabledModules = response.data.enabled;this.disabledModules = response.data.disabled;});
  },
  methods: {
    enableModules() {
      var af = this.disabledModules;
      var values = [];
      this.add.forEach(element => {
        values.push(af[element].value);
      });
      axios.post("/admin/module", {
          module_id: values,
          mode: "select"
        })
        .then(response => {this.enabledModules = response.data.enabled;this.disabledModules = response.data.disabled;})
        .catch(function(error) {console.log(error);});
    },
    disableModules() {
      var fs = this.enabledModules;
      var values = [];
      this.remove.forEach(element => {
        values.push(fs[element].value);
      });
      axios.post("/admin/module", {
          module_id: values,
          mode: "deselect"
        })
        .then(response => {this.enabledModules = response.data.enabled;this.disabledModules = response.data.disabled;})
        .catch(function(error) {console.log(error);});
    }
  }
};
</script>
