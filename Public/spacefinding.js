




function findStampSpace(canvas){
    console.log('finding white space')
    var imageData = canvas.getContext('2d').getImageData(0, 0, canvas.width, canvas.height),
        imgWidth = canvas.width,
        imgHeight = canvas.height,
        data = imageData.data,
        getRBG = function(x, y) {
            return {
            red:   data[(imgWidth*y + x) * 4],
            green: data[(imgWidth*y + x) * 4 + 1],
            blue:  data[(imgWidth*y + x) * 4 + 2]
            };
        },
        isWhite = function (rgb) {
            return rgb.red == 255 && rgb.green == 255 && rgb.blue == 255;
        },
        isWhiteish = function (rgb) {
            return rgb.red > 200 && rgb.green > 200 && rgb.blue > 200;
        },
        checkBoxOfStampDimensions = function (startX,startY){
            for(var y = 0; y < scan.y; y ++) {
                for(var x = 0; x < scan.x; x++) {
                    if (!isWhiteish(getRBG(x+startX, y+startY))) {
                        return false;   
                    }
                }
            }
            console.log('we found a white square!', startX, startY)


            return true; // if whole square is whiteish 
        },
        checkEveryCellForWhite = function () {
            // loop through each row
            for(var y = 0; y < imgHeight-scan.y; y +=1) {
              // loop through each column
              for(var x = 0; x < imgWidth-scan.x; x+=1) {
                  if (isWhiteish(getRBG(x, y))&&checkBoxOfStampDimensions(x,y)) {
                        return {x,y};
                  }   
              }
            }

        console.log("we found no white square")

        return false; // all image is white
        }

        return checkEveryCellForWhite()
}
