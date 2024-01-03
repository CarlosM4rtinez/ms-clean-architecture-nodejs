export default class DocumentField {

    constructor(data) {
        this.id = data?.id;
        this.document = data?.document;
        this.field = data?.field;
        this.special = data?.special;
        this.skip = data?.skip;
        this.channel = data?.channel;
        this.input = data?.input;
        this.order = data?.order;
        this.typeFile = data?.typeFile;
        this.isRequired = data?.isRequired;
    }

    getId() {
        return this.id;
    }

}