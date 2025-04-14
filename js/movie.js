const movie = {
    items: [], // 감상평 목록
    tpl: null, // 감상편 목록을 추가할때 사용할 템플릿

    // 템플릿 가져오기
    init() {
        this.accordionId = document.getElementById("accordionId").innerHTML;

        // 저장된 감상평 목록 조회

        const data = localStorage.getItem("movies");
        this.items = data ? JSON.parse(data) : [];
        console.log("items", this.items);

        // 감상평 목록 출력
        this.render();
    },


    // 삭제 처리
    add(item) {

        this.items.push(item);
        console.log(this.items);
        this.render();
        this.save();

    },


    // 삭제 처리
    remove(seq) {
        const index = this.items.findIndex(item => item.seq === seq);
        if (index === -1) return;
        this.items.splice(index, 1);
        this.render();
        this.save();
    },

    // render 정의

    render() {
        const targetEl = document.getElementById("review-items");
        const domParser = new DOMParser();

        targetEl.innerHTML = `
        <div class="d-flex justify-content-center mt-5 mb-10">
            <div class="spinner-border text-dark" role="status">
                <span class="visually-hidden"> 등록된 스케쥴을 조회하고 있습니다. 
                </span>
            </div>
        </div>`;

        if (this.items.length === 0) {
            setTimeout(() => {
                targetEl.innerHTML = `
                <div class="alert alert-warning" role="alert">
                    등록된 스케쥴이 없습니다.
                </div>`;
            }, 1500);
            return
        }

        setTimeout(() => {
            targetEl.innerHTML = '';
            this.items.forEach(({seq,title,content}) => {
                let html = movie.accordionId

                html = html.replace(/#{seq}/g, seq)
                           .replace(/{#title}/g,title)
                           .replace(/#{content}/g,content);
                const dom = domParser.parseFromString(html, "text/html");
                const el = dom.querySelector(".accordion-item");
                targetEl.append(el);

                // 삭제 버튼 클릭 처리
                const removeEl = el.querySelector(".remove");
                removeEl.addEventListener("click", () => {
                    if (confirm("리뷰를 삭제합니다.")) {
                        this.remove(seq);
                    }
                });
            });
        }, 1500);
    },
    save() {
        const data = JSON.stringify(this.items);
        localStorage.setItem("movies", data);
    }

}
const item = [];
window.addEventListener('DOMContentLoaded', 
function(){
    movie.init();
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
            } else {
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

        movie.add(item)
    });
});
