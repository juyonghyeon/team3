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