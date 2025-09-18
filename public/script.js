javascript
async function generateTestCases() {
  const code = document.getElementById("code").value;
  const language = document.getElementById("language").value;
  const output = document.getElementById("output");

  output.textContent = "Generating...";

  try {
    const res = await fetch("/generate-testcases", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ codeSnippet: code, language }),
    });
    const data = await res.json();
    output.textContent = data.testCases || "No test cases generated.";
  } catch (err) {
    output.textContent = "Error: " + err.message;
  }
}

function downloadTestCases() {
  const text = document.getElementById("output").textContent;
  const element = document.createElement("a");
  const file = new Blob([text], { type: "text/plain" });
  element.href = URL.createObjectURL(file);
  element.download = "test_cases.txt";
  document.body.appendChild(element);
  element.click();
}
