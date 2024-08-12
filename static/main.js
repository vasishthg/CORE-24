$(document).ready(function(){
        setTimeout(function(){
            $(".background").fadeIn(500)
            $(".background").animate({
                opacity: 1
            })
            $(".bgimg").fadeIn(500)
        },100)
})
const video = document.getElementById('rvideo'); // Ensure the video element ID matches your HTML
let mediaRecorder;
let recordedChunks = [];
const $durationEl = $('.dur');
let startTime;
let durationInterval;

$(".stop").hide(); // Initially hide the stop button

$(".record").click(function() {
    $(".novidpl").fadeOut()
    $(this).animate({ opacity: 0 }).hide(1200);

    setTimeout(function() {
        $(".stop").fadeIn(1000);
    }, 1500);

    navigator.mediaDevices.getUserMedia({ video: true, audio: true })
        .then(stream => {
            video.srcObject = stream;

            mediaRecorder = new MediaRecorder(stream);

            mediaRecorder.ondataavailable = event => {
                if (event.data.size > 0) {
                    recordedChunks.push(event.data);
                }
            };

            mediaRecorder.onstop = () => {
                clearInterval(durationInterval); // Clear the duration interval when stopping the recording

                const blob = new Blob(recordedChunks, { type: 'video/webm' });
                recordedChunks = [];

                const formData = new FormData();
                formData.append('video', blob);

                $.ajax({
                    url: '/upload/vid',
                    type: 'POST',
                    data: formData,
                    contentType: false,
                    processData: false,
                    success: function(response) {
                        alert('Video uploaded successfully!');
                    },
                    error: function(xhr, status, error) {
                        console.error('Error uploading video:', error);
                    }
                });
            };

            mediaRecorder.start(); 
            startTime = Date.now();

            durationInterval = setInterval(function () {
                const elapsedTime = Math.floor((Date.now() - startTime) / 1000);
                const minutes = String(Math.floor(elapsedTime / 60)).padStart(2, '0');
                const seconds = String(elapsedTime % 60).padStart(2, '0');
                $durationEl.text(`${minutes}:${seconds}`);
            }, 1000);
        })
        .catch(error => {
            console.error('Error accessing media devices:', error);
        });
});

$(".stop").click(function() {
    mediaRecorder.stop(); 
    $(".novidpl").fadeIn()
    let stream = video.srcObject;
    if (stream) {
        let tracks = stream.getTracks();
        tracks.forEach(track => track.stop());
    }
    video.srcObject = null;
    $(this).hide();
    $(".record").show().animate({ opacity: 1 }, 1000);
    $durationEl.text('00:00');
});

var active = "home"

$("#to-messages").click(function(){
    if (active === "home"){
        $("#md-3").fadeOut(500)
        $(".active-blob").animate({
            top: "4.75em"
        })
        setTimeout(function(){
            $("#md-1").animate({
                height: "178%",
                width: "90%"
            })
            $(".dash-routine").fadeOut(500)
            $(".rescue-progress").fadeOut(500)
            $("#md-2").animate({
                width: "103%",
                marginLeft: "-4%"
            })
            setTimeout(function(){
                $(".aicall").fadeIn(500)
                $(".messages").fadeIn(500)
            }, 500)
    
        }, 500)
    }
    active = "messages"
})

$("#to-slope").click(function(){
    if (active === "home"){
        $("#md-3").fadeOut(500)
        $(".active-blob").animate({
            top: "15.45em"
        })
        setTimeout(function(){
            $("#md-2").fadeOut(500)
            $("#md-1").animate({
                height: "178%",
                width: "211%"
            })
            $(".dash-routine").fadeOut(500)
            $(".rescue-progress").fadeOut(500)
            $('.slope').fadeIn()
            // setTimeout(function(){
            //     $(".aicall").fadeIn(500)
            //     $(".messages").fadeIn(500)
            // }, 500)
    
        }, 500)
    }
    active = "slope"
})

$("#to-resources").click(function(){
})
if (active === "home"){
    
    $(".active-blob").animate({
        top: "8.35em"
    })
    
    $("#md-2").fadeOut(500)
    $("#md-3").fadeOut(500)    

    setTimeout(function(){
        $("#md-1").animate({
            height: "178%",
            width: "391px"
        })
        $(".mainlanding").css("grid-template-columns", "33% auto auto")
        $("#md-1").animate({
            height: "178%",
            width: "91%"
        })
        $("#md-4").fadeIn(500)    
        $("#md-5").fadeIn(500) 

        $(".rescue-progress").fadeOut()
        imageChange()
    }, 900)
}
let newImg = new Image();
newImg.src = "/static/images/bg-2.svg";

function imageChange(){

$(".bgimg").fadeOut(500, function() {
    document.querySelector(".bgimg").src = newImg.src;

    $(".bgimg").fadeIn(1000);
});

}

var caller = 0
$(".caller-option").click(function(){
    $(".caller-option").fadeOut()
    $(".ac-t").fadeOut()
    caller = $(this).attr("id").split("-")[1]
    console.log(caller)
    callerSet(caller)
})

function callerSet(caller){
    setTimeout(function(){
        $(".call").fadeIn()
    }, 400)
}
const captionsDiv = document.querySelector('.call-captions');
captionsDiv.scrollTop = captionsDiv.scrollHeight;