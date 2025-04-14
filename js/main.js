const item = [];

window.addEventListener('DOMContentLoaded', function(){
    frmRegist.addEventListener('submit', function(e){
        e.preventDefault();

    /* 유효성 검사 */
    let errorEls = frmRegist.querySelectorAll('.alert')
    const error = [];

    const reviewFields = {
        title : '제목을 입력해주세요.',
        content : '리뷰 내용을 입력해주세요.'
    };

    if(errorEls.length > 0){
        errorEls.forEach((errorEl) => errorEl.parentElement.removeChild(errorEl))
    }

    for(const[field, message] of Object.entries(reviewFields)){
        const value = typeof frmRegist[field].value === 'string' ?      frmRegist[field].value.trim() : ''
            if(!value){
                error.push(message);
                console.log(error);
            }else{
                item[field] = value;
            }
        }

        if(error.length > 0){
            error.reverse();
            error.forEach((m) => {
                errorEl = document.createElement('div')
                errorEl.className = 'alert alert-danger'
                errorEl.role = 'alert'
                errorEl.append(`${m}`)
                console.log(errorEl);
                frmRegist.prepend(errorEl)
            })
        }

        //initialMovie.add(item)
    });
});