<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <title>{{ config('app.name', 'Laravello') }}</title>
    <link href="https://fonts.googleapis.com/css2?family=Titillium+Web:wght@400;700;900&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="{{ mix('css/app.css') }}">
    <script src="{{ mix('js/app.js') }}" defer></script>
</head>

<body class="h-screen text-gray-800">
    <div id="app" class="h-full">
        <Board></Board>
    </div>
</body>

</html>
