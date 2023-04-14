const defaultConvention = {
    /**
     * Create an Express controller for a endpoint based on a use case and its metadata.
     * @param {Object} options
     * @param {Function} options.usecase - Use case to be called by the controller
     * @param {Object} options.parameters - Parameters of the use case. It is used to extract parameters from request
     * @param {Function} options.parametersHandler - Function to extract parameters from request
     * @param {Function} options.authorizationHandler - Function to extract authorization info from request
     * @param {Function} options.controller - Function to handle the response
     * @param {String} options.method - HTTP method
     * @param {String} options.path - Path of the endpoint
     * @returns {Function} - Express controller
     */
    expressController: ({ usecase, parameters, parametersHandler, authorizationHandler, controller, method, path }) => {
        return async (req, res, next) => {
            const authorizationInfo = authorizationHandler(req)
            const request = parametersHandler(req, parameters)
            return await controller({ usecase, request, authorizationInfo, res, next, method, path })
        }
    }
}

/**
 * Generate Express endpoints from use cases metadata
 * @param {herbarium} options.herbarium - Herbarium instance containing the use cases with the REST metadata populated
 * @param {Object} options.server - Express server
 * @param {Object} options.convention - Convention to be used to generate the endpoints
 */
function generateEndpoints({ herbarium, server, convention = defaultConvention }) {

    const endpoints = []
    for (let uc of herbarium.usecases.all) {
        const [ucName, info] = uc
        const REST = info.REST

        // if REST is empty, it means that the use case is not intended to be used as a REST endpoint
        if (!REST || Object.keys(REST).length === 0) continue

        // REST metadata must be an array
        if (!Array.isArray(REST)) throw new Error(`'REST' metadata must be an array. It is not possible to generate a REST endpoint for usecase ${ucName}.`)

        for (let metadata of REST) {
            // if metadata is empty, ignore it
            if (!metadata || Object.keys(metadata).length === 0) continue

            const { method, path, parameters } = metadata
            const usecase = info.usecase
            if (!method) throw new Error(`'method' metadata is required. It is not possible to generate a REST endpoint for usecase ${ucName}.`)
            if (!path) throw new Error(`'path' metadata is required. It is not possible to generate a REST endpoint for usecase ${ucName}.`)
            if (!parameters) throw new Error(`'parameters' metadata is required. It is not possible to generate a REST endpoint for usecase ${ucName}.`)

            const paramsHandler = metadata.parametersHandler || parametersHandler
            if (!paramsHandler) throw new Error(`'parametersHandler' metadata is required. It is not possible to generate a REST endpoint for usecase ${ucName}.`)

            const authorizationHandler = metadata.authorizationHandler
            if (!authorizationHandler) throw new Error(`'authorizationHandler' metadata is required. It is not possible to generate a REST endpoint for usecase ${ucName}.`)

            const ctlr = metadata.controller
            if (!ctlr) throw new Error(`'controller' metadata is required. It is not possible to generate a REST endpoint for usecase ${ucName}.`)

            // does not allow to generate an endpoint for the same path and method
            const endpoint = endpoints.find(ep => ep.method === method && ep.path === path)
            if (endpoint) throw new Error(`It is not possible to generate a REST endpoint for usecase '${ucName}'. There is already an endpoint for method ${method} and path ${path} generated by usecase '${endpoint.ucName}'.`)
            endpoints.push({ ucName, method, path })

            const expressController = convention.expressController({ usecase, parameters, parametersHandler: paramsHandler, authorizationHandler, controller: ctlr, method, path })

            if (method === 'GET') server.get(path, expressController)
            if (method === 'POST') server.post(path, expressController)
            if (method === 'PUT') server.put(path, expressController)
            if (method === 'DELETE') server.delete(path, expressController)
        }
    }
}

generateEndpoints.convention = defaultConvention

module.exports = { generateEndpoints }