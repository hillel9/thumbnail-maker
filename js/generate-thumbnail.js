async function generateThumbnail(){
    output.classList.add("loading-state");
    output.style.display = "flex";
  
    //Reset output
    outputImage.style.display = "none";
    outputText.style.display = "none";
    colorOverlay.style.backgroundColor = "transparent";
  
    try {
  
      //Build prompt for text
      instructions.title = purpose[0].title + theme.value + stringFormat;
      instructions.paragraph = purpose[0].subtitle + theme.value + stringFormat;
  
      if (imageDescriptionInput.value !== "") {
        imageDescription = `The image should include: ${imageDescriptionInput.value}.`;
      } else {
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
          ratio: ratio.value,
          imagedescription: imageDescription
        })
      });
  
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
  
      const data = await response.json();
  
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
          output.style.width = "600px";
          output.style.height = "600px";
          break;
      }
  
      //Populate output
      outputImage.src = data.imageUrl;
      outputImage.style.opacity = "1";
      colorOverlay.style.backgroundColor = data.color;
      colorOverlaySelector.value = data.color;
      outputTitle.innerHTML = data.title;
      outputSubtitle.innerHTML = data.subtitle;
  
      // Error handling
    } catch (error) {
      console.error("Error:", error.message);
    } finally {
      output.classList.remove("loading-state");
      outputText.style.display = "flex";
      outputImage.style.display = "block";
      regenerateButton.style.display = "block";
      showPanel('designer');
    }
}