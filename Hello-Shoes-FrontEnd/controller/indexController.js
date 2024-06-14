let header = $('#header');
let headerSignIn = $('#signIn');
let headerSignUp = $('#signUp');

let btnMainLogIn = $('#btn-log');
let btnSignUpBackToHome = $('#signUpBackToHome');
let btnSignInBackToHome = $('#logInBackToHome');

let mainPage = $('#main-view');
let logInPage = $('#log-in-page');
let signUpPage = $('#sign-up-page');
let adminPage = $('#admin-container');
let userPage = $('#user-container');
let customerPage = $('#customer-container');
let employeePage = $('#employee-container');
let supplierPage = $('#supplier-container');
let inventoryPage = $('#inventory-container');
let paymentPage = $('#payment-container');
let cardPage = $('#card-container');
let adminEditPage = $('#admin-edit-container');
let userEditPage = $('#user-edit-container');
let adminDashboard = $('#admin-dashboard-container');
let userDashboard = $('#user-dashboard-container');
let orderVerify = $('#confirm-container');
let offer = $('#offer-container');

let videoStream;
let empVideoStream;
let itmVideoStream;
let mode = false;

function allContainerHide() {
    header.css('display', 'none');
    mainPage.css('display', 'none');
    logInPage.css('display', 'none');
    signUpPage.css('display', 'none');
    adminPage.css('display', 'none');
    userPage.css('display', 'none');
    customerPage.css('display', 'none');
    employeePage.css('display', 'none');
    supplierPage.css('display', 'none');
    inventoryPage.css('display', 'none');
    paymentPage.css('display', 'none');
    cardPage.css('display', 'none');
    adminEditPage.css('display', 'none');
    userEditPage.css('display', 'none');
    adminDashboard.css('display', 'none');
    userDashboard.css('display', 'none');
    orderVerify.css('display', 'none');
    offer.css('display', 'none');
}

$(window).on('load', function () {
    $("#loader").css('display', 'none');
    purchaseBtnHide(true);
    allContainerHide();
    header.css('display', 'block');
    mainPage.css('display', 'block');
    $('#btn-log,#signIn,#log-in-btn').click(function () {
        allContainerHide();
        header.css('display', 'block');
        logInPage.css('display', 'block');
        mainPage.css('display', 'none');
    });
    $('#signUpBackToHome,#logInBackToHome,#adminLogOut,#userLogOut').click(function () {
        allContainerHide();
        header.css('display', 'block');
        mainPage.css('display', 'block');
        if (mode){
            applyDarkMode();
            setDarkEffect();
        }
    });

    $('#signUp').click(function () {
        allContainerHide();
        header.css('display', 'block');
        signUpPage.css('display', 'block');
        mainPage.css('display', 'none');
    });

    $('#order-thead').css({
        'width': '100%',
        'display': 'flex'
    });
    $('#order-thead>th').css({
        'flex': '1',
        'max-width': 'calc(100%/5*1)'
    })
    setDate();
    setTime();
    darkBtn();
});

function purchaseBtnHide(value) {
    $("#txtBalance").prop("disabled", value);
    $("#txtDiscount").prop("disabled", value);
    $("#txtCash").prop("disabled", value);
    // $("#btnSubmitOrder").prop("disabled", value);
}

function userLimits() {
    $("#cusUpdate").hide();
    $("#cusDelete").hide();

    $("#empSave").hide();
    $("#empUpdate").hide();
    $("#empDelete").hide();

    $("#itmSave").hide();
    $("#itmUpdate").hide();
    $("#itmDelete").hide();

    $("#supSave").hide();
    $("#supUpdate").hide();
    $("#supDelete").hide();

    $('#empCaptureButton').hide();
    $('#itmCaptureButton').hide();

    $('#userSave').hide();

}

function userlimitOff() {
    $("#cusUpdate").show();
    $("#cusDelete").show();
    $("#empSave").show();
    $("#empUpdate").show();
    $("#empDelete").show();
    $("#itmSave").show();
    $("#itmUpdate").show();
    $("#itmDelete").show();
    $("#supSave").show();
    $("#supUpdate").show();
    $("#supDelete").show();

    $('#userSave').show();

    $('#empCaptureButton').show();
    $('#itmCaptureButton').show();

}

