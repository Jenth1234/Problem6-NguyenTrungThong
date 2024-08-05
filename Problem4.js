const sum_to_n_a =(n) => {
    let sum = 0
    for(let i =0;i<=n;i++ ){
            sum+=i;
    }
        return sum;
}
console.log(sum_to_n_a(10))


const sum_to_n_b =(n) => {
    return (n * (n + 1)) / 2;
}
console.log(sum_to_n_b(10))


const sum_to_n_c =(n) => {
    if(n<1){
        return n
    }
    return n + sum_to_n_c(n-1)
}
console.log(sum_to_n_c(10))