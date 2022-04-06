const taskTabs = {
    'Sticker Editor': document.getElementById('Sticker-Creator'),
    'PDF Stamper': document.getElementById('PDF-Stamper'),
    'Review Files': document.getElementById('Review-Files')
}

document.querySelectorAll(".decorated-button").forEach((task)=>{

    task.addEventListener('click', function(){
        let unselect=()=>{
            _SelectedTask = undefined;
            _HoveredTask = undefined;
        }
        (_SelectedTask==task) ? unselect(): _SelectedTask=task;
        renderTaskButtons();
    })

    task.addEventListener('mouseover', function(){
        _HoveredTask = task;
        renderTaskButtons(false)
    })
    task.addEventListener('mouseleave', function(){
        _HoveredTask = undefined;
        renderTaskButtons()
    })
})

var _SelectedTask, _HoveredTask;

function renderTaskButtons(hovered = true){
    let unselectAllTasks = () => {
        Object.values(taskTabs).forEach((node)=>{node.style.display = 'none'})
        document.querySelectorAll(".decorated-button").forEach((task)=>{
            task.classList.remove('SelectedTask')
        })
    };
    unselectAllTasks()

    //determines to flex hovered or selected task
    let t = taskTabs[_HoveredTask?.id || _SelectedTask?.id]
    t&&(t.style.display = 'flex')

    _HoveredTask?.classList.add('SelectedTask')
    hovered && _SelectedTask?.classList.add('SelectedTask')
}
const PDFStamperTask = document.getElementById('PDF Stamper')
PDFStamperTask.addEventListener('dragover', function (e){
    e.preventDefault()
    _SelectedTask=PDFStamperTask;
    renderTaskButtons();
})
const StickerTask = document.getElementById('Sticker Editor')
StickerTask.addEventListener('dragover', function (e){
    e.preventDefault()
    _SelectedTask=StickerTask;
    renderTaskButtons();
})
