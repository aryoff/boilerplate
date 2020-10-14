<template>
  <div>
    <div class="content-header">
      <div class="container-fluid">
        <div class="row mb-2">
          <div class="col-sm-6">
            <h1 class="m-0 text-dark">Admin Users</h1>
          </div>
          <div class="col-sm-6">
            <ol class="breadcrumb float-sm-right">
              <li class="breadcrumb-item">
                <a href="#">Home</a>
              </li>
              <li class="breadcrumb-item active">Users</li>
            </ol>
          </div>
        </div>
      </div>
    </div>
    <div class="content">
      <div class="container-fluid">
        <div class="row">
          <div class="col-lg-6">
            <div class="card">
              <div class="card-header">
                <h3 class="card-title">User List</h3>
                <div class="card-tools">
                  <div class="input-group input-group-sm" style="width: 150px;">
                    <input type="text" name="table_search" class="form-control float-right" placeholder="Search"/>
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
                      <th>ID</th>
                      <th>User</th>
                      <th>Email</th>
                      <th>isAdmin</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="user in users" v-bind:key="user.id">
                      <td>{{user.id}}</td>
                      <td>{{user.name}}</td>
                      <td>{{user.email}}</td>
                      <td v-if="user.is_admin === 'true'"><input type="checkbox" v-bind:id="'checkAdmin' + user.id" checked></td>
                      <td v-else><input type="checkbox" v-bind:id="'checkAdmin' + user.id"></td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          <div class="col-lg-6">
            <div class="card card-info">
              <div class="card-header">
                <h3 class="card-title">New User Form</h3>
              </div>
              <form
                class="form-horizontal"
                @submit.prevent="onSubmit"
                @keydown="form.errors.clear()"
              >
                <div class="card-body" style="height: 239px;">
                  <div class="form-group row">
                    <label for="name" class="col-sm-2 col-form-label">Name</label>
                    <div class="col-sm-10">
                      <input
                        type="text"
                        class="form-control"
                        id="name"
                        name="name"
                        required
                        autocomplete="name"
                        autofocus
                        placeholder="Name"
                        v-model="form.name"
                      />
                      <span
                        class="invalid-feedback d-block"
                        role="alert"
                        v-if="form.errors.has('name')"
                        v-text="form.errors.get('name')"
                      ></span>
                    </div>
                  </div>
                  <div class="form-group row">
                    <label for="inputEmail3" class="col-sm-2 col-form-label">Email</label>
                    <div class="col-sm-10">
                      <input
                        type="text"
                        class="form-control"
                        id="inputEmail3"
                        placeholder="Email"
                        v-model="form.email"
                        required
                      />
                      <span
                        class="invalid-feedback d-block"
                        role="alert"
                        v-if="form.errors.has('email')"
                        v-text="form.errors.get('email')"
                      ></span>
                    </div>
                  </div>
                  <div class="form-group row">
                    <label for="password" class="col-sm-2 col-form-label">Password</label>
                    <div class="col-sm-10">
                      <input
                        type="password"
                        class="form-control"
                        id="password"
                        placeholder="Password"
                        v-model="form.password"
                        required
                      />
                      <span
                        class="invalid-feedback d-block"
                        role="alert"
                        v-if="form.errors.has('password')"
                        v-text="form.errors.get('password')"
                      ></span>
                    </div>
                  </div>
                </div>
                <div class="card-footer">
                  <button type="submit" class="btn btn-info" :disabled="form.errors.any()">Add User</button>
                </div>
              </form>
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
      users: [],
      form: new Form({
        name: "",
        email: "",
        password: "",
        password_confirmation: ""
      })
    };
  },

  created() {
    axios.get("/admin/user").then(({ data }) => (this.users = data));
  },

  methods: {
    onSubmit() {
      this.form.password_confirmation = this.form.password; // Temp for this form only.
      this.form.post("/admin/user").then(user => this.users.push(user));
    }
  }
};
</script>
