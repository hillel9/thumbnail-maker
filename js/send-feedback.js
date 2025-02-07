const urlFeedback = "https://hook.eu2.make.com/nvyffpdsuumujcyth0oj9w5u7bpjqfmb";

async function sendFeedback(){
    try {
      const feedbackText = document.getElementById('feedback-text').value;

      const response = await fetch(urlFeedback, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          feedback: feedbackText
        })
      });
  
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
  
      // Error handling
    } catch (error) {

      console.error("Error:", error.message);
      
    } finally {
      document.getElementById("feedback-form").style.display = "none";
      document.getElementById("success-message").style.display = "flex";
    }
}