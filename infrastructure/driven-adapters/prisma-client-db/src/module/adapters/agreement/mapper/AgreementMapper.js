import Agreement from "../../../../../../../../domain/model/entities/agreement/Agreement.js";
import { dataToDomain as documentDataToDomain } from "../../document/mapper/DocumentMapper.js";

function dataToDomain(data) {
    return new Agreement({
        id: data.id,
        number: data.numero,
        name: data.nombre,
        companyName: data.razon_social,
        sectorCode: data.codigo_sector,
        typeSectorCode: data.tipo_codigo_sector,
        calculationBaseCode: data.codigo_base_calculo,
        typeAmortization: data.tipo_amortizacion,
        calculator: data.calculator,
        providerCapacity: data.provider_capacity,
        codeCsb: data.codigo_csb,
        nameCsb: data.nombre_csb,
        createdAt: data.created_at,
        updatedAt: data.updated_at,
        company: data.empresa,
        agreementIdentifier: data.convenio_id,
        signaturePromoter: data.firma_promotor,
        videoTask: data.videoTask,
        signatureColor: data.signatureColor
    });
}

function dataWithObjectsToDomain(data) {
    const documents = data.documents.map(agreementDocument => documentDataToDomain(agreementDocument.document));
    const agreement = dataToDomain(data);
    agreement.addDocuments(documents);
    return agreement;
}

function listToDomain(agreementsList) {
    return agreementsList.map(agreementData => {
        return dataToDomain(agreementData);
    });
}

export { dataToDomain, listToDomain, dataWithObjectsToDomain }