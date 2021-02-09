class CarFactory {
    constructor(month) {
        this.month = month;
        this.crvrandom = Math.floor(Math.random() * (100 - 30)) + 30;
        this.xpanderrandom = Math.floor(Math.random() * (100 - 50)) + 50;
    }
}
class Car extends CarFactory {
    constructor(month, year) {
        super(month);
        this.year = year;
    }
    garansi() {
        var crvWarranty = this.year + Math.floor(Math.random() * (7 - 3)) + 3;
        var xpanderWarranty = this.year + Math.floor(Math.random() * (6 - 2)) + 2;
        let newCrv = new Crv();
        let newXpander = new Xpander();
        let newCF = new CarFactory();
        console.log("================================================");
        console.log(`Produksi Mobil ${newCrv.name} pada bulan ${this.month} sebanyak ${newCF.crvrandom} unit`);
        console.log(`Mobil ${newCrv.name} bergaransi sampai tahun ${crvWarranty}`)
        console.log(`----------------SPESIFIKASI MOBIL------------------`);
        console.log(`Nama Mobil          : ${newCrv.name}`);
        console.log(`Merek Ban           : ${newCrv.tyre}`);
        console.log(`Jumlah Tempat Duduk : ${newCrv.seat}`);
        console.log(`Jumlah Pintu        : ${newCrv.door}`);
        console.log(`Tenaga              : ${newCrv.power}`);
        console.log(`Mesin               : ${newCrv.engine}`);
        console.log(`Transmisi           : ${newCrv.transmission}`);
        console.log("================================================");
        console.log(`Produksi Mobil ${newXpander.name} pada bulan ${this.month} sebanyak ${newCF.xpanderrandom} unit`);
        console.log(`Mobil ${newXpander.name} bergaransi sampai tahun ${xpanderWarranty}`)
        console.log(`----------------SPESIFIKASI MOBIL------------------`);
        console.log("Nama Mobil          : " + newXpander.name);
        console.log("Merek Ban           : " + newXpander.tyre);
        console.log("Jumlah Tempat Duduk : " + newXpander.seat);
        console.log("Jumlah Pintu        : " + newXpander.door);
        console.log("Tenaga              : " + newXpander.power);
        console.log("Mesin               : " + newXpander.engine);
        console.log("Transmisi           : " + newXpander.transmission);
    }
}
class SpecCar extends Car{
    constructor (name, door, seat, power, engine, warranty, transmission, tyre) {
        super()
        this.name = name;
        this.door = door;
        this.seat = seat;
        this.power = power;
        this.engine = engine;
        this.warranty = warranty;
        this.transmission = transmission;
        this.tyre = tyre;
    }
}
class Tyre {
    constructor () {
        this.crvTyre = 'Goodyear';
        this.xpanderTyre = 'Michelin';
    }
}

class Crv extends SpecCar {
    constructor() {
        super("Honda CR-V", 5, 5, '153 hp', '1997 cc', 3, 'CVT', new Tyre().crvTyre);
    }
}

class Xpander extends SpecCar {
    constructor() {
        super("Mitsubishi Xpander", 5, 7, '103 hp', '1499 cc', 2, 'Manual', new Tyre().xpanderTyre);
    }
}

const carProduct = new Car('Desember', 2018); // Masukan input ("Bulan", "Tahun")
carProduct.garansi();