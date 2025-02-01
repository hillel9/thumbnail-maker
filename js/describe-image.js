const url = "";

async function describeImage(){
    try {
  
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          instruct: "",
        })
      });
  
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
  
      const data = await response.json();
  
      // Error handling
    } catch (error) {

      console.error("Error:", error.message);

    } finally {

    }
}