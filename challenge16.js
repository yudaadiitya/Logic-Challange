class CarFactory {
    constructor(month) {
        this.month = month;
        this.random = Math.floor(Math.random() * (100 - 50)) + 50;
    }
}class Car extends CarFactory {
    constructor(month, year) {
        super(month);
        this.year = year;
    }
    garansi() {
        var result = this.year + Math.floor(Math.random() * (5 - 3)) + 3;
        let startBrio = new Brio();
        let startHRV = new HRV();
        let startCF = new CarFactory();
        console.log("");
        console.log(`Produksi bulan ${this.month} sebanyak ${startCF.random} unit`);
        console.log(`Mobil ${startBrio.brend} bergaransi sampai tahun ${result}`)
        console.log("Brend               : " + startBrio.brend);
        console.log("Merek Roda          : " + startBrio.tyre);
        console.log("Jumlah Tempat Duduk : " + startBrio.seat);
        console.log("Jumlah Pintu        : " + startBrio.door);
        console.log("");
        console.log(`Produksi bulan ${this.month} sebanyak ${startCF.random} unit`);
        console.log(`Mobil ${startHRV.brend} bergaransi sampai tahun ${result}`)
        console.log("Brend               : " + startHRV.brend);
        console.log("Merek Roda          : " + startHRV.tyre);
        console.log("Jumlah Tempat Duduk : " + startHRV.seat);
        console.log("Jumlah Pintu        : " + startHRV.door)
    }
}class tyre {
    constructor() {
        const tyreBrands = ['GT Radial', 'Bridgestone', 'Dunlop'];
        this.tyreBrand = tyreBrands[Math.floor(Math.random() * 3)]
    }
}class Brio extends Car {
    constructor() {
        super();
        this.tyre = new tyre().tyreBrand;
        this.seat = 4;
        this.door = 4;
        this.brend = "Brio"
    }
}class HRV extends Car {
    constructor() {
        super();
        this.tyre = new tyre().tyreBrand;
        this.seat = 6;
        this.door = 4;
        this.brend = "HR-V"
    }
}const l = new Car('Desember', 2018);
l.garansi();