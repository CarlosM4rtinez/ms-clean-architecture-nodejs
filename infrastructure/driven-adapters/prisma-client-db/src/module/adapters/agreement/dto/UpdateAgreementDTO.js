export default class UpdateAgreementDTO {

    constructor(data){
        this.numero = data.number;
        this.nombre = data.name; 
        this.razon_social = data.companyName;
        this.codigo_sector = data.sectorCode;
        this.tipo_codigo_sector = data.typeSectorCode;
        this.codigo_base_calculo = data.calculationBaseCode;
        this.tipo_amortizacion = data.typeAmortization;
        this.calculator = data.calculator;
        this.provider_capacity = data.providerCapacity;
        this.codigo_csb = data.codeCsb;
        this.nombre_csb = data.nameCsb;
        this.empresa = data.company;
        this.convenio_id = data.agreementIdentifier;
        this.firma_promotor = data.signaturePromoter;
        this.videoTask = data.videoTask;
        this.signatureColor = data.signatureColor;
    }


}