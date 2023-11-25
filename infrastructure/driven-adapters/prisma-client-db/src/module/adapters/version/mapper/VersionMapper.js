import Version from "../../../../../../../../domain/model/entities/version/Version.js";

function dataToDomain(data) {
    return new Version({
        id: data.id,
        version: data.version,
        agreement: data.agreement,
        dateCreated: data.created_at,
        dateUpdated: data.updated_at
    });
}

function listToDomain(list) {
    return list.map(data => {
        return dataToDomain(data);
    });
}

export { dataToDomain, listToDomain }