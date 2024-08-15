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
            $(".spaceship").fadeIn(500)
            $("#md-4").fadeIn(500)    
            $("#md-5").fadeIn(500) 
    
            $(".rescue-progress").fadeOut()
            imageChange()
        }, 900)
    }
    active = "resources"
})
let newImg = new Image();
newImg.src = "/static/images/bg-2.svg";

function imageChange(){

$(".bgimg").fadeOut(500, function() {
    document.querySelector(".bgimg").src = newImg.src;

    $(".bgimg").fadeIn(1000);
});

}

setTimeout(function(){

    const ctx = document.getElementById('fuelchart').getContext('2d');
    const myChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: ['19:00', '', '20:00','',  '21:00','', '22:00','', '23:00','', '24:00'],
            datasets: [{
                label: '',
                data: [2, 3, 1.5, 5, 2.7, 4, 1, 2.7, 4, 2, 3, 5, 6, 4, 3, 5, 1, 2 ,5],
                borderColor: 'white',
                borderWidth: 3,
                fill: false,
                tension: 0.3 
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
    
                x: {
                    ticks: {
                        color: '#FFFFFF33',
                    },
                    grid:{
                        display: false
                    }
                },
                y: {
                    display: false,
                    beginAtZero: true,
                    max: 8 // Hide the y-axis,
                }
            },
            plugins: {
                legend: {
                    display: false // Hide the legend
                }
            },
            elements: {
                line: {
                    borderColor: 'white',
                    borderWidth: 3
                },
                point: {
                    radius: 0 // Hide points
                }
            }
        }
    });
}, 2000)


$(".y").change(function(){
    
    anime.timeline({loop: false})
    .add({
        targets: '.main',
        scale: .8,
        duration: 5000,
        ease: 'easeInElastic',
        delay: 1000
    })
    .add({
        targets: '.main',
        scale: 1,
        duration: 2000,
        easing: 'linear',
    })
})

$(".x").change(function(){
        
        anime.timeline({loop: false})
        .add({
            targets: '.main',
            scale: .6,
            duration: 5000,
            ease: 'easeInElastic',
            delay: 1000
        })
        .add({
            targets: '.main',
            scale: 1,
            duration: 2000,
            easing: 'linear',
        })
    }
)
$(".r").change(function(){
        
        anime.timeline({loop: false})
        .add({
            targets: '.main',
            rotate: 2,
            scale: .9,
            duration: 4000,
            ease: 'easeInElastic'
        })
        .add({
            targets: '.main',
            rotate: 0,
            scale: 1,
            duration: 2000,
            easing: 'linear',
        })
    })

    function updateTempColor(temp) {
        if (temp < 15) {
            $('.temp-txt').css('color', 'blue');
        } else if (temp < 25) {
            $('.temp-txt').css('color', 'lightblue');
        } else if (temp < 30) {
            $('.temp-txt').css('color', 'orange');
        } else {
            $('.temp-txt').css('color', 'red');
        }
    }

    $('#temp-up').on('click', function() {
        let temp = parseInt($('.temp-txt').text());
        temp++;
        $('.temp-txt').text(temp);
        updateTempColor(temp);
    });

    $('#temp-down').on('click', function() {
        let temp = parseInt($('.temp-txt').text());
        temp--;
        $('.temp-txt').text(temp);
        updateTempColor(temp);
    });

    updateTempColor(parseInt($('.temp-txt').text()));

$(".madd").click(function(){
    if ($(this).hasClass("active")){
        $(".modal").fadeOut()
        anime.timeline({loop: false})
    
        .add({
            targets: '.madd',
            rotate: 0,
        })
        $(this).removeClass("active")
        $(".messages.switcher").fadeIn()
} else{
    $(".modal").fadeIn()
    anime.timeline({loop: false})

.add({
    targets: '.madd',
    rotate: -45,
})
$(this).addClass("active")
$(".messages.switcher").fadeOut()
    
}
})


