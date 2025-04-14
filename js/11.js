const todo = {
    items: [], // 스케줄 목록
    tpl: null, // 목록 템플릿,
    /**
     * 로드 초기에 실행될 부분 정의
     *
     * 1. 목록 템플릿 가져오기
     * 2. localStorage에 저장된 todos 항목 내용을 this.items에 업데이트 해주고
     * 3. 스케줄 목록 출력
     */
    init() {
      // 목록 템플릿 가져오기
      this.tpl = document.getElementById('tpl').innerHTML
  
      const data = localStorage.getItem('todos')
      this.items = data ? JSON.parse(data) : []
  
      // 스케줄 목록 출력
      this.render()
    },
  
    /**
     * 스케줄 등록 처리
     *
     * @param {*} data : 등록 양식 데이터, date 날짜, title 제목, content: 내용
     *
     */
    add(item) {
  
      this.items.push(item)
      
      // 스케줄 목록 날짜별 내림 차순으로 정렬 처리
      if (this.items.length > 0) {
        this.items.sort((i1, i2) => {
          const date1 = new Date(i1.date)
          const date2 = new Date(i2.date)
          return date2 - date1
        })
      }
  
      this.save() // 변경 사항 저장 처리
  
      // 목록 갱신
      this.render()
    },
  
    /**
     * 스케줄 제거 처리
     *
     * @param {*} seq : 등록 번호
     */
    remove(seq) {
      // 등록된 seq번호를 찾아서 등록된 스케줄 제거
      const index = this.items.findIndex((item) => item.seq === seq)
      if (index !== -1) {
        this.items.splice(index, 1)
        this.save()
      }
  
      // 목록 갱신
      this.render()
    },
  
    /**
     * 스케줄 저장 처리
     *
     *   this.items에 저장된 내용을
     *   localStorage를 이용하여 todos 항목으로 json 문자열로 변환하여 저장
     *
     */
    save() {
      const data = JSON.stringify(this.items)
      localStorage.setItem('todos', data)
    },
    /**
     * 스케줄 목록 갱신 처리
     *
     */
    render() {
      const targetEl = document.getElementById('schdule-items')
      targetEl.innerHTML = `<div class="spinner d-flex justify-content-center mt-5 mb-10">
                      <div class="spinner-grow text-success" role="status">
                          <span class="visually-hidden">등록된 스케줄을 조회하고 있습니다.</span>
                      </div>
                  </div>`
  
      if (this.items.length === 0) {
        setTimeout(() => {
          targetEl.innerHTML = `<div class="alert alert-warning" role="alert">등록된 스케줄이 없습니다.</div>`
        }, 1500)
        return
      }
  
      const domParser = new DOMParser()
      setTimeout(() => {
        targetEl.innerHTML = ''
  
        this.items.forEach(({ seq, date, title, content }) => {
          let html = todo.tpl
          html = html
            .replace(/#{seq}/g, seq)
            .replace(/#{date}/g, date)
            .replace(/#{title}/g, title)
            .replace(/#{content}/g, content)
          const dom = domParser.parseFromString(html, 'text/html')
          const el = dom.querySelector('div')
          targetEl.append(el)
  
          // 삭제 버튼 이벤트 처리 S
          const removeEl = el.querySelector('.remove')
          removeEl.addEventListener('click', () => {
            if (confirm('정말 삭제하겠습니까?')) {
              this.remove(seq)
            }
          })
          // 삭제 버튼 이벤트 처리 E
        })
      }, 1500)
    },
  }
  
  window.addEventListener('DOMContentLoaded', function () {
    const quill = new Quill('#todo-content', {
      theme: 'bubble',
    })
  
    // 스케줄 목록 불러오기
    todo.init()
  
    /**
     * 스케줄 등록 처리
     *
     */
    frmRegist.addEventListener('submit', function (e) {
      e.preventDefault() // 기본 동작 차단
  
      /**
       * 유효성 검사 -  필수항목 (날짜, 제목, 내용)
       */
      const requiredFields = {
        date: '날짜를 입력하세요.',
        title: '제목을 입력하세요.',
      }
      const errors = [],
        item = { seq: Date.now() }
  
      // 에러메시지 초기화
      let errorEls = frmRegist.querySelectorAll('.alert')
      if (errorEls.length > 0) {
        errorEls.forEach((errorEl) => errorEl.parentElement.removeChild(errorEl))
      }
  
      for (const [field, message] of Object.entries(requiredFields)) {
        const value =
          typeof frmRegist[field].value === 'string'
            ? frmRegist[field].value?.trim()
            : ''
        if (!value) {
          errors.push(message)
        } else {
          item[field] = value
        }
      }
  
      if (!quill.getText().trim()) {
        errors.push('내용을 입력하세요.')
      } else {
        item.content = quill.root.innerHTML.trim()
      }
  
      // 검증실패한 경우 에러메세지 출력 및 실행 중단
      if (errors.length > 0) {
        errors.reverse()
        errors.forEach((m) => {
          errorEl = document.createElement('div')
          errorEl.className = 'alert alert-danger'
          errorEl.role = 'alert'
          errorEl.append(`${m}`)
          frmRegist.prepend(errorEl)
        })
        return
      }
      // 유효성 검사 E
  
      // 검증 성공한 경우 등록 처리
      todo.add(item)
  
      // 등록 완료 후 초기화
      quill.root.innerHTML = ''
      frmRegist.title.value = ''
      frmRegist.date.value = ''
    })
  })