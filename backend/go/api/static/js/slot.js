
        alert("~ARE YOU READY???~")

        var sp1;
        var sp2;
        var sp3;

        var stop1;
        var stop2;
        var stop3;

        var cg1;
        var cg2;
        var cg3;

        let audioElm = new Audio('../static/img/sounds_lose.mp3');
        const music = new Audio('../static/img/sounds_lose.mp3');
        music.volume = 1;


        function setImage() {

            cg1 = 0;
            cg2 = 0;
            cg3 = 0;

            stop1 = 0;
            stop2 = 0;
            stop3 = 0;

            var img = ["../static/img/pt1.png", "../static/img/pt2.png", "../static/img/pt3.png", "../static/img/pt4.png", "../static/img/pt5.png"];

            let element = document.getElementById('hanteii');
            element.value = 'SPINNING';


            var loopup1 = function () {

                document.getElementById('img1').src = img[cg1++];

                if (cg1 > 4) {
                    cg1 = 0;
                }

            }

            sp1 = setInterval(loopup1, 130);

            var loopup2 = function () {

                document.getElementById('img2').src = img[cg2++];

                if (cg2 > 4) {
                    cg2 = 0;
                }

            }


            sp2 = setInterval(loopup2, 90);

            var loopup3 = function () {
                document.getElementById('img3').src = img[cg3++];

                if (cg3 > 4) {
                    cg3 = 0;
                }
            }
            sp3 = setInterval(loopup3, 70);
        }


        function slot1_stop() {
            clearInterval(sp1);
            stop1 = 1;

            if (stop1 == 1 && stop2 == 1 && stop3 == 1) {
                if (cg1 == cg2 && cg1 == cg3) {
                    let element = document.getElementById('hanteii');
                    music.play();
                    element.value = '~WIN!!~';
                } else {
                    let element = document.getElementById('hanteii');
                    music.pause()
                    element.value = '~lose(´ω`)~';
                    audioElm.play();
                }
            }
        }


        function slot2_stop() {
            clearInterval(sp2);
            stop2 = 1;

            if (stop1 == 1 && stop2 == 1 && stop3 == 1) {
                if (cg1 == cg2 && cg1 == cg3) {
                    let element = document.getElementById('hanteii');
                    music.play();
                    element.value = '~WIN!!~';
                } else {
                    let element = document.getElementById('hanteii');
                    music.pause()
                    element.value = '~lose(´ω`)~';
                    audioElm.play();
                }
            }
        }


        function slot3_stop() {
            clearInterval(sp3);
            stop3 = 1;

            if (stop1 == 1 && stop2 == 1 && stop3 == 1) {
                if (cg1 == cg2 && cg1 == cg3) {
                    let element = document.getElementById('hanteii');
                    music.play();
                    element.value = '~WIN!!~';
                } else {
                    let element = document.getElementById('hanteii');
                    music.pause()
                    element.value = '~lose(´ω`)~';
                    audioElm.play();
                }
            }
        }


        function hikaku_slot() {
            if (stop1 == 1 && stop2 == 1 && stop3 == 1) {
                if (cg1 == cg2 && cg1 == cg3) {
                    let element = document.getElementById('hanteii');
                    element.value = 'win';
                } else {
                    let element = document.getElementById('hanteii');
                    element.value = 'lose';
                }
            }
        }

