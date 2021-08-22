var readyToLoadPreview = true

function previewSticker(){
    if(readyToLoadPreview){
        readyToLoadPreview = false
        SizeSlider.disabled = true

        loadLocalPDFToCanvas('sample.pdf', previewCanvas).then(()=>{
    
            let coordinatesRecieved = findStampSpace(previewCanvas),
                stampAndRedisplay = ()=>{
                    stampPdfFromUrl(coordinatesRecieved.x, coordinatesRecieved.y, 'sample.pdf')
                    .then((bytes)=>{
                        var file = new Blob([bytes], { type: 'application/pdf' });
                        loadPDFToCanvas(file, previewCanvas).then(()=>{
                            readyToLoadPreview = true
                            SizeSlider.disabled = false
                        })
                    })
                };
            (coordinatesRecieved)? stampAndRedisplay():{};
        })
    }
}

// localStorage.setItem(key, result)