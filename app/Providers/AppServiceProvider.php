<?php

namespace App\Providers;

use Illuminate\Support\Facades\Blade;
use Illuminate\Support\ServiceProvider;
use Nwidart\Modules\Facades\Module;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     *
     * @return void
     */
    public function register()
    {
        //
    }

    /**
     * Bootstrap any application services.
     *
     * @return void
     */
    public function boot()
    {
        Blade::if('moduleenabled', function ($value) {
            $temp_bool = false;
            foreach (Module::allEnabled() as $module) {
                if ($module->getName() === $value) {
                    $temp_bool = true;
                }
            }
            return $temp_bool;
        });
    }
}