function* funcionYield(){
    i = 0;
    while(true){
        yield i +=1
    }
}
const fy = funcionYield()
console.log(fy)
for(let i = 0; i<=10; i++){
    console.log(fy.next().value);
}