function showAlert(name) {
    let timerInterval;
    Swal.fire({
        title: "Welcome " + name + " !",
        html: "",
        timer: 3000, //8000
        /*  timerProgressBar: true,*/
        width: 600,
        padding: "3em",
        color: "rgba(233,197,74,0.4)",
        background: "url(assets/images/users.png) no-repeat",
        backdrop: `
      rgba(233,197,74,0.4)
      url("")
      left top
      no-repeat
    `,
        didOpen: () => {
            if (mode){
                $('.swal2-title').css('color', 'rgba(255,255,255,0.8)');
            }else {
                $('.swal2-title').css('color', '#4D5F71');
            }
            Swal.showLoading();
            const timer = Swal.getPopup().querySelector("b");
            timerInterval = setInterval(() => {
                // timer.textContent = `${Swal.getTimerLeft()}`;
            }, 100);
        },
        willClose: () => {
            clearInterval(timerInterval);
        }
    }).then((result) => {
        if (result.dismiss === Swal.DismissReason.timer) {
            console.log("closed timer");
        }
    });
}

function setDate() {
    let currentDate = new Date();
    let year = currentDate.getFullYear();
    let month = (currentDate.getMonth() + 1).toString().padStart(2, '0');
    let day = currentDate.getDate().toString().padStart(2, '0');
    let formattedDate = year + '-' + month + '-' + day;
    $('.currDate').text(` : ${formattedDate}`);
}

function setTime() {
    setInterval(function () {
        let currentTime = new Date();
        let hours = currentTime.getHours();
        let minutes = currentTime.getMinutes();
        let seconds = currentTime.getSeconds();

        if (hours < 10) {
            hours = "0" + hours;
        }
        if (minutes < 10) {
            minutes = "0" + minutes;
        }
        if (seconds < 10) {
            seconds = "0" + seconds;
        }

        const formattedTime = hours + ":" + minutes + ":" + seconds;
        $('.currTime').text(` : ${formattedTime}`);
    }, 1000);
}

function removeDarkMode() {
    $("body").css('background', '');
    $("#header").css('background', '');
    $(".background").css('display', 'none');
    $("#particles-js").css('display', 'none');

    $(".btn-white").css('color', '');
    $("#log-in-btn").css('background', '');
    $("#log-in-container").css('background','');
    $(".dark-h1").css('color','');
    $(".sign-up-dark").css('background','');

    $(".header-dark").css('background', '');
    $(".nav-bar-dark").css('background', '');
    $("label").css('color', '');
    $(".currTime").css('color', '');
    $(".currDate").css('color', '');
    $(".payment-dark").css('background', '');
    $(".payment-con-dark").css('background-color', 'rgb(255,255,255)');
    $(".admin-dash-dark").css('background-color', '');
    $(".offer-dark").css('background-color', 'rgb(255,255,255)');
    $(".panel-dark").css('background-color', '#c5ecf875');
    $(".panel-itm-dark").css('background-color', 'rgba(255,255,255,0.5)');
    $(".panel-itm-dark").css('box-shadow', '0px 1px 10px #909090');
    $(".panel-label").css('color', '#4D5F71');
    $(".panel-itm-label").css('color', '#4D5F71');
    $(".itm-value").css('color', '');
    $('input,select,textarea').each(function() {
        $(this).css('background-color',"");
        $(this).css('color',"");
    });

    $('table').removeClass('table-dark').addClass('bg-light');
    $("#btn-log,#signIn,#signUp,#adminLogOut,#card-payment,#userLogOut,#sendOffer,#offer-send").css({
        "padding": "0.593vw 1.112vw",
        "text-decoration": "none",
        "font-weight": "bold",
        "color": "#000000",
        "display": "inline-block",
        "margin": "1.853vw 0",
        "border-radius": "0.741vw",
        "border": "0.148vw solid #E9C54A",
        "background": "linear-gradient(to left, #ffffff 50%, rgba(59, 59, 59, 0.9) 50%) right",
        "background-size": "200%",
        "transition": ".5s ease-out",
        "font-size": "0.8vw",
    });
    $("#btn-log, #signIn, #signUp, #adminLogOut, #card-payment, #userLogOut, #sendOffer, #offer-send").hover(
        function() {
            $(this).css({
                "background-position": "left",
                "color": "#ffffff"
            });
        },
        function() {
            $(this).css({
                "background-position": "right",
                "color": "#000000"
            });
        }
    );
}

