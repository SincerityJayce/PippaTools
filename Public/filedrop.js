var batchProcessing = false, batch=[], batchWorker;


filesRecievedFunction = {
  'PDFDrop':OnPDFInput,

  'StickerDrop':function(input){
    if(input.files[0].type == "image/png"){
      setSticker(input.files[0])
    }
  }
}




document.querySelectorAll(".drop-zone__input").forEach((inputElement) => {
    const dropZoneElement = inputElement.closest(".drop-zone");
  
    dropZoneElement.addEventListener("click", (e) => {
      inputElement.click();
    });
  
    inputElement.addEventListener("change", (e) => {
      if (inputElement.files.length) {
        filesRecievedFunction[inputElement.id](inputElement);
      }
    });
  
    dropZoneElement.addEventListener("dragover", (e) => {
      e.preventDefault();
      dropZoneElement.classList.add("drop-zone--over");
    });
  
    ["dragleave", "dragend"].forEach((type) => {
      dropZoneElement.addEventListener(type, (e) => {
        dropZoneElement.classList.remove("drop-zone--over");
      });
    });
  
    dropZoneElement.addEventListener("drop", (e) => {
      e.preventDefault();
  
      if (e.dataTransfer.files.length) {
        inputElement.files = e.dataTransfer.files;
        filesRecievedFunction[inputElement.id](inputElement);
      }
  
      dropZoneElement.classList.remove("drop-zone--over");
    });
  });




