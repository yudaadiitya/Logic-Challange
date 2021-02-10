class MesinHitung {
    constructor(){
        this.x = 1;        
    }
    add(num) {
        this.x += num;
        return this;
    }
    subtract(num) {
        this.x -= num;
        return this;
    }
    divide(num) {
        this.x /= num;
        return this;
    }
    multiply(num) {
        this.x *= num;
        return this;
    }
    exponent(y) {
        this.x = Math.pow (this.x, y);
        return this;
    }
    square() {
        return this.exponent(2);
    }
    squareRoot() {
        this.x = Math.sqrt (this.x);
        return this;
    }
    result() {
        console.log(this.x);
    }
    
}
const Pi = 22/7;
export {MesinHitung, Pi};