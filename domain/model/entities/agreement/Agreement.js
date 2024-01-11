export default class Agreement {

    constructor(data) {
        this.id = data?.id;
        this.number = data?.number;
        this.name = data?.name;
        this.companyName = data?.companyName;
        this.sectorCode = data?.sectorCode;
        this.typeSectorCode = data?.typeSectorCode;
        this.calculationBaseCode = data?.calculationBaseCode;
        this.typeAmortization = data?.typeAmortization;
        this.calculator = data?.calculator;
        this.providerCapacity = data?.providerCapacity;
        this.codeCsb = data?.codeCsb;
        this.nameCsb = data?.nameCsb;
        this.createdAt = data?.createdAt;
        this.updatedAt = data?.updatedAt;
        this.company = data?.company;
        this.agreementIdentifier = data?.agreementIdentifier;
        this.signaturePromoter = data?.signaturePromoter || false;
        this.videoTask = data?.videoTask || false;
        this.signatureColor = data?.signatureColor || "#000000";
        this.documents = [];
    }

    setId(id) {
        this.id = id;
    }

    addDocuments(documents) {
        this.documents = documents;
    }
}