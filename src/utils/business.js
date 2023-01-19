function parseBusiness(business) {
    if (Array.isArray(business)) {
        return business.map(b => ({ nombre: b.nombre, celular: b.celular, correo: b.correo }));
    }
    return { nombre: business.nombre, celular: business.celular, correo: business.correo };
}

module.exports = { parseBusiness };