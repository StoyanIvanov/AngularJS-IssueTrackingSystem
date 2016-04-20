var app=app||{};

app.showNoty=function (message){
    var msg = noty({
        text: message,
        animation: {
            open: {height: 'toggle'}, // jQuery animate function property object
            close: {height: 'toggle'}, // jQuery animate function property object
            easing: 'swing', // easing
            speed: 500, // opening & closing animation speed
            "timeout":2000,
            "closeButton":true,
            "closeOnSelfClick":true,
            "closeOnSelfOver":false,
            "modal":false
        }
    });

    msg.setTimeout(2000);
};
