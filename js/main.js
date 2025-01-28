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

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  output.classList.add("loading-state");
  document.querySelector('.output-text').style.display = "none";
  outputElement.style.display = "none";

  //Reset output
  posterImage.style.display = "none";
  colorOverlay.style.backgroundColor = "00FFFFFF";
  title.innerHTML = "";
  paragraph.innerHTML = "";  
  
  try {

    //Build prompt for text
    instructions.title = purpose[0].title + theme.value + stringFormat;
    instructions.paragraph = purpose[0].paragraph + theme.value + stringFormat;

    if (imageDescriptionInput.value !== "") {
        imageDescription = `The image should include: ${imageDescriptionInput.value}.`;
    }else{
      imageDescription = "";
    }

    const response = await fetch(webhookUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        theme: theme.value,
        title: instructions.title,
        paragraph: instructions.paragraph,
        style: style.value,
        ratio: ratio,
        imagedescription: imageDescription
      })
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    console.log(data);

    //Populate output
    posterImage.src = data.imageUrl;
    posterImage.style.display = "block";
    colorOverlay.style.backgroundColor = data.color;
    colorOverlaySelector.value = data.color;
    title.innerHTML = data.title;
    paragraph.innerHTML = data.paragraph;

    // Error handling
  } catch (error) {
    console.error("Error:", error.message);
  } finally {
    form.classList.remove("loading");
    output.classList.remove("loading-state");
    document.querySelector('.output-text').style.display = "flex";
    showPanel('designer');
    if(outputElement.src !== ""){
      outputElement.style.display = "block";
    }
  }
});

//----------------------------------------------

// Designer section

title.addEventListener("focus", function () {
  showPanel('title-edit');
})

paragraph.addEventListener("focus", function () {
  showPanel('paragraph-edit');
})

titleEditDone.addEventListener("click", function () {
  showPanel('designer');
})

paragraphEditDone.addEventListener("click", function () {
  showPanel('designer');
})

colorOverlay.addEventListener("click", function () {
  showPanel('designer');
})

function changeFont(targetLayer, fontSelector){
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
changeFont(title,titleFontSelector.value);
});

// Update paragraph font

paragraphFontSelector.addEventListener("change", function () {
  changeFont(paragraph, paragraphFontSelector.value);
});

// Update title styles

document.getElementById("turn-bold-title").onchange = () => {
  title.classList.toggle("bold");
};

document.getElementById("turn-italic-title").onchange = () => {
  title.classList.toggle("italic");
};

document.getElementById("turn-uppercase-title").onchange = () => {
  title.classList.toggle("uppercase");
};

// Update paragraph styles

document.getElementById("turn-bold-paragraph").onchange = () => {
  paragraph.classList.toggle("bold");
};

document.getElementById("turn-italic-paragraph").onchange = () => {
  paragraph.classList.toggle("italic");
};

document.getElementById("turn-uppercase-paragraph").onchange = () => {
  paragraph.classList.toggle("uppercase");
};

colorOverlaySelector.onchange = () => {
  colorOverlay.style.backgroundColor = colorOverlaySelector.value;
};

// Color opacity slider
const slider = document.getElementById("opacitySlider");
const opacityValue = document.getElementById("opacityValue");

slider.addEventListener("input", function () {
  const value = this.value;
  const opacity = value / 100;

  colorOverlay.style.opacity = opacity;
  opacityValue.textContent = value + "%";
});

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

document.getElementById("title-visibility").onchange = () => {
  title.classList.toggle("visibility");
};

document.getElementById("paragraph-visibility").onchange = () => {
  paragraph.classList.toggle("visibility");
};



//Title font size

titleFontSizeSlider.addEventListener("input", function () {
  const value = this.value;
  const size = value + "px";

  title.style.fontSize = size;
  titleFontSizeValue.textContent = size;
});

// Paragraph font size

paragraphFontSizeSlider.addEventListener("input", function () {
  const value = this.value;
  const size = value + "px";

  paragraph.style.fontSize = size;
  paragraphFontSizeValue.textContent = size;
});

