// panel-manager
let panelState = "";

function showPanel(panelId) {
  document.querySelectorAll('.panel').forEach(panel => {
    panel.dataset.active = "false";
  });

  const targetPanel = document.querySelector(`.panel[data-panel="${panelId}"]`);
  if (targetPanel) {
    targetPanel.dataset.active = "true";
  }
  panelState = targetPanel.getAttribute('data-panel');
}

// Event listeners
document.querySelectorAll('[data-target]').forEach(button => {
  button.addEventListener('click', () => {
    showPanel(button.dataset.target);
  });
});

// Show initial panel
showPanel('main');

// Send request

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  generateThumbnail();

  Analytics
  gtag('event', 'generate_thumbnail', {
    'ratio': ratio.value,
    'theme': theme.value,
    'style': style.value
  });
});

regenerateButton.addEventListener("click", async (e) => {
  generateThumbnail();
});

// Describe image

theme.onchange = ()=>{
  document.getElementById('help-describe-image').style.display = "block";
}

document.getElementById('help-describe-image').onclick = ()=>{
  describeImage();
  
  // Analytics
  gtag('event', 'describe_image', {
    'description': imageDescriptionInput.value
  });
}

//------------------------ Designer section ------------------------


function deselect(){
  outputTitle.setAttribute("contenteditable", "false");
  outputTitle.blur();
  outputSubtitle.setAttribute("contenteditable", "false");
  outputSubtitle.blur();
  showPanel('designer');
}

outputTitle.addEventListener("click", function () {
  showPanel('title-edit');
  this.setAttribute("contenteditable", "true");
  this.focus();
})

outputSubtitle.addEventListener("click", function () {
  showPanel('subtitle-edit');
  this.setAttribute("contenteditable", "true");
  this.focus();  
})

outputTitle.addEventListener("blur", function () {
  this.setAttribute("contenteditable", "false");
})

outputSubtitle.addEventListener("blur", function () {
  this.setAttribute("contenteditable", "false");
})

titleEditDone.addEventListener("click", function () {
  deselect();
})

subtitleEditDone.addEventListener("click", function () {
  deselect();
})

stickerEditDone.addEventListener("click", function () {
  showPanel('designer');
})

colorOverlay.addEventListener("click", function () {
  showPanel('designer');
})

backToMain.addEventListener("click", function () {
  showPanel('main');
})

function changeFont(targetLayer, fontSelector) {
  switch (fontSelector) {
    case "Poppins":
      targetLayer.style.fontFamily = font.Poppins;
      break;
    case "Lora":
      targetLayer.style.fontFamily = font.Lora;
      break;
    case "Spectral":
      targetLayer.style.fontFamily = font.Spectral;
      break;
    case "Raleway":
      targetLayer.style.fontFamily = font.Raleway;
      break;
    case "Montserrat":
      targetLayer.style.fontFamily = font.Montserrat;
      break;
    case "Playfair Display":
      targetLayer.style.fontFamily = font.PlayfairDisplay;
      break;
    case "Ubuntu":
      targetLayer.style.fontFamily = font.Ubuntu;
      break;
    case "Open Sans":
      targetLayer.style.fontFamily = font.OpenSans;
      break;
    case "Merriweather":
      targetLayer.style.fontFamily = font.Merriweather;
      break;
    case "Roboto":
      targetLayer.style.fontFamily = font.Roboto;
      break;
    default:
      targetLayer.style.fontFamily = font.Poppins;
      break;
  }
}

// Update title font

titleFontSelector.addEventListener("change", function () {
  changeFont(outputTitle, titleFontSelector.value);
});

// Update subtitle font

subtitleFontSelector.addEventListener("change", function () {
  changeFont(outputSubtitle, subtitleFontSelector.value);
});

// Update title styles

document.getElementById("turn-bold-title").onchange = () => {
  outputTitle.classList.toggle("bold");
};

document.getElementById("turn-italic-title").onchange = () => {
  outputTitle.classList.toggle("italic");
};

document.getElementById("turn-uppercase-title").onchange = () => {
  outputTitle.classList.toggle("uppercase");
};

// Update subtitle styles

document.getElementById("turn-bold-subtitle").onchange = () => {
  outputSubtitle.classList.toggle("bold");
};

document.getElementById("turn-italic-subtitle").onchange = () => {
  outputSubtitle.classList.toggle("italic");
};

document.getElementById("turn-uppercase-subtitle").onchange = () => {
  outputSubtitle.classList.toggle("uppercase");
};

colorOverlaySelector.onchange = () => {
  colorOverlay.style.backgroundColor = colorOverlaySelector.value;
};

