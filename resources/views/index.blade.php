@extends('layouts.master')

@section('content')
<div id="content">

    @include('_partials.services')

    @include('_partials.serv')

    @include('_partials.latest_projects')

    @include('_partials.countdown')

    @include('_partials.quote')

    @include('_partials.education')
</div>
@endsection
