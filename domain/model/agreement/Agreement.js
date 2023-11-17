export default class Agreement {

    constructor(data) {
        this.number = data.number;
        this.name = data.name; 
        this.companyName = data.companyName;
        this.sectorCode = data.sectorCode;
        this.typeSectorCode = data.typeSectorCode;
        this.calculationBaseCode = data.calculationBaseCode;
        this.typeAmortization = data.typeAmortization;
        this.calculator = data.calculator;
        this.providerCapacity = data.providerCapacity;
        this.codeCsb = data.codeCsb;
        this.nameCsb = data.nameCsb;
        this.createdAt = data.createdAt;
        this.updatedAt = data.updatedAt;
        this.company = data.company;
        this.agreementIdentifier = data.agreementIdentifier;
        this.signaturePromoter = data.signaturePromoter;
        this.videoTask = data.videoTask;
        this.signatureColor = data.signatureColor;
    }

    setId(id){
        this.id = id;
    }
}