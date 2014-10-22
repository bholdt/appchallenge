app.filter('distance', function () {
    return function (input) {
        if (input >= 1000) {
            return (input / 1000).toFixed(2) + 'km';
        } else {
            return input.toFixed(2) + 'm';
        }
    }
});
