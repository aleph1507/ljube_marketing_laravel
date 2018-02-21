@include('_partials.head')

@include('_partials.header')

{{-- @include('_partials.main_slide') --}}

@yield('main_slide')

@include('_partials.messages')

@yield('content')

@include('_partials.footer')
