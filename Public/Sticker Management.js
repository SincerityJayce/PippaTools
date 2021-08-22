var scan, scale_required = 1, sliderScale = 1,
stamp = document.createElement('img');
stamp.src = 'stamp sample.png'

const StickerZone= document.getElementById('stickerPreview');
StickerZone.appendChild(stamp)

function setSticker(img){
    stamp.remove()
    delete stamp
    stamp = new Image();
    stamp.onload =()=>{
        SizeSlider.max = (450/stamp.naturalWidth)*100;
        SizeSlider.value = SizeSlider.max/2;
        setScan()
        // previewSticker()
    }
    stamp.src = URL.createObjectURL(img)
    StickerZone.appendChild(stamp)
}
const SizeSlider = document.getElementById("Sticker-Size");
SizeSlider.addEventListener('change', function setStickerScale(){
    sliderScale = SizeSlider.value/100;
    setScan();
    previewSticker();
})

function setScan(){
    scan = {y:stamp.naturalHeight*scale_required*sliderScale, x:stamp.naturalWidth*scale_required*sliderScale}
}