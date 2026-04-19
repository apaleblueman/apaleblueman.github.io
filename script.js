
function glitch(options) {
  const defaultSettings = {
    chars: '!<>-_\\/[]{}вЂ”=+*^?#________',
    charTime: 10,
    finalText: undefined,
    done: function () {
      console.log('done!');
    }
  };
  const settings = Object.assign({}, defaultSettings, options);

  function setCharAt(str, index, chr) {
    if (index > str.length - 1) return str;
    return str.substr(0, index) + chr + str.substr(index + 1);
  }

  function randomChar(chars) {
    return chars[Math.floor(Math.random() * chars.length)];
  }

  function animateChar(element, originalText, index) {
    return new Promise((resolve) => {
      const timeDiff = Math.floor(Math.random() * 40) + 10;
      let animateAmount = Math.floor(Math.random() * 2) + settings.charTime;

      const intervalSignit = setInterval(() => {
        if (animateAmount === 0) {
          clearInterval(intervalSignit);
          element.textContent = setCharAt(element.textContent, index, originalText.charAt(index));
          resolve();
        } else {
          element.textContent = setCharAt(element.textContent, index, randomChar(settings.chars));
          animateAmount--;
        }
      }, timeDiff);
    });
  }

  function TextScramble(element, chars) {
    this.chars = chars || settings.chars;
    this.element = element;
    this.originalText = settings.finalText || element.textContent;
    this.scrambledText = this.initializeScramble();
  }

  TextScramble.prototype.initializeScramble = function () {
    let scrambleSet = [];
    for (let i = 0; i < this.originalText.length; i++) {
      scrambleSet.push(randomChar(this.chars));
    }
    return scrambleSet;
  };

  TextScramble.prototype.animate = function () {
    const promiseChain = this.originalText.split('').map((_, index) => animateChar(this.element, this.originalText, index));
    return Promise.all(promiseChain);
  };

  TextScramble.prototype.getScrambledText = function () {
    return this.scrambledText.join('');
  };

  const elements = document.querySelectorAll('[data-glitch]');
  elements.forEach((element) => {
    const effect = new TextScramble(element);
    element.textContent = effect.getScrambledText();
    effect.animate().then(() => {
      settings.done(element);
    });
  });
}

// Glitch initialization on click
const elements = document.querySelectorAll('[data-glitch]');
elements.forEach((element) => {
  element.addEventListener('click', function() {
    glitch({
      chars: '!@#$%^&*()_+<>?:"{}|[];', // Customize the characters used for glitching
      charTime: 20, // Customize the duration of each character's glitch animation
      done: function (element) {
        console.log('Glitch animation done for element:', element);
      },
    });
  });
});

// Usage
glitch({
  chars: '!@#☭%^&*()☭_+:"{☭}|[];', // Customize the characters used for glitching
  charTime: 20, // Customize the duration of each character's glitch animation
  done: function (element) {
    console.log('Glitch animation done for element:', element);
  },
});