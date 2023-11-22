import Field from "../../../../../../../../domain/model/entities/field/Field.js";

function dataToDomain(data) {
    return new Field({
        id: data.id,
        name: data.name,
        technicalName: data.technicalName,
        classification: data.clasification,
        type: data.type,
        required: data.required,
        isCNCA: data.isCNCA,
        max: data.maxisLCOM,
        isLCOM: data.isLCOM,
        isSpecial: data.isSpecial,
        isClient: data.isClient,
        convertTo: data.convertTo,
        dateCreated: data.created_at,
        dateUpdated: data.updated_at
    });
}

function listToDomain(fieldsList) {
    return fieldsList.map(fieldData => {
        return dataToDomain(fieldData);
    });
}

export { dataToDomain, listToDomain }