<template>
<div>
  <div class="content-header">
    <div class="container-fluid">
      <div class="row mb-2">
        <div class="col-sm-6">
          <h1 class="m-0 text-dark">Admin Roles</h1>
        </div>
        <div class="col-sm-6">
          <ol class="breadcrumb float-sm-right">
            <li class="breadcrumb-item">
              <a href="#">Home</a>
            </li>
            <li class="breadcrumb-item active">Roles</li>
          </ol>
        </div>
      </div>
    </div>
  </div>
  <div class="content">
    <div class="container-fluid">
      <div class="row">
        <div class="col-lg-6">
          <form class="form-inline" @submit.prevent="onSubmit" @keydown="form.errors.clear()">
            <div class="form-group">
              <div class="col-sm-10">
                <input type="text" class="form-control" id="name" name="name" required autocomplete="name" autofocus placeholder="Name" v-model="form.name" />
                <span class="invalid-feedback d-block" role="alert" v-if="form.errors.has('name')" v-text="form.errors.get('name')"></span>
              </div>
            </div>
            <button type="submit" class="btn btn-info" :disabled="form.errors.any()">Add New Roles</button>
          </form>
        </div>
      </div>
      <hr />
      <div class="row">
        <div class="col-lg-6">
          <div class="card">
            <div class="card-header">
              <h3 class="card-title">Roles List</h3>
              <div class="card-tools">
                <div class="input-group input-group-sm" style="width: 150px;">
                  <input type="text" name="table_search" class="form-control float-right" placeholder="Search" />
                  <div class="input-group-append">
                    <button type="submit" class="btn btn-default">
                      <i class="fas fa-search"></i>
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div class="card-body table-responsive p-0" style="height: 300px;">
              <table class="table table-hover">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Permission</th>
                    <th>Tag</th>
                  </tr>
                </thead>
                <tbody>
                  <!-- <tr v-for="user in users" v-bind:key="user.id">
                    <td>{{user.id}}</td>
                    <td>{{user.name}}</td>
                    <td>{{user.email}}</td>
                    <td v-if="user.is_admin === 'true'"><input type="checkbox" v-bind:id="'checkAdmin' + user.id" checked></td>
                    <td v-else><input type="checkbox" v-bind:id="'checkAdmin' + user.id"></td>
                  </tr> -->
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <div class="col-lg-6">
          <div class="card">
            <div class="card-body">
              <ul class="nav nav-tabs" id="rolesTab" role="tablist">
                <li class="nav-item">
                  <a class="nav-link active" id="permission-tab" data-toggle="tab" href="#permission" role="tab" aria-controls="permission" aria-selected="true">Edit Permission</a>
                </li>
                <li class="nav-item">
                  <a class="nav-link" id="tag-tab" data-toggle="tab" href="#tag" role="tab" aria-controls="tag" aria-selected="false">Edit Tag</a>
                </li>
              </ul>
              <div class="tab-content" id="rolesTabContent">
                <div class="tab-pane fade show active" id="permission" role="tabpanel" aria-labelledby="permission-tab">
                  <table class="table table-hover">
                    <thead>
                      <tr>
                        <th>Permission</th>
                        <th>Status</th>
                      </tr>
                    </thead>
                    <tbody>
                    </tbody>
                  </table>
                </div>
                <div class="tab-pane fade" id="tag" role="tabpanel" aria-labelledby="tag-tab">
                  <form class="form-horizontal" @submit.prevent="onSubmit" @keydown="form.errors.clear()">
                    <div class="form-group row">
                      <label for="name" class="col-sm-2 col-form-label">Name</label>
                      <div class="col-sm-10">
                        <input type="text" class="form-control" id="name" name="name" required autocomplete="name" autofocus placeholder="Name" v-model="form.name" />
                        <span class="invalid-feedback d-block" role="alert" v-if="form.errors.has('name')" v-text="form.errors.get('name')"></span>
                      </div>
                    </div>
                    <div class="form-group row">
                      <label for="inputEmail3" class="col-sm-2 col-form-label">Email</label>
                      <div class="col-sm-8">
                        <input type="text" class="form-control" id="inputEmail3" placeholder="Email" v-model="form.email" required />
                        <span class="invalid-feedback d-block" role="alert" v-if="form.errors.has('email')" v-text="form.errors.get('email')"></span>
                      </div>
                      <button type="submit" class="btn btn-info col-sm-2" :disabled="form.errors.any()">Add Tag</button>
                    </div>
                    <div class="form-group row">
                      <label for="password" class="col-sm-2 col-form-label">Password</label>
                      <div class="col-sm-10">
                        <textarea class="form-control" id="curr_tag" placeholder="tags" v-model="form.password" required />
                      </div>
                    </div>
                  </form>
                </div>
              </div>
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
      roles: [],
      form: new Form({
        name: ""
      })
    };
  },

  methods: {
    onSubmit() {
      this.form.post("/admin/role").then(role => this.roles.push(role));
    }
  }
};
</script>
