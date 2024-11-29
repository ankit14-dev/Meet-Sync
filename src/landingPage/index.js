 // Handle Drag and Drop
 const fileDropArea = document.getElementById('fileDropArea');
 const fileInput = document.getElementById('fileInput');
 const fileNameSpan = document.getElementById('fileName');

 fileDropArea.addEventListener('dragover', function(e) {
   e.preventDefault();
   fileDropArea.classList.add('dragover');
 });

 fileDropArea.addEventListener('dragleave', function() {
   fileDropArea.classList.remove('dragover');
 });

 fileDropArea.addEventListener('drop', function(e) {
   e.preventDefault();
   fileDropArea.classList.remove('dragover');
   const file = e.dataTransfer.files[0];
   if (file) {
     fileInput.files = e.dataTransfer.files; // Set file input value
     fileNameSpan.textContent = file.name; // Show the file name
     fileDropArea.classList.add('file-selected');
   }
 });

 // Allow file selection through the drop area
 fileDropArea.addEventListener('click', function() {
   fileInput.click();
 });

 // Handle file selection through the file input
 fileInput.addEventListener('change', function() {
   const file = fileInput.files[0];
   if (file) {
     fileNameSpan.textContent = file.name; // Show the file name
     fileDropArea.classList.add('file-selected');
   }
 });

 // Handle Form Submission
 document.getElementById('outputForm').addEventListener('submit', function(event) {
   event.preventDefault(); // Prevent form submission

   const url = document.getElementById('urlInput').value;
   const file = document.getElementById('fileInput').files[0];

   // Update Output
   document.getElementById('outputText').innerHTML = `
     <p><strong>URL:</strong> ${url}</p>
     <p><strong>File Name:</strong> ${file ? file.name : 'No file selected'}</p>
   `;
 });

 // Handle Download Button
 document.getElementById('downloadBtn').addEventListener('click', function() {
   const outputText = document.getElementById('outputText').innerText;
   const blob = new Blob([outputText], { type: 'text/plain' });
   const url = URL.createObjectURL(blob);

   const link = document.createElement('a');
   link.href = url;
   link.download = 'output.txt';
   link.click();

   // Cleanup
   URL.revokeObjectURL(url);
 });

 // Handle Copy to Clipboard Button
 document.getElementById('copyBtn').addEventListener('click', function() {
   const outputText = document.getElementById('outputText').innerText;

   navigator.clipboard.writeText(outputText)
     .then(() => alert('Output copied to clipboard!'))
     .catch(err => console.error('Error copying text: ', err));
 });