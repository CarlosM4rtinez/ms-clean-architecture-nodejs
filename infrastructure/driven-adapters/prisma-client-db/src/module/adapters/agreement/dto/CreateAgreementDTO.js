export default class CreateAgreementDTO {

    constructor (agreementModel) {
        this.numero = agreementModel.number;
        this.nombre = agreementModel.name; 
        this.razon_social = agreementModel.companyName;
        this.codigo_sector = agreementModel.sectorCode;
        this.tipo_codigo_sector = agreementModel.typeSectorCode;
        this.codigo_base_calculo = agreementModel.calculationBaseCode;
        this.tipo_amortizacion = agreementModel.typeAmortization;
        this.calculator = agreementModel.calculator;
        this.provider_capacity = agreementModel.providerCapacity;
        this.codigo_csb = agreementModel.codeCsb;
        this.nombre_csb = agreementModel.nameCsb;
        this.empresa = agreementModel.company;
        this.convenio_id = agreementModel.agreementIdentifier;
        this.firma_promotor = agreementModel.signaturePromoter;
        this.videoTask = agreementModel.videoTask;
        this.signatureColor = agreementModel.signatureColor;
    }

}