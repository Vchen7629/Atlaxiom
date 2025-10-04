const { format } = require('date-fns')
const { v4: uuid } = require('uuid')
const fs = require('fs')
const fsPromises = require('fs').promises
const path = require('path')

const logEvents = async (message, logFileName) => {
    const dateTime = format(new Date(), 'yyyyMMdd\tHH:mm:ss')
    const logItem = `${dateTime}\t${uuid()}\t${message}\n`

    try {
        if (!fs.existsSync(path.join(__dirname, '..', 'logs'))) {
            await fsPromises.mkdir(path.join(__dirname, '..', 'logs')) /*this block of code synchronously checks to see if log file exists and if not it will make the file in the logs folder */
        }
        await fs.promises.appendFile(path.join(__dirname, '..', 'logs', logFileName), logItem) /*appending a new item to the log file */
    } catch (err) {
        console.error(err)
    }
}

const logger = (req, res, next) => {
    logEvents(`${req.method}\t${req.url}\t${req.headers.origin}`, 'LoggingData.log')
    next()
}

module.exports = { logEvents, logger}