module.exports.checkCommandModule = (cmdName, cmdModule) => {

    if (!cmdModule.hasOwnProperty('name'))
        throw new Error(`${cmdName} command module does not have property 'name'`);

    if (!cmdModule.hasOwnProperty('category'))
        throw new Error(`${cmdName} command module does not have property 'category'`);

    if (!cmdModule.hasOwnProperty('description'))
        throw new Error(`${cmdName} command module does not have property 'description'`);

    if (!cmdModule.hasOwnProperty('run'))
        throw new Error(`${cmdName} command module does not have property 'run'`);

    return true;

}

////////////////

module.exports.checkProperties = (cmdName, cmdModule) => {

    if (typeof cmdModule.name !== 'string')
        throw new Error(`${cmdName} command: name must be a function`);

    if (!['Public', 'Moderation'].includes(cmdModule.category))
        throw new Error(`${cmdName} command: category must be 'Moderation' or 'Public'`);

    if (typeof cmdModule.description !== 'string')
        throw new Error(`${cmdName} command: description must be a string`);

    if (typeof cmdModule.run !== 'function')
        throw new Error(`${cmdName} command: run must be a function`);

    return true;

}