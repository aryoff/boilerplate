{{-- @extends('wfm::layouts.master') --}}

@extends('layouts.app')

@section('module_css')
@endsection

@section('content')
<div class="content-wrapper">
    <router-view></router-view>
</div>
@endsection

@section('module_js')
@endsection
