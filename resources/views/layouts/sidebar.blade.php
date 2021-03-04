<aside class="main-sidebar sidebar-dark-primary elevation-4">
    <a href="{{ url('/') }}" class="brand-link navbar-danger">
        <img src="{{ asset(config('app.icon', 'favicon.ico')) }}"
            class="brand-image img-circle elevation-3" style="opacity: .8">
        <span
            class="brand-text font-weight-light">{{ config('app.name', 'Laravel') }}</span>
    </a>
    <div class="sidebar sidebar-no-expand">
        <nav class="mt-2">
            <ul class="nav nav-pills nav-sidebar nav-child-indent nav-compact flex-column" data-widget="treeview"
                role="menu" data-accordion="false">
                @can('isAdmin')
                    <li class="nav-item has-treeview">
                        <a href="{{ route('admin.#') }}" class="nav-link">
                            <i class="nav-icon fas fa-cog"></i>
                            <p>
                                Admin
                                <i class="right fas fa-angle-left"></i>
                            </p>
                        </a>
                        <ul class="nav nav-treeview">
                            <li class="nav-item">
                                <router-link tag="a" to="/users" class="nav-link">
                                    <i class="nav-icon fas fa-th"></i>
                                    <p>Users</p>
                                </router-link>
                            </li>
                            <li class="nav-item">
                                <router-link tag="a" to="/roles" class="nav-link">
                                    <i class="far fa-circle nav-icon"></i>
                                    <p>Roles</p>
                                </router-link>
                            </li>
                            <li class="nav-item">
                                <router-link tag="a" to="/modules" class="nav-link">
                                    <i class="nav-icon fas fa-th"></i>
                                    <p>Modules</p>
                                </router-link>
                            </li>
                        </ul>
                    </li>
                @endcan

                @foreach(Module::allEnabled() as $module)
                    {{-- @php
                        $jsonString =
                        file_get_contents(base_path('Modules'.DIRECTORY_SEPARATOR.$module.DIRECTORY_SEPARATOR.'resources'.DIRECTORY_SEPARATOR.'parameter.json'));
                        $data = json_decode($jsonString, true);
@endphp
                    <li class="nav-item">
                        <a href="{{ route('wfm.index') }}" class="nav-link">
                    <i class="nav-icon {{ $data['icon'] }}"></i>
                    <p>
                        {{ $data['name'] }}
                        <span class="right badge badge-info">New</span>
                    </p>
                    </a>
                    </li> --}}




                    @includeIf($module->getLowerName().'::layouts.menuitems')
                @endforeach

            </ul>
        </nav>
    </div>
</aside>
