function addElement(type) {
  const formContainer = document.getElementById("form-container");

  const element = document.createElement("div");
  element.className = "element";
  element.draggable = true;

  element.addEventListener("dragstart", (e) => {
    e.dataTransfer.setData("text/plain", e.target.id);
    element.classList.add("dragging");
  });

  element.addEventListener("dragend", () => {
    element.classList.remove("dragging");
  });

  const label = document.createElement("label");
  label.textContent = `${type.charAt(0).toUpperCase() + type.slice(1)}: `;
  element.appendChild(label);

  let input;
  if (type === "text") {
    input = document.createElement("input");
    input.type = "text";
    input.placeholder = "Sample placeholder";
  } else if (type === "textarea") {
    input = document.createElement("textarea");
    input.placeholder = "Sample placeholder";
  } else if (type === "select") {
    input = document.createElement("select");
    const option1 = document.createElement("option");
    option1.text = "Option 1";
    const option2 = document.createElement("option");
    option2.text = "Option 2";
    input.add(option1);
    input.add(option2);
  } else if (type === "checkbox") {
    input = document.createElement("input");
    input.type = "checkbox";
  }

  element.appendChild(input);

  // Edit Button
  const editBtn = document.createElement("button");
  editBtn.className = "edit-btn";
  editBtn.textContent = "Edit";
  editBtn.onclick = function () {
    input.disabled = !input.disabled;
    editBtn.textContent = input.disabled ? "Edit" : "Save";
  };
  element.appendChild(editBtn);

  // Delete Button
  const deleteBtn = document.createElement("button");
  deleteBtn.className = "delete-btn";
  deleteBtn.innerHTML = "&times;";
  deleteBtn.onclick = () => formContainer.removeChild(element);
  element.appendChild(deleteBtn);

  input.disabled = true;
  formContainer.appendChild(element);
}

function saveForm() {
  const formElements = document.querySelectorAll(".element");
  const formData = [];

  formElements.forEach((el) => {
    const label = el.querySelector("label").textContent.replace(":", "").trim();
    const input = el.querySelector("input, textarea, select");
    const type = input.tagName.toLowerCase();
    const id = crypto.randomUUID();

    let value, options;
    if (type === "select") {
      value = input.options[input.selectedIndex].text;
      options = Array.from(input.options).map((opt) => opt.text);
    } else if (input.type === "checkbox") {
      value = input.checked;
    } else {
      value = input.value;
    }

    const elementData = { id, type, label, value };
    if (input.placeholder) elementData.placeholder = input.placeholder;
    if (options) elementData.options = options;

    formData.push(elementData);
  });

  console.log(JSON.stringify(formData, null, 2));
  alert("Form data saved! Check the console for the JSON output.");
}
