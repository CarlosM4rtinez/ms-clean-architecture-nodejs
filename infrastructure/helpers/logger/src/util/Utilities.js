function getHost() {
    return `http://localhost:${process.env.SERVER_PORT}`;
}

export { getHost }