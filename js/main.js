form.addEventListener("submit", async (e) => {
  e.preventDefault();

  document.getElementById("loading-msg").style.display = "block";
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
    switch (purposeInput.value) {
      case "p1":
        instructions.title = purpose[0].title + theme.value + stringFormat;
        instructions.paragraph = purpose[0].paragraph + theme.value + stringFormat;
        break;
      case "p2":
        instructions.title = purpose[1].title + theme.value + stringFormat;
        instructions.paragraph = purpose[1].paragraph + theme.value + stringFormat;
        break;
    }

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
    title.innerHTML = data.title;
    paragraph.innerHTML = data.paragraph;

    //Change typography
    switch (style.value) {
      case "Digital art, modern, clean":
        output.style.fontFamily = font.Poppins;
        fontFamilySelector.value = "Poppins";
        break;
      case "impressionist":
        output.style.fontFamily = font.Lora;
        fontFamilySelector.value = "Lora";
        break;
      case "expressionism":
        output.style.fontFamily = font.Spectral;
        fontFamilySelector.value = "Spectral";
        break;
      case "abstract":
        output.style.fontFamily = font.Raleway;
        fontFamilySelector.value = "Raleway";
        break;
      case "cubism":
        output.style.fontFamily = font.Montserrat;
        fontFamilySelector.value = "Montserrat";
        break;
      case "surrealism":
        output.style.fontFamily = font.PlayfairDisplay;
        fontFamilySelector.value = "Playfair Display";
        break;
      case "pop art":
        output.style.fontFamily = font.Ubuntu;
        fontFamilySelector.value = "Ubuntu";
        break;
      case "swiss international style":
        output.style.fontFamily = font.OpenSans;
        fontFamilySelector.value = "Open Sans";
        break;
      case "vintage travel advertisements mid-20th":
        output.style.fontFamily = font.Merriweather;
        fontFamilySelector.value = "Merriweather";
        break;
      case "bauhaus":
        output.style.fontFamily = font.Roboto;
        fontFamilySelector.value = "Roboto";
        break;
      default:
        output.style.fontFamily = font.OpenSans;
        fontFamilySelector.value = "Open Sans";
        break;
    }

    switch (ratio.value) {
      case "16:9":
        output.style.width = "800px";
        output.style.height = "450px";
        break;
      case "9:16":
        output.style.width = "450px";
        output.style.height = "800px";
        break;
      case "1:1":
        output.style.width = "595px";
        output.style.height = "595px";
        break;
    }

    // Error handling
  } catch (error) {
    console.error("Error:", error.message);
  } finally {
    form.classList.remove("loading");
    document.getElementById("loading-msg").style.display = "none";
    output.classList.remove("loading-state");
    form.style.pointerEvents = 'none';
    designer.style.display = "flex";
    document.querySelector('.output-text').style.display = "flex";
    if(outputElement.src !== ""){
      outputElement.style.display = "block";
    }
  }
});

//----------------------------------------------

// Designer section

const designerGeneral = document.getElementById("d-general");
const designerPanelSecondary = document.getElementById("designer-panel-secondary");
const designerTitle = document.getElementById("d-title");
const designerElement = document.getElementById("d-element");
const titleEditDone = document.getElementById("title-edit-done");
const elementEditDone = document.getElementById("element-edit-done");

fontFamilySelector.addEventListener("change", function () {
  switch (fontFamilySelector.value) {
    case "Poppins":
      output.style.fontFamily = font.Poppins;
      break;
    case "Lora":
      output.style.fontFamily = font.Lora;
      break;
    case "Spectral":
      output.style.fontFamily = font.Spectral;
      break;
    case "Raleway":
      output.style.fontFamily = font.Raleway;
      break;
    case "Montserrat":
      output.style.fontFamily = font.Montserrat;
      break;
    case "PlayfairDisplay":
      output.style.fontFamily = font.PlayfairDisplay;
      break;
    case "Ubuntu":
      output.style.fontFamily = font.Ubuntu;
      break;
    case "Open Sans":
      output.style.fontFamily = font.OpenSans;
      break;
    case "Merriweather":
      output.style.fontFamily = font.Merriweather;
      break;
    case "Roboto":
      output.style.fontFamily = font.Roboto;
      break;
    default:
      output.style.fontFamily = font.Poppins;
      break;
  }
});

const downloadButton = document.getElementById("download");

downloadButton.addEventListener("click", () => {
  html2canvas(output, { useCORS: true }).then((canvas) => {
    // Convert the canvas to a data URL
    const link = document.createElement("a");
    link.download = "content.png"; // File name
    link.href = canvas.toDataURL("image/png");
    link.click();
  });
});

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

// Panel swap

 function slideLeft(panelHide,panelShow){
  designerGeneral.classList.add('slide-left');
  designerPanelSecondary.classList.add('slide-left');
  panelHide.style.display = "none";
  panelShow.style.display = "flex";  
}

function slideRight(){
  designerGeneral.classList.remove('slide-left');
  designerPanelSecondary.classList.remove('slide-left');
}

// Swap title
title.addEventListener("focus", function () {
slideLeft(designerElement,designerTitle);
})

colorOverlay.addEventListener("click", function () {
slideRight();
})

titleEditDone.addEventListener("click", function () {
slideRight();
})

// Swap element

outputElement.addEventListener("click", function () {
slideLeft(designerTitle,designerElement);
})

colorOverlay.addEventListener("click", function () {
slideRight();
})

elementEditDone.addEventListener("click", function () {
slideRight();
})

// Update title styles

document.getElementById("turn-bold").onchange = () => {
  title.classList.toggle("bold");
};

document.getElementById("turn-italic").onchange = () => {
  title.classList.toggle("italic");
};

document.getElementById("turn-uppercase").onchange = () => {
  title.classList.toggle("uppercase");
};

// Title sliders

const titleFontSizeSlider= document.getElementById("title-font-size-slider");
const titleFontSizeValue = document.getElementById("title-font-size-value");

titleFontSizeSlider.addEventListener("input", function () {
  const value = this.value;
  const size = value + "px";

  title.style.fontSize = size;
  titleFontSizeValue.textContent = size;
});

const titleLetterSpacingSlider= document.getElementById("title-letter-spacing-slider");
const titleLetterSpacingValue = document.getElementById("title-letter-spacing-value");

titleLetterSpacingSlider.addEventListener("input", function () {
  const value = this.value;
  const size = value + "px";

  title.style.letterSpacing = size;
  titleLetterSpacingValue.textContent = size;
});


// Element scale slider
const elementScaleSlider= document.getElementById("element-scale-slider");
const elementScaleValue = document.getElementById("element-scale-value");

elementScaleSlider.addEventListener("input", function () {
  const value = this.value;

  outputElement.style.transform = `scale(${value})`;
  elementScaleValue.textContent = value;
});



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
