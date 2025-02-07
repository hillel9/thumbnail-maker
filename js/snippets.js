/* styles.css */
.panel {
    display: none;
}
.panel[data-active="true"] {
    display: block;
}

/* index.html */
/*
<div class="navigation">
    <button data-target="settings">Settings</button>
    <button data-target="profile">Profile</button>
    <button data-target="notifications">Notifications</button>
</div>

<div class="sidebar">
    <div class="panel" data-panel="settings">Settings content</div>
    <div class="panel" data-panel="profile">Profile content</div>
    <div class="panel" data-panel="notifications">Notifications content</div>
</div>
*/

// panel-manager.js
function showPanel(panelId) {
    document.querySelectorAll('.panel').forEach(panel => {
        panel.dataset.active = "false";
    });
    
    const targetPanel = document.querySelector(`.panel[data-panel="${panelId}"]`);
    if (targetPanel) {
        targetPanel.dataset.active = "true";
    }
}

// Event listeners
document.querySelectorAll('[data-target]').forEach(button => {
    button.addEventListener('click', () => {
        showPanel(button.dataset.target);
    });
});

// Show initial panel
showPanel('settings');













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
      snapToCenter();
      
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
