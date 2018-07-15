export default {
    port: process.env.PORT || process.env.SERVER_PORT || 3000,
    mongodb_uri: process.env.MONGODB_URI || 'mongodb://localhost/coeliac',
    enc_salt: process.env.ENC_SALT || 'rbodVEdDdgoEVdgqcdl8DF8DvgS2L',
    enc_algorithm: process.env.ENC_ALGO || 'sha256',
    jwt_secret: process.env.JWT_SECRET || 'aucEfbBVoDoolFDl3J9TeiE83f7',
    jwt_algorithm: process.env.JWT_ALGO || 'HS256',
    jwt_expires_in: process.env.JWT_EXPIRES_IN || '7d'
}
