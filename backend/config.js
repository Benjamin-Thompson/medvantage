let environment = ''
let MYSQL_CONNECTION = {
    HOST: '35.185.212.150',
    USER: 'root',
    PASSWORD: 'mdv!!SQL123',
    DATABASE: 'medvantage',
    TOKEN_SECRET: process.env.TOKEN_SECRET || 'CAMMYC@M!STHEMA$$$',
    GOOGLE_SECRET: process.env.GOOGLE_SECRET || 'cWsB8iAwFMrpwRXS9sl8coB0',
    FILE_LOCATION: ''   
}
if (environment == 'DEVELOPMENT') {
    MYSQL_CONNECTION.PASSWORD = 'mdv!!SQL123';
    MYSQL_CONNECTION.FILE_LOCATION = 'D:\Downloads';
}
else {
    MYSQL_CONNECTION.PASSWORD = 'mdv!!SQL123';
    MYSQL_CONNECTION.FILE_LOCATION = '/home/dev/projects/downloads';    
}
module.exports = MYSQL_CONNECTION;