$(".message-send").submit(function(e){
    e.preventDefault()
    let message = $(".message-input").val()
    console.log(message)
    $(".message-input").val("")

    $.ajax
    ({
        type: "POST",
        url: "/send-message",
        data: {message: message},
        success: function (data) {
            console.log(data)
        }
    });
}
)

// // AIconst videoElement = document.querySelector('#avideo'); // Video element
// const videoElement = document.querySelector('#avideo'); // Video element
// const captionsElement = document.querySelector('.call-captions');
// var caller = 0;
// var mediaRecorder2;
// var stream;

// // Click handler for caller options
// $(".caller-option").click(function(){
//     $(".caller-option").fadeOut();
//     $(".ac-t").fadeOut();
//     caller = $(this).attr("id").split("-")[1];
//     console.log(caller);
//     callerSet(caller);
// });

// // Function to set up the call
// async function callerSet(caller){
//     setTimeout(async function(){
//         $(".call").fadeIn();
//         await startVideo();
//         handleAudio(); 
//     }, 400);
// }

// // Function to start video and audio
// async function startVideo() {
//     try {
//         stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
//         videoElement.srcObject = stream;
//         $(".avideo").fadeIn();
//         console.log('Video stream assigned:', stream);
//     } catch (error) {
//         console.error('Error accessing the camera/microphone:', error);
//     }
// }

// // Function to send audio blob to the backend
// async function sendAudio(blob) {
//     const formData = new FormData();
//     formData.append('audio', blob);
//     formData.append('caller', caller); // Include caller information if needed

//     try {
//         const response = await fetch('/transcribe', {
//             method: 'POST',
//             body: formData
//         });

//         if (!response.ok) {
//             throw new Error('Network response was not ok');
//         }

//         const data = await response.json();
//         captionsElement.innerHTML = data.transcript;

//         // Play the response audio
//         const audio = new Audio(data.audio_file);
//         audio.play();
//     } catch (error) {
//         console.error('Error sending audio:', error);
//     }
// }

// // Function to handle audio recording
// async function handleAudio() {
//     if (!stream) {
//         console.error('No stream available');
//         return;
//     }

//     mediaRecorder2 = new MediaRecorder(stream);
//     const chunks = [];

//     // Collect audio data chunks
//     mediaRecorder2.ondataavailable = (event) => {
//         chunks.push(event.data);
//     };

//     // Process audio data once recording stops
//     mediaRecorder2.onstop = () => {
//         const blob = new Blob(chunks, { type: 'audio/wav' });
//         sendAudio(blob);
//     };

//     // Start recording
//     mediaRecorder2.start();
    
//     // Stop recording after 5 seconds (adjust as needed)
//     setTimeout(() => mediaRecorder2.stop(), 5000);
// }

// // Function to end the call
// function endCall() {
//     // Stop video and audio tracks
//     if (stream) {
//         stream.getTracks().forEach(track => track.stop());
//         videoElement.srcObject = null;
//     }

//     // Stop media recorder if active
//     if (mediaRecorder2 && mediaRecorder2.state !== 'inactive') {
//         mediaRecorder2.stop();
//     }

//     // Hide call UI elements
//     $(".call").fadeOut();
//     $(".caller-option").fadeIn();
//     $(".ac-t").fadeIn();
// }

// // Event listener for the End Call button
// $("#endbtn").click(endCall);


$("#to-outbox").click(function(){
    $(".inbox").fadeOut(500)
    $("#to-inbox").removeClass("active")
    $("#to-outbox").addClass("active")
    setTimeout(function(){

        $(".outbox").fadeIn(500)
    },600)
})

$("#to-inbox").click(function(){
    $(".outbox").fadeOut(500)
    $("#to-outbox").removeClass("active")
    $("#to-inbox").addClass("active")
    setTimeout(function(){

        $(".inbox").fadeIn(500)
    },600)
})
setTimeout(function(){
    $(".time-now").text(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false }));
}, 60000)