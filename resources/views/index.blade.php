@extends('layouts.master')

@section('main_slide')
  @include('_partials.main_slide')
@endsection

@section('content')
<div id="content">

    @include('_partials.services')

    @include('_partials.serv')

    @include('_partials.latest_projects')

    @include('_partials.countdown')

    @include('_partials.quote')

    @include('_partials.education')
    <div class="spacing" style="height:500px;"></div>
</div>
@endsection