function setDarkEffect() {
    particlesJS('particles-js', {
        particles: {
            number: {
                value: 80,
                density: {
                    enable: true,
                    value_area: 800
                }
            },
            color: {
                value: '#ffffff'
            },
            shape: {
                type: 'circle',
                stroke: {
                    width: 0,
                    color: '#000000'
                },
                polygon: {
                    nb_sides: 5
                },
                image: {
                    src: 'img/github.svg',
                    width: 100,
                    height: 100
                }
            },
            opacity: {
                value: 0.5,
                random: false,
                anim: {
                    enable: false,
                    speed: 1,
                    opacity_min: 0.1,
                    sync: false
                }
            },
            size: {
                value: 3,
                random: true,
                anim: {
                    enable: false,
                    speed: 40,
                    size_min: 0.1,
                    sync: false
                }
            },
            line_linked: {
                enable: true,
                distance: 150,
                color: '#ffffff',
                opacity: 0.4,
                width: 1
            },
            move: {
                enable: true,
                speed: 6,
                direction: 'none',
                random: false,
                straight: false,
                out_mode: 'out',
                bounce: false,
                attract: {
                    enable: false,
                    rotateX: 600,
                    rotateY: 1200
                }
            }
        },
        interactivity: {
            detect_on: 'canvas',
            events: {
                onhover: {
                    enable: true,
                    mode: 'repulse'
                },
                onclick: {
                    enable: true,
                    mode: 'push'
                },
                resize: true
            },
            modes: {
                grab: {
                    distance: 400,
                    line_linked: {
                        opacity: 1
                    }
                },
                bubble: {
                    distance: 400,
                    size: 40,
                    duration: 2,
                    opacity: 8,
                    speed: 3
                },
                repulse: {
                    distance: 200,
                    duration: 0.4
                },
                push: {
                    particles_nb: 4
                },
                remove: {
                    particles_nb: 2
                }
            }
        },
        retina_detect: true
    });

}

function applyDarkMode() {
    $(".background").css({
        "position": "fixed",
        "top": "0",
        "left": "0",
        "width": "100%",
        "height": "100%",
        "z-index": "-20",
        "background": "linear-gradient(103deg, #1B1E24 0%, #1B1E24 32%)"
    });
    $("#particles-js").css({
        "position": "fixed",
        "width": "100%",
        "height": "100%",
        "z-index": "-10"
    });
}

function setAllDark() {
    $("body").css('background', '#1B1E24');
    $("#header").css('background', 'rgb(27 30 36 / 70%)');
    $(".background").css('display', 'block');
    $("#particles-js").css('display', 'block');
    $("#log-in-container").css('background','#292E36'); /*212121*/
    $(".dark-h1").css('color','#f0f0f0');
    $(".sign-up-dark").css('background', '#292E36');
    $(".btn-white").css('color', '#f0f0f0');
    $("#log-in-btn").css('background', '#333539');
    //side bar and header
    $(".header-dark").css('background', '#292E36');
    $(".nav-bar-dark").css('background', '#292E36');
    $("label").css('color', '#f0f0f0');
    $(".currTime").css('color', '#f0f0f0');
    $(".currDate").css('color', '#f0f0f0');
    $(".payment-dark").css('background', '#3c4149');
    $(".payment-con-dark").css('background-color', '#292E36');
    $(".admin-dash-dark").css('background-color', '#252931');
    $(".offer-dark").css('background-color', '#252931');
    $(".panel-dark").css('background-color', '#5c6c7175');
    $(".panel-itm-dark").css('background-color', '#5c6c7175');
    $(".panel-itm-dark").css('box-shadow', 'rgb(144 144 144 / 60%) 0px 1px 10px');
    $(".panel-label").css('color', '#9daebf');
    $(".panel-itm-label").css('color', '#8E9AA5');
    $(".itm-value").css('color', '#9daebf');

    $('input,select,textarea').each(function() {
            $(this).css('background-color',"#333539");
            $(this).css('color',"#f0f0f0");
    });

    $('table').removeClass('bg-light').addClass('table-dark');
    $('#itemTable > tr').each(function() {
        let bgColor = $(this).find('th').css('background-color');
        let hasClass = $(this).find('th').hasClass('blinking')
        if (bgColor === "rgb(250, 235, 215)" || hasClass) {
            $(this).find('th').css('color', '#454545');
            $(this).find('td').css('color', '#454545');
        }
    });
    $("#btn-log,#signIn,#signUp,#adminLogOut,#card-payment,#userLogOut,#sendOffer,#offer-send").css({
        "padding": "0.593vw 1.112vw",
        "text-decoration": "none",
        "font-weight": "bold",
        "color": "#ffffff",
        "display": "inline-block",
        "margin": "1.853vw 0",
        "border-radius": "0.741vw",
        "border": "0.148vw solid #E9C54A",
        "background": "linear-gradient(to left, rgba(59, 59, 59, 0.9) 50%, #ffffff 50%) right",
        "background-size": "200%",
        "transition": ".5s ease-out",
        "font-size": "0.8vw",

    });
    $("#btn-log, #signIn, #signUp, #adminLogOut, #card-payment, #userLogOut, #sendOffer, #offer-send").hover(
        function() {
            $(this).css({
                "background-position": "left",
                "color": "#000000"
            });
        },
        function() {
            $(this).css({
                "background-position": "right",
                "color": "#ffffff"
            });
        }
    );
}