// Color opacity slider
const colorOverlayOpacitySlider = document.getElementById("opacitySlider");
const colorOverlayOpacityValue = document.getElementById("opacityValue");

colorOverlayOpacitySlider.addEventListener("input", function () {
  const value = this.value;
  const opacity = value / 100;

  colorOverlay.style.opacity = opacity;
  colorOverlayOpacityValue.textContent = value + "%";
});

// Add background title

addBackgroundTitle.onchange = () => {
  if (addBackgroundTitle.checked) {
    outputTitle.style.backgroundColor = titleBackgroundSelector.value;
    titleBackgroundSelector.style.display = "block";
  } else {
    outputTitle.style.backgroundColor = "transparent";
    titleBackgroundSelector.style.display = "none";
  }
};

// Skew title

titleSkewSlider.addEventListener("input", function () {
  const value = this.value;
  outputTitle.style.transform = `skewX(${value}deg)`;
  titleSkewValue.textContent = value;
});

// Skew subtitle

subtitleSkewSlider.addEventListener("input", function () {
  const value = this.value;
  outputSubtitle.style.transform = `skewX(${value}deg)`;
  subtitleSkewValue.textContent = value;
});

// Background color selector

titleBackgroundSelector.onchange = () => {
  outputTitle.style.backgroundColor = titleBackgroundSelector.value;
};

// Layout selector

document.querySelectorAll(".grid-cell").forEach((cell) => {
  cell.innerHTML = '<div class="dot"></div>';
});

const cells = document.querySelectorAll(".grid-cell");
const selectedLayout = document.querySelector(".selected-layout");

cells.forEach((cell, index) => {
  cell.addEventListener("click", () => {
    cells.forEach((c) => c.classList.remove("active"));

    cell.classList.add("active");

    const alignValue = cell.getAttribute("data-align");
    switch (alignValue) {
      case "1":
        output.style.alignItems = "start";
        output.style.textAlign = "left";
        break;
      case "2":
        output.style.alignItems = "start";
        output.style.textAlign = "center";
        break;
      case "3":
        output.style.alignItems = "start";
        output.style.textAlign = "right";
        break;
      case "4":
        output.style.alignItems = "center";
        output.style.textAlign = "left";
        break;
      case "5":
        output.style.alignItems = "center";
        output.style.textAlign = "center";
        break;
      case "6":
        output.style.alignItems = "center";
        output.style.textAlign = "right";
        break;
      case "7":
        output.style.alignItems = "end";
        output.style.textAlign = "left";
        break;
      case "8":
        output.style.alignItems = "end";
        output.style.textAlign = "center";
        break;
      case "9":
        output.style.alignItems = "end";
        output.style.textAlign = "right";
        break;
      default:
        console.error("Invalid align value: ", alignValue);
        break;
    }
  });
});

// Toggle visibility

document.getElementById("title-visibility").onclick = () => {
  outputTitle.classList.toggle("visibility");
  document.querySelector('#title-visibility .visible-on').classList.toggle('hide');
  document.querySelector('#title-visibility .visible-off').classList.toggle('hide');
};

document.getElementById("subtitle-visibility").onclick = () => {
  outputSubtitle.classList.toggle("visibility");
  document.querySelector('#subtitle-visibility .visible-on').classList.toggle('hide');
  document.querySelector('#subtitle-visibility .visible-off').classList.toggle('hide');
};

//Title font size

titleFontSizeSlider.addEventListener("input", function () {
  const value = this.value;
  const size = value + "px";

  outputTitle.style.fontSize = size;
  titleFontSizeValue.textContent = size;
});

// subtitle font size

subtitleFontSizeSlider.addEventListener("input", function () {
  const value = this.value;
  const size = value + "px";

  outputSubtitle.style.fontSize = size;
  subtitleFontSizeValue.textContent = size;
});

// Title letter spacing

titleLetterSpacingSlider.addEventListener("input", function () {
  const value = this.value;
  const size = value + "px";

  outputTitle.style.letterSpacing = size;
  titleLetterSpacingValue.textContent = size;
});

// subtitle letter spacing

subtitleLetterSpacingSlider.addEventListener("input", function () {
  const value = this.value;
  const size = value + "px";

  outputSubtitle.style.letterSpacing = size;
  subtitleLetterSpacingValue.textContent = size;
});

// Sticker scale slider

const elementScaleSlider= document.getElementById("element-scale-slider");
const elementScaleValue = document.getElementById("element-scale-value");

