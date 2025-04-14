const movie = {

    item: [],
    tpl: null,
    }

    add(item) 

        this.item.push(item);

       this.items((i1,i2) =>{
        const data1 = new Date(i1.data);
        const data2 = new Date(i2.date);
        console.log(date2.getTime() - date1.getTime());
        return date2.getTime() - date1.getTime();

       });
