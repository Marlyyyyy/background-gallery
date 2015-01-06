/*
*  Author: Marton Szeles
*/

var BackgroundGalleryModule = (function(){

    var settings, imageArr, imageArrLength, background1, background2, backgroundContainer, mainContainer, intervalID, cPanel;
    var position = 0;
    var clock = true;

    function init(images, options){

        imageArr        = images;
        imageArrLength  = images.length;
        mainContainer   = $(".main-container");

        settings = $.extend({
            "fadeSpeed"        : 500,
            "slideDuration"    : 5000,
            "controlPanel"     : false,
            "hasExit"          : false
        }, options || {});

        registerEventListeners();

        return this;
    }

    // Draws the UI in the background with the foreground also visible.
    function setupUI(){

        backgroundContainer    = document.createElement('div');
        backgroundContainer.className  = "background-container";

        background1            = document.createElement('div');
        background1.className  = "background-pic";
        background1.id         = "background-pic-01";

        background2            = document.createElement('div');
        background2.className  = "background-pic";
        background2.id         = "background-pic-02";

        backgroundContainer.appendChild(background1);
        backgroundContainer.appendChild(background2);

        document.body.appendChild(backgroundContainer);

        if (settings.controlPanel){
            createCPanel();
        }

        return this;
    }

    function removeUI(){

        if (typeof backgroundContainer !== "undefined"){
            if (document.body === backgroundContainer.parentNode){
                document.body.removeChild(backgroundContainer);
                removeCPanel();
            }
        }

        return this;
    }

    // Control Panel
    function createCPanel(){

        cPanel = document.createElement('div');
        cPanel.className = "c-container";

        var cLeft       = document.createElement('div');
        cLeft.className = "c-move c-left";

        var cRight       = document.createElement('div');
        cRight.className = "c-move c-right";

        cPanel.appendChild(cLeft);
        cPanel.appendChild(cRight);

        var previous       = document.createElement('div');
        previous.className = "c-arrow image-rotator";
        previous.setAttribute("name","previous");

        var next       = document.createElement('div');
        next.className = "c-arrow image-rotator";
        next.setAttribute("name","next");

        cLeft.appendChild(previous);
        cRight.appendChild(next);

        if (settings.hasExit){
            var cExit = document.createElement('div');
            cExit.className = "c-exit image-rotator";
            cExit.setAttribute("name","exit");
            cPanel.appendChild(cExit);
        }

        document.body.appendChild(cPanel);

        return this;
    }

    function removeCPanel(){

        if ( typeof cPanel !== "undefined"){
            document.body.removeChild(cPanel);
        }

        while (cPanel.firstChild){
            cPanel.removeChild(cPanel.firstChild);
        }

        return this;
    }

    function registerEventListeners(){

        $(document).on("click", ".image-rotator", function(){

            var task = $(this).attr("name");

            switch(task){
                case "next":
                    stepForward();
                    break;
                case "previous":
                    stepBackward();
                    break;
                case "pause":
                    pause();
                    break;
                case "resume":
                    start();
                    break;
                case "jump":
                    focus();
                    jumpTo($(this).attr("id"));
                    break;
                case "exit":
                    blur();
                    break;
            }
        });

        // Pressing ESC
        if (settings.hasExit){
            $(document).keyup(function(e) {

                if (e.keyCode == 27) {
                    blur();
                }
            });
        }
    }

    // Smooth change between backgrounds
    function move(){

        if (clock){
            // Show top layer
            changeBackground(background1, "url("+imageArr[position]+")", function(){$(background1).finish().fadeIn(settings.fadeSpeed)});
        }else{
            // Show bottom layer
            changeBackground(background2, "url("+imageArr[position]+")", function(){$(background1).finish().fadeOut(settings.fadeSpeed)});
        }

        function changeBackground(obj, background, callback){
            $(obj).css({"background-image":background});
            callback();
        }

        clock = !clock;
    }

    // Starts the slideshow with an automatic playback
    function start(){

        move();
        intervalID =   window.setInterval(function(){
            position = (position + 1) % imageArrLength;
            move();
        }, settings.slideDuration);

        return this;
    }

    // Pauses the playback
    function pause(){

        clearInterval(intervalID);

        return this;
    }

    function stepForward(){

        pause();
        position++;
        position = position % imageArrLength;
        move();

        return this;
    }

    function stepBackward(){

        pause();
        position--;
        position = position % imageArrLength;
        if (position < 0) position += imageArrLength;
        move();

        return this;
    }

    // Pauses the playback and jumps to a specified position in the slideshow
    function jumpTo(pos){

        pause();
        position = pos;
        move();

        return this;
    }

    // Draws and displays the UI and hides the foreground
    function focus(){

        setupUI();
        $(mainContainer).fadeOut(100);

        return this;
    }

    // Removes the UI and shows the foreground
    function blur(){

        removeUI();
        $(mainContainer).fadeIn(100);

        return this;
    }

    function lowerOpacity(){

        $(backgroundContainer).addClass("blur");

        return this;
    }

    return {
        init:init,
        create:setupUI,
        shade:lowerOpacity,
        focus:focus,
        blur:blur,
        start:start,
        pause:pause,
        stepForward:stepForward,
        stepBackward:stepBackward,
        jumpTo:jumpTo
    }
})();