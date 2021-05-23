
function AssignNavbarParameters() {
    topIndent = parseInt($(".title-block").next().offset().top - $("#blocks-container .info-block:first").first().offset().top)
    $navbar.css('margin-top', `${topIndent}px`)
    $navbar.css('top', `${topIndent}px`)
}
function InvalidMsg(textbox, message) {
    if (textbox.value === '') {
        textbox.setCustomValidity(message);
    } 
    else {
        textbox.setCustomValidity('');
    }

    return true;
}

function GetPostionTop(elem) {
    return $(elem).offset().top - $(this).scrollTop()
}

function HandlePageResizing(scrollTop) {
    AssignNavbarParameters()
}

function SelectCurrentNavbarItem() {
    let currElem = $(".info-block > a").first()

    $(".info-block > a").each(function (index, elem) {
        if (GetPostionTop(elem) <= 1) {
            currElem = elem
        }
    })

    let sc = $(currElem).attr("name")
    let currentDiv = $(`a[href*='${sc}']`).first().parent()
    if (currentDiv != $navbar.find(".side-navbar-selected").first()) {
        $navbar.find(".side-navbar-selected").removeClass("side-navbar-selected")
        $(currentDiv).addClass("side-navbar-selected")
    }
}

var $navbar = $("#side-navbar");
var $navbarContainer = $("#side-navbar-container");
var $navbarPlace = $("#side-navbar-place");
var buttons = [$("#teachers-btn"), $("#students-btn"), $("#graduates-btn")];

var navbarWidth
var startPoint
var finishPoint
var topIndent

window.onscroll = function () {
    if ($navbar.hasClass("inAnimState")) {
        return true
    }

    SelectCurrentNavbarItem()

};//scroll

$(window).resize(function () {
    HandlePageResizing($(this).scrollTop())

    ChangePhotosWidth()
});//resize

buttons.forEach(btn => btn.click(function () {
    HandlePageResizing($(window).scrollTop())
}))

$(document).ready(function () {

    //Добавляем пункты в навбар
    $(".info-block").each(function (index, elem) {
        let title = $(elem).find("h2:first")
        $(elem).prepend(`<a name="#${index}"></a>`)
        $navbar.find("ul").append(`<li><div><a href="#${index}">${$(title).text()}</a></div></li>`)
    })

    //Делаем переход по якорям плавным
    let animationTimeout
    let animationTime = 700;
    $navbar.on("click", "a", function (event) {
        event.preventDefault();
        let sc = $(this).attr("href")
        let dn = $(`a[name*='${sc}']`).first().offset().top
        $('html, body').stop()                                                              //Остановка текущей анимации
        $('html, body').animate({ scrollTop: dn }, animationTime)                           //Запуск анимации
        $navbar.addClass("inAnimState")                                                     //Добваления класса, показываеющего что находится в состоянии анимации
        clearTimeout(animationTimeout);                                                     //Остановка прошлого таймаута
        animationTimeout = setTimeout('$navbar.removeClass("inAnimState")', animationTime)  //Запуск таймаута на удаления класса
        $navbar.find(".side-navbar-selected").removeClass("side-navbar-selected")
        $(this).parent().addClass("side-navbar-selected")
    });

    //Выставляем позицию навбара
    AssignNavbarParameters()

    //Выделяем в навбаре наблюдаемый блок
    SelectCurrentNavbarItem()

    ChangePhotosWidth()

    $('#third-figure').css('top', $('body').height() * 0.55)
    $('#second-figure').css('top', $('body').height() * 0.40)

    $('#bg-shapes-container').fadeIn(500)
    $('#side-navbar-container').fadeIn(500)

});


function ChangePhotosWidth() {
    $('.photos-container').find('.photo').each(function () {
        $(this).height($(this).width() * 0.75)
    })
}


function HidePopup() {
    $('.popup').slideUp(300)
    $('.popup-bg').fadeOut(300)
}

$('.popup-bg').click(function () {
    HidePopup()
})

$('.popup').each(function () {
    let closeBtn = $(this).find('.close-popup').first()

    closeBtn.click(function () {
        HidePopup()
    })
})

$('.open-popup').click(function () {
    let popup_id = $('#' + $(this).attr("rel")); // Связываем rel и popup_id
    $(popup_id).slideDown('slow'); // Открываем окно

    $('.popup-bg').fadeIn('slow'); // Открываем блок заднего фона
})

$('.load-input').change(function () {

    let mult = $(this).attr('multiple')

    if (typeof mult !== typeof undefined && mult !== false) {
        if ($(this).val() != '') $(this).prev().text('Loaded files: ' + $(this)[0].files.length);
        else $(this).prev().text('Load files');        
    } else {
        if ($(this).val() != '') $(this).prev().text($(this).val());
        else $(this).prev().text('Выберите файл');
    }
    
});

//Функция для выставление позици в Яндекс Картах и удаления элементов меню
function YandexReadyHandler() {
    var map = new ymaps.Map("ymap", {
        center: [56.46910481095714, 84.94797934925934],
        zoom: 16,
        controls: [],
        type: "yandex#map"
    }, {
        suppressMapOpenBlock: true
    });
    map.geoObjects.add(new ymaps.GeoObject({
        geometry: {
            type: "Point",
            coordinates: [56.46953536079353, 84.94760383999729],
            hideIconOnBalloonOpen: false
        },
        properties: {
            balloonContent: decodeURIComponent("%D0%A2%D0%BE%D1%87%D0%BA%D0%B0"),
            iconCaption: decodeURIComponent(""),
            hintCaption: decodeURIComponent(""),
        }
    }, {
        preset: "islands#blueIcon",
    })
    ); return map;
}