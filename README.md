## Composer Laravel Require
- nwidart/laravel-modules
- spatie/laravel-permission
- staudenmeir/laravel-cte

# Module Rules
## Laravel 8 Note
Di ServiceProvider, comment line 
```
$this->registerFactories();
```
untuk kompatibilitas
## Config
Tambahkan *parameter.json* di dalam folder Config
## Views
Untuk menampilkan menu, tambahkan menuitems.blade.php di dalam views/layouts, dengan format
```
<li class="nav-item">
    <a href="" class="nav-link">
        <i class="nav-icon fas fa-cog"></i>
        <p>
            WFM
            <span class="right badge badge-info">New</span>
        </p>
    </a>
</li>
```
Untuk tampilan format views, contoh index.blade.php
```
@extends('layouts.app')

@section('content')
<div id="app" class="content-wrapper">
    <h1>Hello World</h1>

    <p>
        This view is loaded from module: {!! config('wfm.name') !!}
    </p>
</div>
@endsection
```

