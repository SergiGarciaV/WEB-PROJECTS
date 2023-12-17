



function groc(element) {
    element.style.color = '#CFCB29';
}
function blanc(element) {
    element.style.color = 'white'
}


///////////////////////////////////// I N D E X //////////////////////////////////////////////////





///////////////////////////////////// C O N T A C T O  ///////////////////////////////////////////



function parpadear() {
    var garResp = document.getElementById('garResp');
    var amarillo = true;

    setInterval(function () {
        if (amarillo) {
            garResp.style.color = '#CFCB29';
        } else {
            garResp.style.color = 'white';
        }
        amarillo = !amarillo;
    }, 550);
}

document.addEventListener('DOMContentLoaded', function () {
    parpadear();
});

//fin codigo texto parpadeo


//////////////////////// MULTI-HTML //////////////////

function wordFlick(selector, words, initialWord = '') {
    var part,
        i = 0,
        offset = 0,
        len = words.length,
        forwards = true,
        skip_count = 0,
        skip_delay = 15,
        speed = 70;


    document.querySelector(selector).textContent = initialWord;

    setInterval(function () {
        if (forwards) {
            if (offset >= words[i].length) {
                ++skip_count;
                if (skip_count == skip_delay) {
                    forwards = false;
                    skip_count = 0;
                }
            }
        } else {
            if (offset == 0) {
                forwards = true;
                i++;
                offset = 0;
                if (i >= len) {
                    i = 0;
                }
            }
        }
        part = words[i].substr(0, offset);
        if (skip_count == 0) {
            if (forwards) {
                offset++;
            } else {
                offset--;
            }
        }
        document.querySelector(selector).textContent = part;
    }, speed);
}

document.addEventListener('DOMContentLoaded', function () {
    wordFlick('.word', ['No lo dudes', 'Contacta con nosotros', 'Sin compromiso!'], 'Palabra Inicial');
    wordFlick('.word2', ['Otra palabra', 'Más palabras'], 'Somos Expertos en ');
});





/////////////////T E A M ///////////////////


var TxtRotate = function (el, toRotate, period) {
    this.toRotate = toRotate;
    this.el = el;
    this.loopNum = 0;
    this.period = parseInt(period, 10) || 2000;
    this.txt = '';
    this.tick();
    this.isDeleting = false;
};

TxtRotate.prototype.tick = function () {
    var i = this.loopNum % this.toRotate.length;
    var fullTxt = this.toRotate[i];

    if (this.isDeleting) {
        this.txt = fullTxt.substring(0, this.txt.length - 1);
    } else {
        this.txt = fullTxt.substring(0, this.txt.length + 1);
    }

    this.el.innerHTML = '<span class="wrap">' + this.txt + '</span>';

    var that = this;
    var delta = 300 - Math.random() * 100;

    if (this.isDeleting) { delta /= 2; }

    if (!this.isDeleting && this.txt === fullTxt) {
        delta = this.period;
        this.isDeleting = true;
    } else if (this.isDeleting && this.txt === '') {
        this.isDeleting = false;
        this.loopNum++;
        delta = 500;
    }

    setTimeout(function () {
        that.tick();
    }, delta);
};

window.onload = function () {
    var elements = document.getElementsByClassName('txt-rotate');
    for (var i = 0; i < elements.length; i++) {
        var toRotate = elements[i].getAttribute('data-rotate');
        var period = elements[i].getAttribute('data-period');
        if (toRotate) {
            new TxtRotate(elements[i], JSON.parse(toRotate), period);
        }
    }
    // INJECT CSS
    var css = document.createElement("style");
    css.type = "text/css";
    css.innerHTML = ".txt-rotate > .wrap { border-right: 0.08em solid #666 }";
    document.body.appendChild(css);
};