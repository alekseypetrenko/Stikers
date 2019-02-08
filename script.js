let draggedElement,
    elDragStart,
    elDragging,
    elDragEnd,
    getPointY,
    getPointX,
    createSticker,
    addSticker;
  
  // То что вчера обсуждали. 
  // Старт  - клик мыши по элементу и получение его координат.
  elStartsDrag = function (ev) {
    let elementPosition;
    if (ev.target.className !== "bar") {
      return;
    }
    draggedElement = this;
    
    elementPosition = draggedElement.getBoundingClientRect();
    
    getPointY = elementPosition.top - ev.clientY;
    getPointX = elementPosition.left - ev.clientX;
  };
  

  // Отслеживаем перемещение стикера
  elDragging = function (ev) {
    if (!draggedElement) {
      return;
    }
    
    let posX = ev.clientX + getPointX,
        posY = ev.clientY + getPointY;
    
    // Проверка, что бы не выходил за рамки экрана
    if (posX < 0) {
      posX = 0;
    }
    
    if (posY < 0) {
      posY = 0;
    }
    
    console.log(posX);
    console.log(posY);

    draggedElement.style.transform = "translateX(" + posX + "px) translateY(" + posY + "px)";
  };
  
   // Конец передвижения стикера
  elDragEnd = function () { 
    draggedElement = null;
    posY = null;
    posX = null;
  };
  
  // Создаем новый стикер
  createSticker = function () {
    let elSticker = document.createElement('div'),
        elBar = document.createElement('div'),
        elTextarea = document.createElement('textarea');
    
    var randomDisplaySticker = "translateX(" + Math.random() * 350 + "px) translateY(" + Math.random() * 200 + "px)";
    
    elSticker.style.transform = randomDisplaySticker; 
    
    elBar.classList.add('bar');
    elSticker.classList.add('sticker');
    
    elSticker.appendChild(elBar);
    elSticker.appendChild(elTextarea);
    
    elSticker.addEventListener('mousedown', elStartsDrag);
    
    document.body.appendChild(elSticker);
  };
  
  createSticker(); 
  
  addSticker = document.querySelector('.addSticker');
  addSticker.addEventListener('click', createSticker);
  document.addEventListener('mousemove', elDragging);
  document.addEventListener('mouseup', elDragEnd);