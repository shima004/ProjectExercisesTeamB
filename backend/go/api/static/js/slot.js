
        alert("~ARE YOU READY???~")   //alert

        var sw;
        stt = 0;
        var chec;

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

            if (elements[0].checked == true) {
                chec = 20;
            } else if (elements[1].checked == true) {
                chec = 50;
            } else if (elements[2].checked == true) {
                chec = 100;
            } else if (elements[3].checked == true) {
                chec = 150;
            }


            if (stop1 == 1 && stop2 == 1 && stop3 == 1) {
                if (cg1 == cg2 && cg1 == cg3) {
                    let element = document.getElementById('hanteii');
                    element.value = '~WIN!!~';
                    if (cg1==1) {
                        coincnt = chec * 1.2;
                        console.log(coincnt);
                        postCoin(coincnt);
                    } else if (cg==2) {
                        coincnt = chec * 1.5;
                        console.log(coincnt);
                        postCoin(coincnt);
                    } else if (cg==3) {
                        coincnt = chec * 1.7;
                        console.log(coincnt);
                        postCoin(coincnt);
                    } else if (cg==4) {
                        coincnt = chec * 2.0;
                        console.log(coincnt);
                        postCoin(coincnt);
                    }

                } else {
                    let element = document.getElementById('hanteii');
                    element.value = '~lose(´ω`)~';
                    postCoin(chec);
                    console.log(chec);
                }
            }
            sw = 0;
        }


        function slot2_stop() {
            clearInterval(sp2);
            stop2 = 1;

            if (elements[0].checked == true) {
                chec = 20;
            } else if (elements[1].checked == true) {
                chec = 50;
            } else if (elements[2].checked == true) {
                chec = 100;
            } else if (elements[3].checked == true) {
                chec = 150;
            }

            if (stop1 == 1 && stop2 == 1 && stop3 == 1) {
                if (cg1 == cg2 && cg1 == cg3) {
                    let element = document.getElementById('hanteii');
                    element.value = '~WIN!!~';
                    if (cg1==1) {
                        coincnt = chec * 1.2;
                        console.log(coincnt);
                        postCoin(coincnt);
                    } else if (cg==2) {
                        coincnt = chec * 1.5;
                        console.log(coincnt);
                        postCoin(coincnt);
                    } else if (cg==3) {
                        coincnt = chec * 1.7;
                        console.log(coincnt);
                        postCoin(coincnt);
                    } else if (cg==4) {
                        coincnt = chec * 2.0;
                        console.log(coincnt);
                        postCoin(coincnt);
                    }

                } else {
                    let element = document.getElementById('hanteii');
                    element.value = '~lose(´ω`)~';
                    postCoin(chec);
                    console.log(chec);
                    
                }
            //sw = 0;
            }
        }


        function slot3_stop() {
            clearInterval(sp3);
            stop3 = 1;

            if (elements[0].checked == true) {
                chec = 20;
            } else if (elements[1].checked == true) {
                chec = 50;
            } else if (elements[2].checked == true) {
                chec = 100;
            } else if (elements[3].checked == true) {
                chec = 150;
            }

            if (stop1 == 1 && stop2 == 1 && stop3 == 1) {
                if (cg1 == cg2 && cg1 == cg3) {
                    let element = document.getElementById('hanteii');
                    element.value = '~WIN!!~';
                    if (cg1==1) {
                        coincnt = chec * 1.2;
                        console.log(coincnt);
                        postCoin(coincnt);
                    } else if (cg==2) {
                        coincnt = chec * 1.5;
                        console.log(coincnt);
                        postCoin(coincnt);
                    } else if (cg==3) {
                        coincnt = chec * 1.7;
                        console.log(coincnt);
                        postCoin(coincnt);
                    } else if (cg==4) {
                        coincnt = chec * 2.0;
                        console.log(coincnt);
                        postCoin(coincnt);
                    }
                    
                } else {
                    let element = document.getElementById('hanteii');
                    element.value = '~lose(´ω`)~';
                    postCoin(chec);
                    console.log(chec);
                }
            //sw = 0;
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


        function slot_bet() {
            sw = 1;
            //document.getElementById('srt').disabled = false;
            //let formElements = document.forms.contactForm;
            //formElements.submit.disabled = false;
        }

