var filesToReview = [], openFileIndex=0, safeToLoadReview = true;

const reviewCanvas=document.getElementById('pdf-review-canvas'), 
reviewNameTag = document.getElementById('pdf-review-nametag');

function reviewFile(fileobj){
    console.log(reviewCanvas)

    filesToReview.push(fileobj)
}


function reloadReview(){

    if (filesToReview[0] && reviewNameTag.innerHTML != filesToReview[openFileIndex]['name']){
        loadReviewFile()
    }
};

setInterval(reloadReview, 240);


function loadReviewFile(){
    if(safeToLoadReview){
        let f = filesToReview[openFileIndex];
        reviewNameTag.innerHTML = f['name']
        safeToLoadReview = false
        loadPDFToCanvas(f['file'], reviewCanvas).then(()=>{
            safeToLoadReview = true
        })
    }
}



function clickLeft(){
    if (openFileIndex > 0){
        openFileIndex -= 1;
        loadReviewFile();
    }
}
function clickRight(){
    if(openFileIndex < filesToReview.length-1){
        openFileIndex += 1;
        loadReviewFile();
    }
}

