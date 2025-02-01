const url = "https://hook.eu2.make.com/suw64w5bym8evrbhdgll1em9ikf860aw";


async function describeImage(){
    try {
      imageDescriptionInput.style.opacity = "0.5";
      imageDescriptionInput.disabled = true;

      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          instruct: "Describe in few words an image for a thumbnail supporting this theme: " + theme.value + stringFormat
        })
      });
  
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
  
      const data = await response.json();
      imageDescriptionInput.value = data.imageDescription;
  
      // Error handling
    } catch (error) {

      console.error("Error:", error.message);
      
    } finally {
      imageDescriptionInput.disabled = false;
      imageDescriptionInput.style.opacity = "1";
    }
}