
$(document).ready(function() {
    const validateEmail = (email) => {
        return String(email)
          .toLowerCase()
          .match(
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
          );
      };
    $(".lg-terminal-view").css("opacity", "0")
    $(".terminal-output").css("opacity", "0")
    $(".terminal-input").css("opacity", "0")
    $(".terminal-check").css("opacity", "0")
    window.onload = function() {
        setTimeout(function(){
            $(".background").show();
            anime.timeline({loop: false}).add({
                targets: '.background',
                opacity: "100%",
                duration: 1000,
                easing: "linear"
            })
            .add({
                targets: '.lgcontainer',
                width: "60%",
                opacity: 1,
                duration: 1500,
                paddingTop: ['0', '.75em'],
                paddingBottom: ['0', '.75em'],
                paddingLeft: ['0', '1.5em'],
                paddingRight: ['0', '1.5em'],
                easing: 'easeOutElastic',
            })
            .add({
                targets: '.lgicn',
                opacity: 1,
                duration: 1000,
                easing: 'easeOutElastic',
            })
            .add({
                targets: '.lg-terminal-view',
                opacity: 1,
                duration: 1000,
                easing: 'easeOutElastic',
            })
            .add({
                targets: '#to-1',
                opacity: 1,
                duration: 1000,
                easing: 'linear',
            })
            .add({
                targets: '#to-2',
                opacity: 1,
                duration: 1000,
                delay: 1000,
                easing: 'linear',
            })
            .add({
                targets: '.t-email',
                opacity: 1,
                duration: 800,
                delay: 1500,
                easing: 'linear',
            })
            setTimeout(function(){
                new Typewriter('#to-1', {loop: false, cursor: '', delay: 50}).typeString('> Welcome to XXXXXX').start();
                setTimeout(function(){
                    new Typewriter('#to-2', {loop: false, cursor: '', delay: 50}).typeString('> Enter your email').start()
                }, 2350)
            }, 4500)
            
        }, 300)
        $(".t-email").change(function(){
            var email = validateEmail($(".t-email").val())['input']
            console.log(email)
            if (email != null) {
                $.ajax({
                    url: '/api/email',
                    type: 'POST',
                    data: {
                        email: email
                    },

                    success: function(data) {
                        console.log(data)
                        $(".t-check").attr("src", "/static/icons/terminal-check.svg");

                        anime.timeline({loop: false}).add({
                            targets: '.terminal-check',
                            opacity: 1,
                            duration: 500,
                            easing: 'linear',
                        })
                        emailVerified();
                    },
                    error: function(data) {
                        console.log("error", data)
                        $(".t-check").attr("src", "/static/icons/terminal-cross.svg");
                        anime.timeline({loop: false}).add({
                            targets: '.terminal-check',
                            opacity: 1,
                            duration: 500,
                            easing: 'linear',
                        });
                    }
                })
            }

        })
        $(".t-pass").change(function(){
            var pass = $(".t-pass").val()
            console.log(pass)
            if (pass != null) {
                $.ajax({
                    url: '/api/pass',
                    type: 'POST',
                    data: {
                        pass: pass
                    },

                    success: function(data) {
                        console.log(data)
                        passVerified(data);
                    },
                    error: function(data) {
                        console.log("error", data)
                    }
                })
            }

        })
    }
});

function emailVerified(){
    anime.timeline({loop: false})
    .add({
        targets: '#to-3',
        opacity: 1,
        duration: 1000,
        delay: 1000,
        easing: 'linear',
    })
    .add({
        targets: '.t-pass',
        opacity: 1,
        duration: 800,
        delay: 1500,
        easing: 'linear',
    })
    setTimeout(function(){

        new Typewriter('#to-3', {loop: false, cursor: '', delay: 50}).typeString("> Enter password").start()
    },2000)

}


function passVerified(data){
    console.log(data)
    $(".terminal-output").css("opacity", "1")
    $("#to-4").show()
    $("#to-5").show()
    $("#to-6").show()
    new Typewriter('#to-4', {loop: false, cursor: '', delay: 50}).typeString("> Verifying Information..").start()
    setTimeout(function(){
        new Typewriter('#to-5', {loop: false, cursor: '', delay: 50}).typeString("> Password check completed..").start()
        setTimeout(function(){
            new Typewriter('#to-6', {loop: false, cursor: '', delay: 50}).typeString("> Logging In..").start()
            setTimeout(function(){
                var tl = gsap.timeline()
                $(".wlcmsg").fadeIn(1000)
                $(".wcmsg").text(data['success'])
                setTimeout(function(){
                    $(".lgcontainer").fadeOut(600)
                    $(".background").fadeOut(600)
                    $(".warp-vid").fadeIn(600)
                    
                    $(".warp-vid").get(0).play();
                    setTimeout(function(){

                        $(".logoo").animate({width: "100%", height: "100%", opacity: 1, borderRadius: 0}, 1000)
                        setTimeout(function(){
                            window.location.reload()
                        }, 600)
                    }, 2000)
                }, 3000)
            }, 3000)
        }, 2000)
    }, 1500)


}

$(".warp-vid").get(0).pause();
