// Theme toggle
function toggleTheme() {
  document.body.classList.toggle('dark-theme');
}

// Reset all editable fields
function resetContent() {
  const editableElements = document.querySelectorAll('[contenteditable="true"]');
  editableElements.forEach(el => el.innerText = `[Edit this section]`);
  updateCompletion();
}

// Live preview toggle
function togglePreview() {
  document.body.classList.toggle('preview-mode');
}

// Completion %
function updateCompletion() {
  const fields = document.querySelectorAll('[contenteditable="true"]');
  let filled = 0;
  fields.forEach(f => {
    if (f.innerText.trim() !== '' && !f.innerText.includes('[')) filled++;
  });
  const percent = Math.floor((filled / fields.length) * 100);
  document.getElementById('completion-status').innerText = `Completion: ${percent}%`;
}

document.querySelectorAll('[contenteditable="true"]').forEach(e => {
  e.addEventListener('input', updateCompletion);
});

// Export resume as JSON
function exportJSON() {
  const data = {};
  document.querySelectorAll('[contenteditable="true"]').forEach((el, idx) => {
    data[`field${idx}`] = el.innerText;
  });
  const blob = new Blob([JSON.stringify(data)], {type: 'application/json'});
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'resume-data.json';
  a.click();
}

// Import resume from JSON
function importJSON(event) {
  const reader = new FileReader();
  reader.onload = () => {
    const data = JSON.parse(reader.result);
    document.querySelectorAll('[contenteditable="true"]').forEach((el, idx) => {
      if (data[`field${idx}`]) el.innerText = data[`field${idx}`];
    });
    updateCompletion();
  };
  reader.readAsText(event.target.files[0]);
}

// Placeholder switchTemplate (future feature)
function switchTemplate() {
  alert("Template switching feature coming soon!");
}
