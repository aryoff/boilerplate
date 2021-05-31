<aside class="control-sidebar control-sidebar-dark">
    <div class="p-3 control-sidebar-content">
        @foreach(Module::allEnabled() as $module)
            @includeIf($module->getLowerName().'::layouts.controlitems')
        @endforeach
    </div>
</aside>
