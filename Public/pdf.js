const { PDFDocument } = PDFLib


var scale_required, _PAGE_RENDERING_IN_PROGRESS = 0, _PDF_DOC, 
testCanvas = document.querySelector('#pdf-test-canvas'), 
previewCanvas = document.querySelector('#pdf-preview-canvas');








async function loadLocalPDFToCanvas(pdfLocal, canvas) {
    
    let _PDF_DOC = await pdfjsLib.getDocument({ url: pdfLocal}).promise;

    return showPage(_PDF_DOC, canvas);
}

// Loads The first page of a pdf to the canvas
async function loadPDFToCanvas(pdf, canvas) {
    
    let _PDF_DOC = await pdfjsLib.getDocument({ url: URL.createObjectURL(pdf) }).promise;

    return showPage(_PDF_DOC, canvas);
}

// from above
async function showPage(_PDF_DOC, context) {
    _PAGE_RENDERING_IN_PROGRESS = 1;

    // while page is being rendered hide the canvas and show a loading message
    context.style.display = 'none';

    // get handle of page
    try {
        var page = await _PDF_DOC.getPage(1);
    }
    catch(error) {
        alert(error.message);
    }

    // original width of the pdf page at scale 1
    var pdf_original_width = page.getViewport({scale:1}).width;
    
    // as the canvas is of a fixed width we need to adjust the scale of the viewport where page is rendered
    scale_required = context.width / pdf_original_width;
    setScan();

    // get viewport to render the page at required scale
    var viewport = page.getViewport({scale:scale_required});

    // set canvas height same as viewport height
    context.height = viewport.height;

    // page is rendered on <canvas> element
    var render_context = {
        canvasContext: context.getContext('2d'),
        viewport: viewport
    };
        
    // render the page contents in the canvas
    try {
        await page.render(render_context).promise;
        context.style.display = 'block';
        _PAGE_RENDERING_IN_PROGRESS = 0;

        return true;

    }
    catch(error) {
        alert(error.message);
    }
}


async function stampPdfBytes(x,y,bytes){
    const pdfDoc = await PDFDocument.load(bytes)

    // Fetch PNG image
    const pngUrl = stamp.src
    const pngImageBytes = await fetch(pngUrl).then((res) => res.arrayBuffer())

    // Embed the PNG image bytes
    const pngImage = await pdfDoc.embedPng(pngImageBytes)

    // Get the width/height of the PNG image scaled down to 50% of its original size
    const pngDims = pngImage.scale(scale_required*sliderScale)

    // get first page
    const page = pdfDoc.getPages()[0]

    // Draw the PNG image near the lower right corner of the JPG image
    page.drawImage(pngImage, {
    x:  x/scale_required,
    y: page.getHeight() - (y)/scale_required -pngDims.height,
    width: pngDims.width,
    height: pngDims.height,
    })

    // Serialize the PDFDocument to bytes (a Uint8Array)
    let stampedBytes = await pdfDoc.save()
    return stampedBytes
}
async function stampPdfFile(x, y, pdf) {


    // pdf file to bytes
    const existingPdfBytes = await pdf.arrayBuffer()
    const stampedBytes = await stampPdfBytes(x,y,existingPdfBytes)
    return stampedBytes
}
async function stampPdfFromUrl(x, y, locale) {
    existingPdfBytes = await fetch(locale).then(res => res.arrayBuffer())
    const stampedBytes = await stampPdfBytes(x,y,existingPdfBytes)
    return stampedBytes
}