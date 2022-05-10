function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
var Anum = new Array(2); //回答
var Qnum = new Array(8); //格納される値
var hide = new Array(2); //＊表示箇所
var a = new Array(8); //B or W
function init() {
  document.getElementById("number").innerHTML = "";
  for (var i = 0; i < 12; i++) {
    var number = document.createElement("span");
    number.innerText = i;
    number.className = "white";
    number.draggable = true;
    number.ondragstart = dragNumber;
    document.getElementById("number").appendChild(number);
  }
  var ran = []; //重複確認用
  //*表示箇所決定
  for (i = 0; i < 2; i++) {
    //重複確認
    while (true) {
      var c = getRandomInt(0, 3); //0-3の乱数
      if (!ran.includes(c)) {
        ran.push(c);
        hide[i] = c;
        break;
      }
    }
  }
  var Bnum = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]; //黒数
  var Wnum = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]; //白数字
  var rand1 = [];
  var rand2 = [];
  //Qnumの配列(8個)にBnum or　Wnumを格納
  for (var i = 0; i < 8; i++) {
    //乱数 (0 or 1)
    a[i] = getRandomInt(0, 100);
    //Black(0だった場合)
    if (a[i] % 2 == 0) {
      //乱数生成
      while (true) {
        var b = getRandomInt(0, 11); //0-11の乱数
        //重複確認
        if (!rand1.includes(b)) {
          //rand1にbを格納
          rand1.push(b);
          //QnumにBnumを格納
          Qnum[i] = Bnum[b];
          break;
        }
      }
    }
    //White(1だった場合)
    else if (a[i] % 2 == 1) {
      while (true) {
        var w = getRandomInt(0, 11); //0-11の乱数
        //重複確認
        if (!rand2.includes(w)) {
          //rand2にwを格納
          rand2.push(w);
          //QnumにWnumを格納
          Qnum[i] = Wnum[w];
          break;
        }
      }
    }
  }
  var tmp1; //Qnum一時保管
  var tmp2; //a(B or W)一時保管
  //ソート(0-3)
  for (i = 0; i < 4; i++) {
    for (j = 0; j < 4; j++) {
      //数字
      if (Qnum[i] > Qnum[j]) {
        tmp1 = Qnum[i];
        Qnum[i] = Qnum[j];
        Qnum[j] = tmp1;
        tmp2 = a[i];
        a[i] = a[j];
        a[j] = tmp2;
      }
      //B or W
      if (Qnum[i] == Qnum[j]) {
        if (a[i] % 2 == 1 && a[j] % 2 == 0) {
          tmp1 = Qnum[i];
          Qnum[i] = Qnum[j];
          Qnum[j] = tmp1;
          tmp2 = a[i];
          a[i] = a[j];
          a[j] = tmp2;
        }
      }
    }
  }
  //ソート（4-7)
  for (i = 4; i < 8; i++) {
    for (j = 4; j < 8; j++) {
      //数字
      if (Qnum[i] < Qnum[j]) {
        tmp1 = Qnum[i];
        Qnum[i] = Qnum[j];
        Qnum[j] = tmp1;
        tmp2 = a[i];
        a[i] = a[j];
        a[j] = tmp2;
      }
      //B or W
      if (Qnum[i] == Qnum[j]) {
        if (a[i] % 2 == 0 && a[j] % 2 == 1) {
          tmp1 = Qnum[i];
          Qnum[i] = Qnum[j];
          Qnum[j] = tmp1;
          tmp2 = a[i];
          a[i] = a[j];
          a[j] = tmp2;
        }
      }
    }
  }
  for (i = 0; i < 4; i++) {
    //question0-3 id取得
    document.getElementById("question" + i).innerHTML = "";
    //question0
    if (i == 0) {
      var question0 = document.createElement("span");
      //*表示箇所確認
      if (hide[0] == i || hide[1] == i) {
        question0.innerText = "*";
        //B or W
        if (a[i] % 2 == 0) {
          question0.style.backgroundColor = "black";
          question0.style.color = "white";
        }
        else if (a[i] % 2 == 1) {
          question0.style.backgroundColor = "white";
        }
        question0.ondragover = dragOverNumber;
        question0.ondrop = dropNumber;
      }
      //数字表示
      else {
        question0.innerText = Qnum[i]; //数字
        //B or W
        if (a[i] % 2 == 0) {
          question0.style.backgroundColor = "black";
          question0.style.color = "white";
        }
        else if (a[i] % 2 == 1) {
          question0.style.backgroundColor = "white";
        }
      }
      document.getElementById("question0").appendChild(question0);
    }
    else if (i == 1) {
      var question1 = document.createElement("span");
      if (hide[0] == i || hide[1] == i) {
        question1.innerText = "*";
        if (a[i] % 2 == 0) {
          question1.style.backgroundColor = "black";
          question1.style.color = "white";
        }
        else if (a[i] % 2 == 1) {
          question1.style.backgroundColor = "white";
        }
        question1.ondragover = dragOverNumber;
        question1.ondrop = dropNumber;
      }
      else {
        question1.innerText = Qnum[i];
        if (a[i] % 2 == 0) {
          question1.style.backgroundColor = "black";
          question1.style.color = "white";
        }
        else if (a[i] % 2 == 1) {
          question1.style.backgroundColor = "white";
        }
      }
      document.getElementById("question1").appendChild(question1);
    }
    else if (i == 2) {
      var question2 = document.createElement("span");
      if (hide[0] == i || hide[1] == i) {
        question2.innerText = "*";
        if (a[i] % 2 == 0) {
          question2.style.backgroundColor = "black";
          question2.style.color = "white";
        }
        else if (a[i] % 2 == 1) {
          question2.style.backgroundColor = "white";
        }
        question2.ondragover = dragOverNumber;
        question2.ondrop = dropNumber;
      }
      else {
        question2.innerText = Qnum[i];
        if (a[i] % 2 == 0) {
          question2.style.backgroundColor = "black";
          question2.style.color = "white";
        }
        else if (a[i] % 2 == 1) {
          question2.style.backgroundColor = "white";
        }
      }
      document.getElementById("question2").appendChild(question2);
    }
    else {
      var question3 = document.createElement("span");
      if (hide[0] == i || hide[1] == i) {
        question3.innerText = "*";
        if (a[i] % 2 == 0) {
          question3.style.backgroundColor = "black";
          question3.style.color = "white";
        }
        else if (a[i] % 2 == 1) {
          question3.style.backgroundColor = "white";
        }
        question3.ondragover = dragOverNumber;
        question3.ondrop = dropNumber;
      }
      else {
        question3.innerText = Qnum[i];
        if (a[i] % 2 == 0) {
          question3.style.backgroundColor = "black";
          question3.style.color = "white";
        }
        else if (a[i] % 2 == 1) {
          question3.style.backgroundColor = "white";
        }
      }
      document.getElementById("question3").appendChild(question3);
    }
  }

  for (i = 4; i < 8; i++) {
    //question4-7 id取得
    document.getElementById("question" + i).innerHTML = "";
    if (i == 4) {
      var question4 = document.createElement("span");
      question4.innerText = Qnum[i];
      if (a[i] % 2 == 0) {
        question4.style.backgroundColor = "black";
        question4.style.color = "white";
      }
      else if (a[i] % 2 == 1) {
        question4.style.backgroundColor = "white";
      }
      document.getElementById("question4").appendChild(question4);
    }
    else if (i == 5) {
      var question5 = document.createElement("span");
      question5.innerText = Qnum[i];
      if (a[i] % 2 == 0) {
        question5.style.backgroundColor = "black";
        question5.style.color = "white";
      }
      else if (a[i] % 2 == 1) {
        question5.style.backgroundColor = "white";
      }
      document.getElementById("question5").appendChild(question5);
    }
    else if (i == 6) {
      var question6 = document.createElement("span");
      question6.innerText = Qnum[i];
      if (a[i] % 2 == 0) {
        question6.style.backgroundColor = "black";
        question6.style.color = "white";
      }
      else if (a[i] % 2 == 1) {
        question6.style.backgroundColor = "white";
      }
      document.getElementById("question6").appendChild(question6);
    }
    else if (i == 7) {
      var question7 = document.createElement("span");
      question7.innerText = Qnum[i];
      if (a[i] % 2 == 0) {
        question7.style.backgroundColor = "black";
        question7.style.color = "white";
      }
      else if (a[i] % 2 == 1) {
        question7.style.backgroundColor = "white";
      }
      document.getElementById("question7").appendChild(question7);
    }
  }
}



function dragNumber(event) {
  event.dataTransfer.setData("text", event.target.innerText);
}

function dropNumber(event) {
  var number = event.dataTransfer.getData("text");
  event.target.innerText = number;
  event.target.className = "";
}

function dragOverNumber(event) {
  event.preventDefault();
}

function check() {
  var correct = []; //解答確認
  //hide1,2 question0-3 一致確認
  for (i = 0; i < 2; i++) {
    if (hide[i] == 0) {
      //question0内を数値変換
      Anum[i] = Number(document.getElementById("question0").innerText);
    }
    else if (hide[i] == 1) {
      Anum[i] = Number(document.getElementById("question1").innerText);
    }
    else if (hide[i] == 2) {
      Anum[i] = Number(document.getElementById("question2").innerText);
    }
    else if (hide[i] == 3) {
      Anum[i] = Number(document.getElementById("question3").innerText);
    }
    // 回答と格納値を比較
    if (Anum[i] == Qnum[hide[i]]) {
      correct[i] = 1;
    }
  }
  //出力
  if (correct[0] == 1 && correct[1] == 1) {
    alert("OKOK");
  }
  else if (correct[0] == 1) {
    alert("OK");
  }
  else if (correct[1] == 1) {
    alert("OK");
  }
}