const form = document.getElementById("chatForm");
const input = document.getElementById("message");
const chat = document.getElementById("chat");

function addMessage(text, type) {
  const div = document.createElement("div");
  div.className = `message ${type}`;
  const label = document.createElement("strong");
  label.textContent = type === "user" ? "You" : "Snapbbrain-AI";
  const p = document.createElement("p");
  p.textContent = text;
  div.appendChild(label);
  div.appendChild(p);
  chat.appendChild(div);
  chat.scrollTop = chat.scrollHeight;
}

function usePrompt(text) {
  input.value = text;
  input.focus();
}

form.addEventListener("submit", async (event) => {
  event.preventDefault();
  const message = input.value.trim();
  if (!message) return;

  addMessage(message, "user");
  input.value = "";

  addMessage("Thinking...", "assistant");
  const thinking = chat.lastElementChild;

  try {
    const response = await fetch("/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message })
    });

    const data = await response.json();
    thinking.querySelector("p").textContent = data.reply || "Sorry, I couldn't respond.";
  } catch (error) {
    thinking.querySelector("p").textContent =
      "The demo server is not reachable. Make sure app.py is running.";
  }
});
