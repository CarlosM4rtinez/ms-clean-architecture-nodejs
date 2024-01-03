import DocumentField from "../../../../../../../../domain/model/entities/document_field/DocumentField.js";

function dataToDomain(data) {
    return new DocumentField({
        id: data?.id,
        document: data?.document,
        field: data?.field,
        special: data?.special,
        skip: data?.skip,
        channel: data?.channel,
        input: data?.input,
        order: data?.order,
        typeFile: data?.typeFile,
        isRequired: data?.isRequired
    });
}

function listToDomain(documentFieldsList) {
    return documentFieldsList.map(documentField => {
        return dataToDomain(documentField);
    });
}

export { dataToDomain, listToDomain }