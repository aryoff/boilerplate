require("./bootstrap");
require("multiselect");

import Form from "./utilities/Form";
window.Form = Form;

import router from "./routes";

// Vue.component('example-component', require('./components/ExampleComponent.vue').default);

const app = new Vue({
    el: "#app",
    router
});

$(function() {
    $.ajaxSetup({
        headers: {
            "X-CSRF-TOKEN": $('meta[name="csrf-token"]').attr("content")
        }
    });
    $("#module-select").multiSelect({
        dblClick: true,
        selectableHeader: "<h5 class='m-0 text-dark'>Disabled Modules</h5>",
        selectionHeader: "<h5 class='m-0 text-dark'>Enabled Modules</h5>",
        afterSelect: function(values) {
            $.ajax({
                data: {
                    module_id: values,
                    mode: "select"
                },
                url: "/admin/modules/store",
                method: "post",
                success: function(data) {
                    location.reload();
                },
                error: function(data) {
                    console.log("Error:", data);
                }
            });
        },
        afterDeselect: function(values) {
            $.ajax({
                data: {
                    module_id: values,
                    mode: "deselect"
                },
                url: "/admin/modules/store",
                method: "post",
                success: function(data) {
                    location.reload();
                },
                error: function(data) {
                    console.log("Error:", data);
                }
            });
        }
    });
});
