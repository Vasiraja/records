



function adding() {
    //      const result = rest.reduce((prev,item)=>{
    //     return item+prev;
    //   },0)
    let rest: any[] = [3, 4, 5, 2]
    let sum = 0;




    for (let i = 0; i < rest.length; i++) {
       sum = rest[i] + sum;
    }

      return sum;
}


console.log(adding());

