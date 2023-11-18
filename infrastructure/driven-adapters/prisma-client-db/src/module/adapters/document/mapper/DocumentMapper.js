import Document from "../../../../../../../../domain/model/document/Document.js";

function dataToModel(data) {
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

function listToModel(documentsList) {
    return documentsList.map(documentData => {
        return dataToModel(documentData);
    });
}

export { dataToModel, listToModel }