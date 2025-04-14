const movie = {
    items: [], // 감상평 목록
    tpl: null, // 감상편 목록을 추가할때 사용할 템플릿
    add(item) {

        this.item.push(item);

        this.items((i1,i2) =>{
        const data1 = new Date(i1.data);
        const data2 = new Date(i2.date);
        console.log(date2.getTime() - date1.getTime());
        return date2.getTime() - date1.getTime();
        });
     },
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

    // 저장 처리


    // 삭제 처리


    // render 정의

    render() {
        const targetEl = document.getElementById("accordionExample");
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
                let html = initialMovie.accordionId

                html = html.replace(/#{seq}/g, seq)
                           .replace(/{#title}/g,title)
                           .replace(/#{content}/g,content);
                const dom = domParser.parseFromString(html, "text/html");
                const el = dom.querySelector(".accordion-item");
                targetEl.append(el);

                // 삭제 버튼 클릭 처리
                const removeEl = el.querySelector(".remove");
                removeEl.addEventListener("click", () => {
                    if (confirm("리뷰를 삭제합니다.")) {this.remove(seq);
                    }
                });
            });
        }, 1500);
    },


}
