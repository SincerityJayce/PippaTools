const preloader = new Image();
preloader.src = '4k13.png';
preloader.onload = ()=>{
    document.body.classList.add('loaded')
}