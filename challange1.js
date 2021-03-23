function sum() {
    var hasil = 0;
    var i = 0;
    while (i < arguments.length){
        hasil += arguments[i];
        i++
    }
   
    console.log(hasil);
    }
            
sum(1,2,7);
sum(1,4);
sum(11);
sum(10,3,6,7,9);