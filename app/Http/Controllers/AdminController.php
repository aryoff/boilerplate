<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;
use Nwidart\Modules\Facades\Module;


class AdminController extends Controller
{
    public function index()
    {
        return view('admin');
    }
    public function modules()
    {
        return view('admin.modules');
    }
    function key_exist_inarray($key, $search_array)
    {
        if (array_key_exists($key, $search_array)) {
            return $search_array[$key];
        } else {
            return null;
        }
    }
    function get_json_parameter($modules)
    {
        $container = [];
        foreach ($modules as $module) {
            $jsonString = file_get_contents(base_path('Modules'.DIRECTORY_SEPARATOR.$module->getName().DIRECTORY_SEPARATOR.'Config'.DIRECTORY_SEPARATOR.'parameter.json'));
            $data = json_decode($jsonString, true);
            if ($this->key_exist_inarray('name',$data) == null) {
                $nama = $module->getName();
            } else {
                $nama = $this->key_exist_inarray('name',$data);
            }
            $container[] = [
                'name' => $nama,
                'value' => $module->getLowerName(),
                'require' => $this->key_exist_inarray('require',$data),
            ];
        }
        return $container;
    }
    public function module_list()
    {
        $data = [
            'enabled' => $this->get_json_parameter(Module::allEnabled()),
            'disabled' => $this->get_json_parameter(Module::allDisabled()),
        ];
        return $data;
    }
    public function module_store(Request $request)
    {
        $validatedData = $request->validate([
            'mode' => 'required',
            'module_id' => 'required',
        ]);

        foreach ($request->module_id as $module_id) {
            $module = Module::find($module_id);
            switch ($request->mode) {
                case 'select':
                    $module->enable();
                    break;
                case 'deselect':
                    $module->disable();
                    break;
            }
        }
        return $this->module_list();
    }
    public function user_list()
    {
        return User::all();
    }
    public function user_create(Request $request)
    {
        Validator::make($request->all(), [
            'name' => ['required', 'string', 'max:255'],
            'email' => ['required', 'string', 'email', 'max:255', 'unique:core_users'],
            'password' => ['required', 'string', 'min:8', 'confirmed'],
        ])->validate();

        return User::create([
            'name' => $request['name'],
            'email' => $request['email'],
            'password' => Hash::make($request['password']),
        ]);

    }

    public function role_create(Request $request)
    {
        Validator::make($request->all(), [
            'name' => ['required', 'string', 'max:255'],
        ])->validate();

        return $role = Role::create(['name' => $request['name']]);
    }
}
