function OnPDFInput(input){

  reviewNameTag.innerHTML = 'Loading...'
  openFileIndex = filesToReview.length
  document.getElementById('Review Files').style.display='inline'
  document.getElementById('Review Files').click();


    function fullProcessNextPDF(pdf){
        loadPDFToCanvas(pdf, testCanvas)
        .then(()=>{
      
            let coordinatesRecieved = findStampSpace(testCanvas),
            stampAndDowload = ()=>{
                stampPdfFile(coordinatesRecieved.x, coordinatesRecieved.y, pdf)
                .then((bytes)=>{
                    reviewFile({'name':pdf.name, 'file': new Blob([bytes], { type: 'application/pdf' })})
                    download(bytes, pdf.name, "application/pdf")
                    batchWorker.next()
                })
            },
            failedToFindSpace=()=>{
              reviewFile({'name':pdf.name, 'file': pdf})
              batchWorker.next()
            };

            (coordinatesRecieved)? stampAndDowload():failedToFindSpace();
        })
    }


    function* makePDFBatchWorker() {
      SizeSlider.disabled = true
      while(batch.length){
        yield fullProcessNextPDF(batch.shift())
      }
      batchProcessing = false
      SizeSlider.disabled = false
      return
    }

    console.log('batch started', input.files)

    for (var i=0; i<input.files.length; i++){
      if(input.files[i].type == "application/pdf"){
        batch.push(input.files[i])
      }
    }

    if (!batchProcessing){
      batchWorker = makePDFBatchWorker();
      batchProcessing = true
      batchWorker.next()
    }
  }