elementScaleSlider.addEventListener("input", function () {
  const value = this.value;
  activeSticker.style.transform = `scale(${value})`;
  elementScaleValue.textContent = value;
});

const imageInput = document.getElementById('image-input');
const verticalGuide = document.querySelector('.vertical-guide');
const horizontalGuide = document.querySelector('.horizontal-guide');
let stickerIndex = 0;
let activeSticker = "";

// Store dragging state for each sticker
const dragStates = new Map();

// Handle image upload
imageInput.addEventListener('change', (event) => {
  const file = event.target.files[0];

  if (file) {
    const reader = new FileReader();

    reader.onload = function (e) {
      const sticker = document.createElement('img');
      sticker.id = 'output-sticker-'+stickerIndex;
      sticker.className = 'output-sticker';
      sticker.alt = 'Drag the image here';
      sticker.src = e.target.result;
      output.appendChild(sticker);
      currentSticker = document.getElementById(sticker.id);
      sticker.onload = function() {
        snapToCenter(currentSticker);
      };
      allFeatures(currentSticker);
      stickerIndex++;
    };

    reader.readAsDataURL(file);
  } else {
    outputElement.style.display = 'none';
    outputElement.src = '';
  }
});

// Snap the image to the center
function snapToCenter(target) {
  const centerX = (output.offsetWidth - target.offsetWidth) / 2;
  const centerY = (output.offsetHeight - target.offsetHeight) / 2;
 
  target.style.left = `${centerX}px`;
  target.style.top = `${centerY}px`;

  showGuideLines();
}

// Show guide lines
function showGuideLines() {
  verticalGuide.style.display = 'block';
  horizontalGuide.style.display = 'block';

  setTimeout(() => {
    verticalGuide.style.display = 'none';
    horizontalGuide.style.display = 'none';
  }, 1000);
}

function allFeatures(sticker) {

  // Add click event listener to the sticker
  sticker.addEventListener('click', () => {
    showPanel('sticker');
    activeSticker = sticker;
  });


  // Initialize drag state for this sticker
  dragStates.set(sticker.id, {
    isDragging: false,
    startX: 0,
    startY: 0,
    imageStartX: 0,
    imageStartY: 0
  });

  // Start dragging
  sticker.addEventListener('mousedown', (event) => {
    const dragState = dragStates.get(sticker.id);
    dragState.isDragging = true;
    dragState.startX = event.clientX;
    dragState.startY = event.clientY;

    // Calculate the image's starting position relative to the container
    const rect = sticker.getBoundingClientRect();
    const containerRect = output.getBoundingClientRect();
    dragState.imageStartX = rect.left - containerRect.left;
    dragState.imageStartY = rect.top - containerRect.top;

    sticker.style.cursor = 'grabbing';
    event.preventDefault();
  });

  // Dragging movement - specific to this sticker
  const moveHandler = (event) => {
    const dragState = dragStates.get(sticker.id);
    if (!dragState.isDragging) return;

    const containerRect = output.getBoundingClientRect();

    // Calculate the new position based on mouse movement
    let newLeft = dragState.imageStartX + (event.clientX - dragState.startX);
    let newTop = dragState.imageStartY + (event.clientY - dragState.startY);

    // Constrain the image within the container
    const maxLeft = containerRect.width - sticker.offsetWidth;
    const maxTop = containerRect.height - sticker.offsetHeight;

    newLeft = Math.max(0, Math.min(newLeft, maxLeft));
    newTop = Math.max(0, Math.min(newTop, maxTop));

    // Apply the new position
    sticker.style.left = `${newLeft}px`;
    sticker.style.top = `${newTop}px`;

    // Snap to horizontal or vertical center
    const snapTolerance = 20;
    const centerX = (containerRect.width - sticker.offsetWidth) / 2;
    const centerY = (containerRect.height - sticker.offsetHeight) / 2;

    if (Math.abs(newLeft - centerX) < snapTolerance) {
      sticker.style.left = `${centerX}px`;
      verticalGuide.style.display = 'block';
    } else {
      verticalGuide.style.display = 'none';
    }

    if (Math.abs(newTop - centerY) < snapTolerance) {
      sticker.style.top = `${centerY}px`;
      horizontalGuide.style.display = 'block';
    } else {
      horizontalGuide.style.display = 'none';
    }
  };

  // Stop dragging - specific to this sticker
  const upHandler = () => {
    const dragState = dragStates.get(sticker.id);
    if (dragState.isDragging) {
      dragState.isDragging = false;
      sticker.style.cursor = 'grab';
      verticalGuide.style.display = 'none';
      horizontalGuide.style.display = 'none';
    }
  };

  // Add event listeners
  document.addEventListener('mousemove', moveHandler);
  document.addEventListener('mouseup', upHandler);
}




