import Document from "../../../../../../../../domain/model/entities/document/Document.js";

function dataToDomain(data) {
    return new Document({
        id: data.id,
        name: data.name,
        technicalName: data.technicalName,
        classification: data.clasification,
        isRequired: data.required,
        isVisible: data.visible,
        isSignature: data.isSignature,
        isExceptionProtocol: data.isProtocolExp,
        isSpecialDocument: data.isSpecialDocument,
        isAttachedDocument: data.isAnexoDocument,
        isLCOM: data.isLCOM,
        isPassport: data.isPassport,
        dateCreated: data.created_at,
        dateUpdated: data.updated_at,
    });
}

function listToDomain(documentsList) {
    return documentsList.map(documentData => {
        return dataToDomain(documentData);
    });
}

export { dataToDomain, listToDomain }