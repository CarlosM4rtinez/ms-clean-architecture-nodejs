class AddGeolocationRequestDTO {

    applicationId;
    bpId;
    operationType;
    channel;
    date;
    hour;
    latitud;
    longitud;
    deviceInfo;
    customFields;
    type;

    constructor(data){
        this.applicationId = data.applicationId;
        this.bpId = data.bpId;
        this.operationType = data.operationType;
        this.channel = data.channel;
        this.date = data.date;
        this.hour = data.hour;
        this.latitud = data.latitud;
        this.longitud = data.longitud;
        this.deviceInfo = data.deviceInfo;
        this.customFields = data.customFields;
        this.type = data.type;
    }

}