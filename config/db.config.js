module.exports = {
    sqlDb: {
        host: process.env.SERVER_HOST || 'localhost',
        dbUser : process.env.DB_USER || 'root',
        dbPassword : process.env.DB_PASSWORD || '',
        dbName : process.env.DB_NAME || 'hotelbooking'
    },
    jwtOption: {
        secret: 'ausad4dcas68cas68c165cs546sadf46sd5f4s6d5s6df541s61sdc8sd64sa4r8g4dsfbciksahdkajsdfas',
        expiresIn: '45d'
    },
    serverAuth:{
        secret:'0a68s4d65sad6savdfbhhgtrf6579d8as74f154dsa21x65dds4fa7580'
    },
    otpAuth:"5a880a64-bc72-11ea-9fa5-0200cd936042",
    
};