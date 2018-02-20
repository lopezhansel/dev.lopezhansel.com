$(document).ready(() => {
    console.log(`There isn't much to this website`)
    $(".you-is-important").fitText(0.8);

    $('.gallery').slick({
        slidesToShow: 1,
        autoplay: true,

    });

})