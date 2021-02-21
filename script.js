window.addEventListener('load', () => {
   var blocks = document.querySelectorAll('.block');
   var clearCounters = document.querySelector('.clear-counter');
   var setCounter = document.querySelector('.set-counter');
   var colorMain = "rgb(255, 0, 0)";

   for (var i = 0; i < blocks.length; i++) {
      var block = blocks[i];
      var counter = block.querySelector('.counter');
      var button = block.querySelector('.button');

      button.dataset.id = 'block' + i;
      counter.innerHTML = localStorage[button.dataset.id] ? JSON.parse(localStorage[button.dataset.id]).counter : 0;
      block.style.backgroundColor = localStorage[button.dataset.id] ? JSON.parse(localStorage[button.dataset.id]).color : "rgb(256, 256, 256)";

      button.addEventListener('click', onClick)
      clearCounters.addEventListener('click', clearAll);
      setCounter.addEventListener('click', setCount);
   }

   function onClick() {
      if (!localStorage[this.dataset.id] || JSON.parse(localStorage[this.dataset.id]).counter < 49) {
         var counter = localStorage[this.dataset.id] ? JSON.parse(localStorage[this.dataset.id]).counter : 0;
         this.parentElement.style.backgroundColor = "rgb(" + randColor() + ", " + randColor() + ", " + randColor() + ")";
         this.nextElementSibling.innerHTML = ++counter;
         let value = {
            counter: counter,
            color: this.parentElement.style.backgroundColor,
         }
         localStorage[this.dataset.id] = JSON.stringify(value);
      } else {
         counter = JSON.parse(localStorage[this.dataset.id]).counter;
         this.nextElementSibling.innerHTML = ++counter;
         this.parentElement.style.backgroundColor = colorMain;
         let value = {
            counter: counter,
            color: this.parentElement.style.backgroundColor,
         }
         localStorage[this.dataset.id] = JSON.stringify(value);
      }
   }

   function randColor() {
      return Math.floor(Math.random() * 256);
   }

   function clearAll() {
      localStorage.clear();
      window.location.reload();
   }

   function setCount() {
      let blockId = window.prompt('id', '');
      let number = window.prompt('number', '');

      let value = {
         counter: number,
      };
      localStorage['block' + blockId] = JSON.stringify(value);
      window.location.reload();
   }
})