// Title letter spacing

titleLetterSpacingSlider.addEventListener("input", function () {
  const value = this.value;
  const size = value + "px";

  title.style.letterSpacing = size;
  titleLetterSpacingValue.textContent = size;
});


// Element scale slider
// const elementScaleSlider= document.getElementById("element-scale-slider");
// const elementScaleValue = document.getElementById("element-scale-value");

// elementScaleSlider.addEventListener("input", function () {
//   const value = this.value;

//   outputElement.style.transform = `scale(${value})`;
//   elementScaleValue.textContent = value;
// });



/* ------------------------------------------- */


const imageInput = document.getElementById('image-input');
const verticalGuide = document.querySelector('.vertical-guide');
const horizontalGuide = document.querySelector('.horizontal-guide');

let isDragging = false;
let startX, startY, imageStartX, imageStartY;

// Handle image upload
imageInput.addEventListener('change', (event) => {
const file = event.target.files[0];

      if (file) {
        const reader = new FileReader();

        reader.onload = function (e) {
          outputElement.src = e.target.result;
          outputElement.style.display = 'block';
          snapToCenter(); // Snap to center when the image is uploaded
        };

        reader.readAsDataURL(file);
      } else {
        outputElement.style.display = 'none';
        outputElement.src = '';
      }
    });

    // Snap the image to the center
    function snapToCenter() {
      const centerX = (output.offsetWidth - outputElement.offsetWidth) / 2;
      const centerY = (output.offsetHeight - outputElement.offsetHeight) / 2;
      outputElement.style.left = `${centerX}px`;
      outputElement.style.top = `${centerY}px`;

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

    // Start dragging
    outputElement.addEventListener('mousedown', (event) => {
      isDragging = true;

      startX = event.clientX;
      startY = event.clientY;

      // Calculate the image's starting position relative to the container
      const rect = outputElement.getBoundingClientRect();
      const containerRect = output.getBoundingClientRect();
      imageStartX = rect.left - containerRect.left;
      imageStartY = rect.top - containerRect.top;

      outputElement.style.cursor = 'grabbing';

      // Prevent text selection during dragging
      event.preventDefault();
    });

    // Dragging movement
    document.addEventListener('mousemove', (event) => {
      if (!isDragging) return;

      const containerRect = output.getBoundingClientRect();

      // Calculate the new position based on mouse movement
      let newLeft = imageStartX + (event.clientX - startX);
      let newTop = imageStartY + (event.clientY - startY);

      // Constrain the image within the container
      const maxLeft = containerRect.width - outputElement.offsetWidth;
      const maxTop = containerRect.height - outputElement.offsetHeight;

      newLeft = Math.max(0, Math.min(newLeft, maxLeft));
      newTop = Math.max(0, Math.min(newTop, maxTop));

      // Apply the new position
      outputElement.style.left = `${newLeft}px`;
      outputElement.style.top = `${newTop}px`;

      // Snap to horizontal or vertical center
      const snapTolerance = 20; // Distance to snap
      const centerX = (containerRect.width - outputElement.offsetWidth) / 2;
      const centerY = (containerRect.height - outputElement.offsetHeight) / 2;

      if (Math.abs(newLeft - centerX) < snapTolerance) {
        outputElement.style.left = `${centerX}px`;
        verticalGuide.style.display = 'block';
      } else {
        verticalGuide.style.display = 'none';
      }

      if (Math.abs(newTop - centerY) < snapTolerance) {
        outputElement.style.top = `${centerY}px`;
        horizontalGuide.style.display = 'block';
      } else {
        horizontalGuide.style.display = 'none';
      }
    });

    // Stop dragging
    document.addEventListener('mouseup', () => {
      if (isDragging) {
        isDragging = false;
        outputElement.style.cursor = 'grab';
        verticalGuide.style.display = 'none';
        horizontalGuide.style.display = 'none';
      }
    });