function darkBtn() {
    var select = function(s) {
            return document.querySelector(s);
        },
        selectAll = function(s) {
            return document.querySelectorAll(s);
        },
        hits = selectAll('.hit'),
        allStars = selectAll('.starGroup *'),
        allClouds = selectAll('.cloud'),
        allCloudPuffs = selectAll('.cloud circle');

    TweenMax.set('svg', {
        visibility: 'visible'
    });
    TweenMax.set(allStars, {
        transformOrigin: '50% 50%'
    });
    TweenLite.defaultEase = Elastic.easeOut.config(0.58, 0.8);

    var tl = new TimelineMax({paused: true});
    tl.staggerTo(['.sun', '.moonMask', '.moon'], 1, {
        cycle: {
            attr: [{cx: '-=140', cy: '-=20'}, {cx: '-=140', cy: '-=20'}, {cx: '-=90', cy: '-=0'}]
        }
    }, 0)
        .staggerTo(['.moon', '.sun'], 1, {
            cycle: {
                alpha: [1, 0]
            }
        }, 0, '-=1')
        .to('body', 1, {}, '-=1')
        .to('.outline', 1, {
            stroke: '#6172AD',
            fill: '#45568D'
        }, '-=1')
        .staggerFrom(allStars, 0.9, {
            cycle: {
                x: [-20, 30, 40, -30, 60, -40, 80, 90, 100, 110, 120]
            },
            alpha: 0
        }, 0.005, '-=1')
        .staggerTo(allClouds, 1, {
            cycle: {
                x: [40, 20]
            },
            alpha: 0
        }, 0, '-=1')
        .addPause()
        .staggerTo(['.sun', '.moonMask', '.moon'], 1, {
            cycle: {
                attr: [{cx: '+=140', cy: '+=20'}, {cx: '+=140', cy: '+=20'}, {cx: '+=90', cy: '+=0'}]
            }
        }, 0)
        .staggerTo(['.moon', '.sun'], 1, {
            cycle: {
                alpha: [0, 1]
            }
        }, 0, '-=1')
        .to('body', 1, {
            ease: Linear.easeNone
        }, '-=1')
        .to('.outline', 1, {
            stroke: '#FCFDFE',
            fill: '#85E8FE'
        }, '-=1')
        .staggerTo(allStars, 1, {
            alpha: 0
        }, 0, '-=1')
        .staggerFromTo(allClouds, 0.6, {
                cycle: {
                    y: [120, 160],
                    x: [0]
                }
            },
            {
                cycle: {
                    y: [0],
                    x: [0]
                },
                alpha: 1,
                immediateRender: false
            }, 0.06, '-=1')
        .from(['.plane', '.contrail'], 0.7, {
            x: -400,
            ease: Linear.easeNone
        }, '-=1')
        .to('.contrail', 0.5, {
            alpha: 0,
            ease: Sine.easeOut
        });

    function clickToggle(e) {
        if (tl.time() > 0 && tl.time() < tl.duration()) {
            tl.play();
            removeDarkMode();
            mode = false;
        } else {
            tl.play(0);
            setAllDark();
            applyDarkMode();
            setDarkEffect();
            mode = true;
        }
    }

    tl.timeScale(1);

    hits.forEach(function(hit) {
        hit.onclick = clickToggle;
    });

    TweenMax.globalTimeScale(1.3);
}