document.querySelector("#template-item-1-selector").addEventListener("click", function(){

  document.querySelectorAll(".template-item").forEach(item => {
    item.classList.remove("current-template");
  });
  this.classList.add("current-template");

  colorOverlay.style.opacity = "0.6";
  colorOverlay.style.width = "100%";

  output.style.alignItems = "flex-end";
  output.style.textAlign = "left";

  outputTitle.style.fontSize = "64px";
  outputSubtitle.style.letterSpacing = "4px";
  outputTitle.style.transform = "skewX(0deg)";
  outputSubtitle.style.transform = "skewX(0deg)";
  outputSubtitle.style.fontSize = "32px";
  outputTitle.style.letterSpacing = "0px";
  outputTitle.style.backgroundColor = "transparent";
  

  outputText.style.width = "100%";

  outputImage.style.left = "0px";

  //Designer Overlay
  colorOverlayOpacitySlider.value = 60;
  colorOverlayOpacityValue.textContent = "60%";

  //Designer Layout
  cells.forEach((c) => c.classList.remove("active"));
  cells[6].classList.add("active");

  //Designer Title
  titleFontSizeSlider.value = 64;
  titleFontSizeValue.textContent = "64px";
  titleLetterSpacingSlider.value = 0;
  titleLetterSpacingValue.textContent = "0px";
  titleSkewSlider.value = 0;
  titleSkewValue.textContent = "0";
  addBackgroundTitle.checked = false;
  titleBackgroundSelector.style.display = "none";

  //Designer Subtitle
  subtitleFontSizeSlider.value = 32;
  subtitleFontSizeValue.textContent = "32px";
  subtitleLetterSpacingSlider.value = 4;
  subtitleLetterSpacingValue.textContent = "4px";
  subtitleSkewSlider.value = 0;
  subtitleSkewValue.textContent = "0";
  
});

document.querySelector("#template-item-2-selector").addEventListener("click", function(){

  document.querySelectorAll(".template-item").forEach(item => {
    item.classList.remove("current-template");
  });
  this.classList.add("current-template");

  colorOverlay.style.opacity = 1;
  colorOverlay.style.width = "50%";

  output.style.alignItems = "center";
  output.style.textAlign = "left";

  outputTitle.style.fontSize = "48px";
  outputSubtitle.style.letterSpacing = "4px";
  outputTitle.style.transform = "skewX(0deg)";
  outputSubtitle.style.transform = "skewX(0deg)";
  outputSubtitle.style.fontSize = "24px";
  outputTitle.style.letterSpacing = "0px";
  outputTitle.style.backgroundColor = "transparent";
  

  outputText.style.width = "calc(50% - 24px)";

  outputImage.style.left = "200px";

  //Designer Overlay
  colorOverlayOpacitySlider.value = 100;
  colorOverlayOpacityValue.textContent = "100%";

  //Designer Layout
  cells.forEach((c) => c.classList.remove("active"));
  cells[3].classList.add("active");

  //Designer Title
  titleFontSizeSlider.value = 48;
  titleFontSizeValue.textContent = "48px";
  titleLetterSpacingSlider.value = 0;
  titleLetterSpacingValue.textContent = "0px";
  titleSkewSlider.value = 0;
  titleSkewValue.textContent = "0";
  addBackgroundTitle.checked = false;
  titleBackgroundSelector.style.display = "none";

  //Designer Subtitle
  subtitleFontSizeSlider.value = 24;
  subtitleFontSizeValue.textContent = "24px";
  subtitleLetterSpacingSlider.value = 4;
  subtitleLetterSpacingValue.textContent = "4px";
  subtitleSkewSlider.value = 0;
  subtitleSkewValue.textContent = "0";
  
});




// Get the modal
const modal = document.getElementById("feedback-modal");
const sendFeedbackButton = document.getElementById("send-feedback-button");
const closeButton = document.getElementById("feedback-modal-close");
const closeButton2 = document.getElementById("success-message-close");
const feedbackForm = document.getElementById("feedback-form");

sendFeedbackButton.onclick = function() {
  modal.style.display = "block";
}

closeButton.onclick = function() {
  modal.style.display = "none";
}

closeButton2.onclick = function() {
  modal.style.display = "none";
}

feedbackForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  sendFeedback();
});

// When the user clicks anywhere outside of the modal, close it
// window.onclick = function(event) {
//   if (event.target == modal) {
//     modal.style.display = "none";
//   }
// }