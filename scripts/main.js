$(document).ready(function () {

    window.body = $("body");
    window.win = $(window);

    $(".popup-window .close-menu").click(function () {
        $(this).parent().parent().removeClass("popup-active");
    });

    $(".login-button, .free-trial").click(function (e) {
        e.preventDefault();
        $(".button-wrap").removeClass("popup-active");
        $(this).parent().toggleClass("popup-active");
    });

    body.click(function (event) {
        if (!$(event.target).closest(".button-wrap").length && !$(event.target).is(".button-wrap")) {
            $(".button-wrap").removeClass("popup-active");
        }
    });
});
