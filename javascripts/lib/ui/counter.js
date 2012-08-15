// Generated by CoffeeScript 1.3.3

ce.module("ui", function(self, ce, Backbone, Marionette, $, _) {
  self.Counter = function(d, options) {
    /*
        Sets the value of the counter and animates the digits to new value.
        
        Example: myCounter.setValue(500); would set the value of the counter to 500,
        no matter what value it was previously.
        
        @param {int} n
        New counter value
    */

    /*
        Sets the increment for the counter. Does NOT animate digits.
    */

    /*
        Sets the pace of the counter. Only affects counter when auto == true.
        
        @param {int} n
        New pace for counter in milliseconds
    */

    /*
        Sets counter to auto-incrememnt (true) or not (false).
        
        @param {bool} a
        Should counter auto-increment, true or false
    */

    /*
        Increments counter by one animation based on set 'inc' value.
    */

    /*
        Adds a number to the counter value, not affecting the 'inc' or 'pace' of the counter.
        
        @param {int} n
        Number to add to counter value
    */

    /*
        Subtracts a number from the counter value, not affecting the 'inc' or 'pace' of the counter.
        
        @param {int} n
        Number to subtract from counter value
    */

    /*
        Increments counter to given value, animating by current pace and increment.
        
        @param {int} n
        Number to increment to
        @param {int} t (optional)
        Time duration in seconds - makes increment a 'smart' increment
        @param {int} p (optional)
        Desired pace for counter if 'smart' increment
    */

    /*
        Gets current value of counter.
    */

    /*
        Stops all running increments.
    */

    var addDigit, animateDigit, best, checkSmartValues, clearNext, defaults, digitCheck, digitsNew, digitsOld, div, divId, doCount, doIncrement, doc, initialDigitCheck, isNumber, newComma, newDigit, nextCount, o, opt, removeDigit, splitToArray, subEnd, subStart, x, y;
    doCount = function() {
      var nextCount, x, y;
      x = o.value;
      o.value += o.inc;
      y = o.value;
      digitCheck(x, y);
      if (o.auto === true) {
        return nextCount = setTimeout(doCount, o.pace);
      }
    };
    doIncrement = function(n, s, c) {
      var cycles, nextCount, smart, val, x, y;
      val = o.value;
      smart = (typeof s === "undefined" ? false : s);
      cycles = (typeof c === "undefined" ? 1 : c);
      if (smart === true) {
        cycles--;
      }
      if (val !== n) {
        x = o.value;
        o.auto = true;
        if (val + o.inc <= n && cycles !== 0) {
          val += o.inc;
        } else {
          val = n;
        }
        o.value = val;
        y = o.value;
        digitCheck(x, y);
        return nextCount = setTimeout(function() {
          return doIncrement(n, smart, cycles);
        }, o.pace);
      } else {
        return o.auto = false;
      }
    };
    digitCheck = function(x, y) {
      var diff, digitsNew, digitsOld, i, xlen, ylen, _results;
      digitsOld = splitToArray(x);
      digitsNew = splitToArray(y);
      diff = void 0;
      xlen = digitsOld.length;
      ylen = digitsNew.length;
      if (ylen > xlen) {
        diff = ylen - xlen;
        while (diff > 0) {
          addDigit(ylen - diff + 1, digitsNew[ylen - diff]);
          diff--;
        }
      }
      if (ylen < xlen) {
        diff = xlen - ylen;
        while (diff > 0) {
          removeDigit(xlen - diff);
          diff--;
        }
      }
      i = 0;
      _results = [];
      while (i < xlen) {
        if (digitsNew[i] !== digitsOld[i]) {
          animateDigit(i, digitsOld[i], digitsNew[i]);
        }
        _results.push(i++);
      }
      return _results;
    };
    animateDigit = function(n, oldDigit, newDigit) {
      var a, animate, bp, speed, step, w;
      animate = function() {
        var a, w;
        if (step < 7) {
          w = (step < 3 ? "t" : "b");
          a = doc.getElementById(divId + "_" + w + "_d" + n);
          if (a) {
            a.style.backgroundPosition = bp[step];
          }
          step++;
          if (step !== 3) {
            return setTimeout(animate, speed);
          } else {
            return animate();
          }
        }
      };
      speed = void 0;
      step = 0;
      w = void 0;
      a = void 0;
      bp = ["-" + o.fW + "px -" + (oldDigit * o.tFH) + "px", (o.fW * -2) + "px -" + (oldDigit * o.tFH) + "px", "0 -" + (newDigit * o.tFH) + "px", "-" + o.fW + "px -" + (oldDigit * o.bFH + o.bOffset) + "px", (o.fW * -2) + "px -" + (newDigit * o.bFH + o.bOffset) + "px", (o.fW * -3) + "px -" + (newDigit * o.bFH + o.bOffset) + "px", "0 -" + (newDigit * o.bFH + o.bOffset) + "px"];
      if (o.auto === true && o.pace <= 300) {
        switch (n) {
          case 0:
            speed = o.pace / 6;
            break;
          case 1:
            speed = o.pace / 5;
            break;
          case 2:
            speed = o.pace / 4;
            break;
          case 3:
            speed = o.pace / 3;
            break;
          default:
            speed = o.pace / 1.5;
        }
      } else {
        speed = 80;
      }
      speed = (speed > 80 ? 80 : speed);
      return animate();
    };
    splitToArray = function(input) {
      return input.toString().split("").reverse();
    };
    addDigit = function(len, digit) {
      var li, newComma, newDigit;
      li = Number(len) - 1;
      newDigit = doc.createElement("ul");
      newDigit.className = "cd";
      newDigit.id = divId + "_d" + li;
      newDigit.innerHTML = "<li class=\"t\" id=\"" + divId + "_t_d" + li + "\"></li><li class=\"b\" id=\"" + divId + "_b_d" + li + "\"></li>";
      if (li % 3 === 0) {
        newComma = doc.createElement("ul");
        newComma.className = "cd";
        newComma.innerHTML = "<li class=\"s\"></li>";
        div.insertBefore(newComma, div.firstChild);
      }
      div.insertBefore(newDigit, div.firstChild);
      doc.getElementById(divId + "_t_d" + li).style.backgroundPosition = "0 -" + (digit * o.tFH) + "px";
      return doc.getElementById(divId + "_b_d" + li).style.backgroundPosition = "0 -" + (digit * o.bFH + o.bOffset) + "px";
    };
    removeDigit = function(id) {
      var first, remove;
      remove = doc.getElementById(divId + "_d" + id);
      div.removeChild(remove);
      first = div.firstChild.firstChild;
      if ((" " + first.className + " ").indexOf(" s ") > -1) {
        remove = first.parentNode;
        return div.removeChild(remove);
      }
    };
    initialDigitCheck = function(init) {
      var bit, count, digits, i, initial, newComma, newDigit, nextCount;
      initial = init.toString();
      count = initial.length;
      bit = 1;
      i = void 0;
      i = 0;
      while (i < count) {
        newDigit = doc.createElement("ul");
        newDigit.className = "cd";
        newDigit.id = divId + "_d" + i;
        newDigit.innerHTML = newDigit.innerHTML = "<li class=\"t\" id=\"" + divId + "_t_d" + i + "\"></li><li class=\"b\" id=\"" + divId + "_b_d" + i + "\"></li>";
        div.insertBefore(newDigit, div.firstChild);
        if (bit !== count && bit % 3 === 0) {
          newComma = doc.createElement("ul");
          newComma.className = "cd";
          newComma.innerHTML = "<li class=\"s\"></li>";
          div.insertBefore(newComma, div.firstChild);
        }
        bit++;
        i++;
      }
      digits = splitToArray(initial);
      i = 0;
      while (i < count) {
        doc.getElementById(divId + "_t_d" + i).style.backgroundPosition = "0 -" + (digits[i] * o.tFH) + "px";
        doc.getElementById(divId + "_b_d" + i).style.backgroundPosition = "0 -" + (digits[i] * o.bFH + o.bOffset) + "px";
        i++;
      }
      if (o.auto === true) {
        return nextCount = setTimeout(doCount, o.pace);
      }
    };
    checkSmartValues = function(diff, cycles, inc, pace, time) {
      var i, q, r;
      r = {
        result: true
      };
      q = void 0;
      r.cond1 = (diff / cycles >= 1 ? true : false);
      r.cond2 = (cycles * inc <= diff ? true : false);
      r.cond3 = (Math.abs(cycles * inc - diff) <= 10 ? true : false);
      r.cond4 = (Math.abs(cycles * pace - time) <= 100 ? true : false);
      r.cond5 = (cycles * pace <= time ? true : false);
      if (r.cond1 && r.cond2 && r.cond4 && r.cond5) {
        q = Math.abs(diff - (cycles * inc)) + Math.abs(cycles * pace - time);
        if (best.q === null) {
          best.q = q;
        }
        if (q <= best.q) {
          best.pace = pace;
          best.inc = inc;
        }
      }
      i = 1;
      while (i <= 5) {
        if (r["cond" + i] === false) {
          r.result = false;
        }
        i++;
      }
      return r;
    };
    isNumber = function(n) {
      return !isNaN(parseFloat(n)) && isFinite(n);
    };
    clearNext = function() {
      var nextCount;
      clearTimeout(nextCount);
      return nextCount = null;
    };
    defaults = {
      value: 0,
      inc: 1,
      pace: 1000,
      auto: true,
      tFH: 39,
      bFH: 64,
      fW: 53,
      bOffset: 390
    };
    o = options || {};
    doc = window.document;
    divId = (typeof d !== "undefined" && d !== "" ? d : "flip-counter");
    div = doc.getElementById(divId);
    for (opt in defaults) {
      o[opt] = (opt in o ? o[opt] : defaults[opt]);
    }
    digitsOld = [];
    digitsNew = [];
    subStart = void 0;
    subEnd = void 0;
    x = void 0;
    y = void 0;
    nextCount = null;
    newDigit = void 0;
    newComma = void 0;
    best = {
      q: null,
      pace: 0,
      inc: 0
    };
    this.setValue = function(n) {
      if (isNumber(n)) {
        x = o.value;
        y = n;
        o.value = n;
        digitCheck(x, y);
      }
      return this;
    };
    this.setIncrement = function(n) {
      o.inc = (isNumber(n) ? n : defaults.inc);
      return this;
    };
    this.setPace = function(n) {
      o.pace = (isNumber(n) ? n : defaults.pace);
      return this;
    };
    this.setAuto = function(a) {
      if (a && !o.atuo) {
        o.auto = true;
        doCount();
      }
      if (!a && o.auto) {
        if (nextCount) {
          clearNext();
        }
        o.auto = false;
      }
      return this;
    };
    this.step = function() {
      if (!o.auto) {
        doCount();
      }
      return this;
    };
    this.add = function(n) {
      if (isNumber(n)) {
        x = o.value;
        o.value += n;
        y = o.value;
        digitCheck(x, y);
      }
      return this;
    };
    this.subtract = function(n) {
      if (isNumber(n)) {
        x = o.value;
        o.value -= n;
        if (o.value >= 0) {
          y = o.value;
        } else {
          y = "0";
          o.value = 0;
        }
        digitCheck(x, y);
      }
      return this;
    };
    this.incrementTo = function(n, t, p) {
      var check, cycles, diff, i, inc, pace, time;
      if (nextCount) {
        clearNext();
      }
      if (typeof t !== "undefined") {
        time = (isNumber(t) ? t * 1000 : 10000);
        pace = (typeof p !== "undefined" && isNumber(p) ? p : o.pace);
        diff = (typeof n !== "undefined" && isNumber(n) ? n - o.value : 0);
        cycles = void 0;
        inc = void 0;
        check = void 0;
        i = 0;
        best.q = null;
        pace = (time / diff > pace ? Math.round((time / diff) / 10) * 10 : pace);
        cycles = Math.floor(time / pace);
        inc = Math.floor(diff / cycles);
        check = checkSmartValues(diff, cycles, inc, pace, time);
        if (diff > 0) {
          while (check.result === false && i < 100) {
            pace += 10;
            cycles = Math.floor(time / pace);
            inc = Math.floor(diff / cycles);
            check = checkSmartValues(diff, cycles, inc, pace, time);
            i++;
          }
          if (i === 100) {
            o.inc = best.inc;
            o.pace = best.pace;
          } else {
            o.inc = inc;
            o.pace = pace;
          }
          return doIncrement(n, true, cycles);
        }
      } else {
        return doIncrement(n);
      }
    };
    this.getValue = function() {
      return o.value;
    };
    this.stop = function() {
      if (nextCount) {
        clearNext();
      }
      return this;
    };
    return initialDigitCheck(o.value);
  };
});