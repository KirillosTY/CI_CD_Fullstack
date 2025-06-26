const info = (...parameters) => {
    if (process.env.NODE_ENV !== 'test') { 
        console.log(...parameters)
    }
}

const error = (...parameters) =>  {
    if (process.env.NODE_ENV !== 'test') { 
        console.log(...parameters)
    }
}

module.exports = {
    info,
    error
}