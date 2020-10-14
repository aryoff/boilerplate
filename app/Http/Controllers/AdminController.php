<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
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
    public function module_list()
    {
        $enabled = []; $disabled = [];
        foreach (Module::allEnabled() as $module) {
            $enabled[] = [
                'name' => config($module->getLowerName().'.name'),
                'value' => $module->getLowerName(),
                'require' => config($module->getLowerName().'.require'),
            ];
        }
        foreach (Module::allDisabled() as $module) {
            $disabled[] = [
                'name' => config($module->getLowerName().'.name'),
                'value' => $module->getLowerName(),
                'require' => config($module->getLowerName().'.require'),
            ];
        }
        $data = [
            'enabled' => $enabled,
            'disabled' => $disabled,
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
            'email' => ['required', 'string', 'email', 'max:255', 'unique:users'],
            'password' => ['required', 'string', 'min:8', 'confirmed'],
        ])->validate();

        return User::create([
            'name' => $request['name'],
            'email' => $request['email'],
            'password' => Hash::make($request['password']),
        ]);

    }
}
