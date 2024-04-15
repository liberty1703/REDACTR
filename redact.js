document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("redactForm");
  const resetButton = document.getElementById("resetButton");
  const redactedContentDiv = document.getElementById("redactedContent");
  const statusDiv = document.getElementById("status");

  form.addEventListener("submit", function (event) {
    event.preventDefault();

    redactedContentDiv.textContent = "";
    statusDiv.textContent = "";

    const formData = new FormData(form);
    const originalText = formData.get("originalText");
    const wordsToRedact = formData.get("wordsToRedact");
    const replacementOption = formData.get("replacementOption");
    const replacementText = formData.get("replacementText");

    let redactedText = originalText;
    let redactedCount = 0;                
    const words = wordsToRedact.split(" ");
    words.forEach((word) => {
      const regex = new RegExp(word, "gi");
      switch (replacementOption) {
        case "question_marks":
          redactedText = redactedText.replace(regex, "?");
          break;
        case "asterisks":
          redactedText = redactedText.replace(regex, "*");
          break;
        case "dashes":
          redactedText = redactedText.replace(regex, "-");
          break;
        case "underscores":
          redactedText = redactedText.replace(regex, "_");
          break;
        case "other":
          redactedText = redactedText.replace(regex, replacementText);
          break;
      }
      redactedCount++;
    });

    const redactedContent = document.createElement("div");
    redactedContent.textContent = "Redacted Content: " + redactedText;
    redactedContentDiv.appendChild(redactedContent);

    const status = document.createElement("div");
    status.textContent = `Status: Words scanned: ${
      words.length
    }, Words redacted: ${redactedCount}, Characters redacted: ${
      redactedText.length - originalText.length
    }, Time taken: 0 seconds`;
    statusDiv.appendChild(status);
  });

  resetButton.addEventListener("click", function () {
    form.reset();
    redactedContentDiv.textContent = "";
    statusDiv.textContent = "";
  });
});
