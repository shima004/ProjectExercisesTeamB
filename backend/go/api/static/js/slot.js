
        alert("~ARE YOU READY???~")   //alert

        var sw;
        stt = 0;

        var flag;
        var coincnt;

        var sp1;
        var sp2;
        var sp3;

        var stop1;
        var stop2;
        var stop3;

        var cg1;
        var cg2;
        var cg3;

        var bet;



        function setImage() {
            //if (sw==1) {
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

                sp1 = setInterval(loopup1, 150);

                var loopup2 = function () {

                document.getElementById('img2').src = img[cg2++];

                    if (cg2 > 4) {
                        cg2 = 0;
                    }

                }

                sp2 = setInterval(loopup2, 150);

                var loopup3 = function () {
                    document.getElementById('img3').src = img[cg3++];

                    if (cg3 > 4) {
                        cg3 = 0;
                    }
                }
                sp3 = setInterval(loopup3, 150);
            //}
        }


        function slot1_stop() {
            clearInterval(sp1);
            stop1 = 1;

            if (stop1 == 1 && stop2 == 1 && stop3 == 1) {
                if (cg1 == cg2 && cg1 == cg3) {
                    let element = document.getElementById('hanteii');
                    element.value = '~WIN!!~';
                    if (cg1==1 && cg1 == 2 && cg == 3 && cg == 4 && cg == 5) {
                           //　ラジオボタンの数だけ判定を繰り返す（ボタンを表すインプットタグがあるので１引く）
                        for(var i=0; i<document.COIN.bet.length-1;i++){
 
                            // i番目のラジオボタンがチェックされているかを判定
                            if(document.COIN.bet[i].checked){ 
                            flag = i;
                            }  

                        }   

                        if (flag == 0) {
                            coincnt = 20 * 2
                        } else if (flag==1) {
                            coincnt = 50 * 2;
                        }
                        console.log(coincnt);
                        postCoin(100);
                    }

                } else {
                    let element = document.getElementById('hanteii');
                    element.value = '~lose(´ω`)~';
                    postCoin(-50);
                    console.log("-50");
                }
            }
            sw = 0;
        }


        function slot2_stop() {
            clearInterval(sp2);
            stop2 = 1;

            if (stop1 == 1 && stop2 == 1 && stop3 == 1) {
                if (cg1 == cg2 && cg1 == cg3) {
                    let element = document.getElementById('hanteii');
                    element.value = '~WIN!!~';
                    postCoin(100);
                } else {
                    let element = document.getElementById('hanteii');
                    element.value = '~lose(´ω`)~';
                    postCoin(-50);
                    
                }
            }
            sw = 0;
        }


        function slot3_stop() {
            clearInterval(sp3);
            stop3 = 1;

            if (stop1 == 1 && stop2 == 1 && stop3 == 1) {
                if (cg1 == cg2 && cg1 == cg3) {
                    let element = document.getElementById('hanteii');
                    element.value = '~WIN!!~';
                    postCoin(100);
                } else {
                    let element = document.getElementById('hanteii');
                    element.value = '~lose(´ω`)~';
                    postCoin(-50);
                }
            }
            sw = 0;
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


        function slot_bet() {
            sw = 1;
            //document.getElementById('srt').disabled = false;
            //let formElements = document.forms.contactForm;
            //formElements.submit.disabled = false;
        }

