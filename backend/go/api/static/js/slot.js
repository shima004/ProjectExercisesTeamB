
        var sw;
        stt = 0;
        var chec=0;

        var stt;
        stt = 0;

        var flag;
        var coincnt;

        var ataricnt;
        ataricnt = 0;

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
            stt = 1;
            //const button = document.getElementById("ボタンのID");
            //button.disabled = true
            //if (sw==0) {
                //const stop1 = document.getElementById("stopp1");
                //stop1.disabled = false;
                //const stop2 = document.getElementById("stopp2");
                //stop2.disabled = false;
                //const stop2 = document.getElementById("stopp3");
                //stop2.disabled = false;
            //}

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


        //unction setImage() {

            //cg1 = 0;
            //cg2 = 0;
            //cg3 = 0;

            //stop1 = 0;
            //stop2 = 0;
            //stop3 = 0;

            //var img = ["../static/img/pt1.png", "../static/img/pt2.png", "../static/img/pt3.png", "../static/img/pt4.png", "../static/img/pt5.png"];

            //let element = document.getElementById('hanteii');
            //element.value = 'SPINNING';


            //var loopup1 = function () {

                //document.getElementById('img1').src = img[cg1++];

                //if (cg1 > 4) {
                  //  cg1 = 0;
               // }

            //}


            //sp1 = setInterval(loopup1, 130);

            //var loopup2 = function () {

              //  document.getElementById('img2').src = img[cg2++];

                //if (cg2 > 4) {
                  //  cg2 = 0;
                //}

            //}


            //sp2 = setInterval(loopup2, 90);

            //var loopup3 = function () {
              //  document.getElementById('img3').src = img[cg3++];

                //if (cg3 > 4) {
                  //  cg3 = 0;
                //}
            //}
            //sp3 = setInterval(loopup3, 70);
        //}


        function slot1_stop() {
           clearInterval(sp1);
            stop1 = 1;
            /*if (document.COIN.bet[0].checked == true) {
                chec = 20;
            } else if (document.COIN.bet[1].checked == true) {
                chec = 50;
            } else if (document.COIN.bet[2].checked == true) {
                chec = 100;
            } else if (document.COIN.bet[3].checked == true) {
                chec = 150;
            }*/



            if (stop1 == 1 && stop2 == 1 && stop3 == 1) {
                if (cg1 == cg2 && cg1 == cg3) {
                    let element = document.getElementById('hanteii');
                    element.value = '~WIN!!~';
                    ataricnt = ataricnt + 1;
                    if (ataricnt >= 2) {
                        check = check * 1.5;
                    }
                    const win = document.getElementById('win');
                    win.play();
                    let element2 = document.getElementById('betkoinn');
                    element2.value = "0枚";
                    if (cg1==0) {
                        coincnt = chec * 1.2;
                        console.log(coincnt);
                        postCoin(coincnt);
                        alert(coincnt + "枚ゲットしました！")   //alert
                    } else if (cg1==1) {
                        coincnt = chec * 1.5;
                        console.log(coincnt);
                        postCoin(coincnt);
                        alert(coincnt + "枚ゲットしました！")   //alert
                    } else if (cg1==2) {
                        coincnt = chec * 1.7;
                        console.log(coincnt);
                        postCoin(coincnt);
                        alert(coincnt + "枚ゲットしました！")   //alert
                    } else if (cg1==3) {
                        coincnt = chec * 2.0;
                        console.log(coincnt);
                        postCoin(coincnt);
                        alert(coincnt + "枚ゲットしました！")   //alert
                    } else if (cg1==4) {
                        coincnt = chec * 2.5;
                        console.log(coincnt);
                        postCoin(coincnt);
                        alert(coincnt + "枚ゲットしました！")   //alert
                    }
                } else {
                    let element = document.getElementById('hanteii');
                    element.value = '~lose(´ω`)~';
                    ataricnt = 0;
                    const lose = document.getElementById('lose');
                    lose.play();
                    let element2 = document.getElementById('betkoinn');
                    element2.value = "0枚";
                    postCoin(-chec);
                    console.log(-chec);
                }
            }

            if (document.COIN.bet[0].checked == true) {
                document.COIN.bet[0].checked = false
            } else if (document.COIN.bet[1].checked == true) {
                document.COIN.bet[1].checked = false
            } else if (document.COIN.bet[2].checked == true) {
                document.COIN.bet[2].checked = false
            } else if (document.COIN.bet[3].checked == true) {
                document.COIN.bet[3].checked = false
            }

        }


        function slot2_stop() {
            clearInterval(sp2);
            stop2 = 1;


            /*if (document.COIN.bet[0].checked == true) {
                chec = 20;
            } else if (document.COIN.bet[1].checked == true) {
                chec = 50;
            } else if (document.COIN.bet[2].checked == true) {
                chec = 100;
            } else if (document.COIN.bet[3].checked == true) {
                chec = 150;
            }*/

            if (stop1 == 1 && stop2 == 1 && stop3 == 1) {
                if (cg1 == cg2 && cg1 == cg3) {
                    let element = document.getElementById('hanteii');
                    element.value = '~WIN!!~';
                    ataricnt = ataricnt + 1;
                    if (ataricnt >= 2) {
                        check = check * 1.5;
                    }
                    const win = document.getElementById('win');
                    win.play();
                    let element2 = document.getElementById('betkoinn');
                    element2.value = "0枚";
                    if (cg1==0) {
                        coincnt = chec * 1.2;
                        console.log(coincnt);
                        postCoin(coincnt);
                        alert(coincnt + "枚ゲットしました！")   //alert
                    } else if (cg1==1) {
                        coincnt = chec * 1.5;
                        console.log(coincnt);
                        postCoin(coincnt);
                        alert(coincnt + "枚ゲットしました！")   //alert
                    } else if (cg1==2) {
                        coincnt = chec * 1.7;
                        console.log(coincnt);
                        postCoin(coincnt);
                        alert(coincnt + "枚ゲットしました！")   //alert
                    } else if (cg1==3) {
                        coincnt = chec * 2.0;
                        console.log(coincnt);
                        postCoin(coincnt);
                        alert(coincnt + "枚ゲットしました！")   //alert
                    } else if (cg1==4) {
                        coincnt = chec * 2.5;
                        console.log(coincnt);
                        postCoin(coincnt);
                        alert(coincnt + "枚ゲットしました！")   //alert
                    }

                } else {
                    let element = document.getElementById('hanteii');
                    element.value = '~lose(´ω`)~';
                    ataricnt = 0;
                    const lose = document.getElementById('lose');
                    lose.play();
                    let element2 = document.getElementById('betkoinn');
                    element2.value = "0枚";
                    postCoin(-chec);
                    console.log(-chec);
                    
                }
            }

            if (document.COIN.bet[0].checked == true) {
                document.COIN.bet[0].checked = false
            } else if (document.COIN.bet[1].checked == true) {
                document.COIN.bet[1].checked = false
            } else if (document.COIN.bet[2].checked == true) {
                document.COIN.bet[2].checked = false
            } else if (document.COIN.bet[3].checked == true) {
                document.COIN.bet[3].checked = false
            }
        }


        function slot3_stop() {
            clearInterval(sp3);
            stop3 = 1;

            /*if (document.COIN.bet[0].checked == true) {
                chec = 20;
            } else if (document.COIN.bet[1].checked == true) {
                chec = 50;
            } else if (document.COIN.bet[2].checked == true) {
                chec = 100;
            } else if (document.COIN.bet[3].checked == true) {
                chec = 150;
            }*/

            if (stop1 == 1 && stop2 == 1 && stop3 == 1) {
                if (cg1 == cg2 && cg1 == cg3) {
                    let element = document.getElementById('hanteii');
                    element.value = '~WIN!!~';
                    ataricnt = ataricnt + 1;
                    if (ataricnt >= 2) {
                        check = check * 1.5;
                    }
                    const win = document.getElementById('win');
                    win.play();
                    let element2 = document.getElementById('betkoinn');
                    element2.value = "0枚";
                    if (cg1==0) {
                        coincnt = chec * 1.2;
                        console.log(coincnt);
                        postCoin(coincnt);
                        alert(coincnt + "枚ゲットしました！")   //alert
                    } else if (cg1==1) {
                        coincnt = chec * 1.5;
                        console.log(coincnt);
                        postCoin(coincnt);
                        alert(coincnt + "枚ゲットしました！")   //alert
                    } else if (cg1==2) {
                        coincnt = chec * 1.7;
                        console.log(coincnt);
                        postCoin(coincnt);
                        alert(coincnt + "枚ゲットしました！")   //alert
                    } else if (cg1==3) {
                        coincnt = chec * 2.0;
                        console.log(coincnt);
                        postCoin(coincnt);
                        alert(coincnt + "枚ゲットしました！")   //alert
                    } else if (cg1==4) {
                        coincnt = chec * 2.5;
                        console.log(coincnt);
                        postCoin(coincnt);
                        alert(coincnt + "枚ゲットしました！")   //alert
                    }

                } else {
                    let element = document.getElementById('hanteii');
                    element.value = '~lose(´ω`)~';
                    ataricnt = 0;
                    const lose = document.getElementById('lose');
                    lose.play();
                    let element2 = document.getElementById('betkoinn');
                    element2.value = "0枚";
                    postCoin(-chec);
                    console.log(-chec);
                }
            }

            if (document.COIN.bet[0].checked == true) {
                document.COIN.bet[0].checked = false
            } else if (document.COIN.bet[1].checked == true) {
                document.COIN.bet[1].checked = false
            } else if (document.COIN.bet[2].checked == true) {
                document.COIN.bet[2].checked = false
            } else if (document.COIN.bet[3].checked == true) {
                document.COIN.bet[3].checked = false
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
            if (document.COIN.bet[0].checked == true) {
                chec = 20;
            } else if (document.COIN.bet[1].checked == true) {
                chec = 50;
            } else if (document.COIN.bet[2].checked == true) {
                chec = 100;
            } else if (document.COIN.bet[3].checked == true) {
                chec = 150;
            }

            let element2 = document.getElementById('betkoinn');
            element2.value = chec + "枚";
            alert(chec + "枚ベットしました");
            //postCoin(2000);
            //console.log(-chec);
        }
