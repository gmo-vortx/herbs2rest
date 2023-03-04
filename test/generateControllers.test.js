const assert = require('assert')
const request = require('supertest')

const { Ok, step, usecase, entity, field } = require('@herbsjs/herbs')
const express = require('express')

const { herbarium } = require('@herbsjs/herbarium')
const generateRoutes = require('../src/generateRoutes')
const generateControllers = require('../src/generateControllers')

describe('Herbs2Rest - Generate Routes With Herbarium', () => {

  const Test =
    entity('Test', {
      id: field(Number, { isId: true })
    })

  const crudOperation = (param) => () => usecase(`${param} Usecase`, {
    request: {},
    authorize: async _ => Ok(),
    'Test step': step(_ => Ok())
  })

  const usecaseTest = () => {
    herbarium.requireAll({})

    herbarium.entities
      .add(Test, 'Test')

    herbarium.usecases
      .add(crudOperation('Read'), 'ReadUsecase')
      .metadata({ group: 'Test', operation: herbarium.crud.read, entity: Test })

    herbarium.usecases
      .add(crudOperation('Create'), 'CreateUsecase')
      .metadata({ group: 'Test', operation: herbarium.crud.create, entity: Test })

    herbarium.usecases
      .add(crudOperation('Update'), 'UpdateUsecase')
      .metadata({ group: 'Test', operation: herbarium.crud.update, entity: Test })

    herbarium.usecases
      .add(crudOperation('Delete'), 'DeleteUsecase')
      .metadata({ group: 'Test', operation: herbarium.crud.delete, entity: Test })

    herbarium.usecases
      .add(crudOperation('Other'), 'ReadAllCustomUsecase')
      .metadata({ group: 'Test', operation: herbarium.crud.other, entity: Test })
  }

  beforeEach(() => usecaseTest())

  it('Should return 404 error without a getAll route', (done) => {
    // Given
    const app = express()
    const routes = new express.Router()

    const controllers = generateControllers({ herbarium })

    // When
    generateRoutes(controllers, routes, true)

    // Then
    request(app.use(routes))
      .get('/test')
      .expect(404, done)
  })

  it('Should resolve and create a get all route after add inside Herbarium usecase list', (done) => {
    // Given
    const app = express()
    const routes = new express.Router()

    herbarium.usecases
      .add(crudOperation('ReadAll'), 'ReadAllUsecase')
      .metadata({ group: 'Test', operation: herbarium.crud.readAll, entity: Test })

    const controllers = generateControllers({ herbarium })

    // When
    generateRoutes(controllers, routes, true)

    // Then
    request(app.use(routes))
      .get('/test')
      .expect(200, done)
  })

  it('Should resolve and create a get by id route', (done) => {
    // Given
    const app = express()
    const routes = new express.Router()
    const controllers = generateControllers({ herbarium })

    // When
    generateRoutes(controllers, routes, true)

    // Then
    request(app.use(routes))
      .get('/test/1')
      .expect(200, done)
  }),

    it('Should resolve and create a post route', (done) => {
      // Given
      const app = express()
      const routes = new express.Router()
      const controllers = generateControllers({ herbarium })

      // When
      generateRoutes(controllers, routes, true)

      // Then
      request(app.use(routes))
        .post('/test')
        .expect(200, done)
    }),

    it('Should resolve and create a put route', (done) => {
      // Given
      const app = express()
      const routes = new express.Router()
      const controllers = generateControllers({ herbarium })

      // When
      generateRoutes(controllers, routes, true)

      // Then
      request(app.use(routes))
        .put('/test/1')
        .expect(200, done)
    }),

    it('Should resolve and create a delete route', (done) => {
      // Given
      const app = express()
      const routes = new express.Router()
      const controllers = generateControllers({ herbarium })

      // When
      generateRoutes(controllers, routes, true)

      // Then
      request(app.use(routes))
        .del('/test/1')
        .expect(200, done)
    })

  it('Should throw a JavascriptError if controllersList is null', () => {
    assert.rejects(() => generateRoutes(null, routes))
  })
})

describe('Herbs2Rest - Generate Custom Routes With Herbarium', () => {
  const Test =
    entity('Test', {
      id: field(Number, { isId: true })
    })

  const crudOperation = (param) => () => usecase(`${param} Usecase`, {
    request: {},
    authorize: async _ => Ok(),
    'Test step': step(_ => Ok())
  })

  const usecaseTest = () => {
    herbarium.requireAll({})

    herbarium.entities
      .add(Test, 'Test')

    herbarium.usecases
      .add(crudOperation('Read'), 'ReadUsecase')
      .metadata({
        group: 'Test', operation: herbarium.crud.read, entity: Test,
        REST: {
          path: '/customgetbyid/:id',
        }
      })

    herbarium.usecases
      .add(crudOperation('ReadAll'), 'ReadAllUsecase')
      .metadata({
        group: 'Test', operation: herbarium.crud.readAll, entity: Test,
        REST: {
          path: '/customget',
        }
      })

    herbarium.usecases
      .add(crudOperation('Create'), 'CreateUsecase')
      .metadata({ group: 'Test', operation: herbarium.crud.create, entity: Test })

    herbarium.usecases
      .add(crudOperation('Update'), 'UpdateUsecase')
      .metadata({
        group: 'Test', operation: herbarium.crud.update, entity: Test, REST: {
          path: '/customput'
        }
      })

    herbarium.usecases
      .add(crudOperation('Delete'), 'DeleteUsecase')
      .metadata({
        group: 'Test', operation: herbarium.crud.delete, entity: Test,
        REST: {
          path: '/customdeletebyid/:id'
        }
      })
  }

  beforeEach(() => usecaseTest())

  it('Should resolve and create a custom get by id route after add inside Herbarium usecase list', (done) => {
    // Given
    const app = express()
    const routes = new express.Router()

    const controllers = generateControllers({ herbarium })

    // When
    generateRoutes(controllers, routes, true)

    // Then
    request(app.use(routes))
      .get('/customgetbyid/1')
      .expect(200, done)
  })

  it('Should resolve and create a custom post route', (done) => {
    // Given
    const app = express()
    const routes = new express.Router()
    const controllers = generateControllers({ herbarium })

    // When
    generateRoutes(controllers, routes, true)

    // Then
    request(app.use(routes))
      .post('/test')
      .expect(200, done)
  })

  it('Should resolve and create a custom get all route', (done) => {
    // Given
    const app = express()
    const routes = new express.Router()

    const controllers = generateControllers({ herbarium })

    // When
    generateRoutes(controllers, routes, true)

    // Then
    request(app.use(routes))
      .get('/customget')
      .expect(200, done)
  })

  it('Should resolve and create a custom put route', (done) => {
    // Given
    const app = express()
    const routes = new express.Router()

    const controllers = generateControllers({ herbarium })

    // When
    generateRoutes(controllers, routes, true)

    // Then
    request(app.use(routes))
      .put('/customput')
      .expect(200, done)
  })

  it('Should resolve and create a custom delete route', (done) => {
    // Given
    const app = express()
    const routes = new express.Router()

    const controllers = generateControllers({ herbarium })

    // When
    generateRoutes(controllers, routes, true)

    // Then
    request(app.use(routes))
      .delete('/customdeletebyid/1')
      .expect(200, done)
  })

  it('Should resolve and create a custom other route', (done) => {
    // Given
    const app = express()
    const routes = new express.Router()

    herbarium.usecases
      .add(crudOperation('Other'), 'OtherCustomUsecase')
      .metadata({
        group: 'Test', operation: herbarium.crud.other, entity: Test,
        REST: {
          path: '/other', verb: 'GET'
        }
      })

    const controllers = generateControllers({ herbarium })

    // When
    generateRoutes(controllers, routes, true)

    // Then
    request(app.use(routes))
      .get('/other')
      .expect(200, done)
  })

  it('Should resolve and create a custom other route with default verb', (done) => {
    // Given
    const app = express()
    const routes = new express.Router()

    herbarium.usecases
      .add(crudOperation('Other'), 'OtherCustomUsecase')
      .metadata({
        group: 'Test', operation: herbarium.crud.other, entity: Test,
        REST: {
          path: '/defaultother',
        }
      })

    const controllers = generateControllers({ herbarium })

    // When
    generateRoutes(controllers, routes, true)

    // Then
    request(app.use(routes))
      .post('/defaultother')
      .expect(200, done)
  })

  it('Should resolve and create a custom other route with resourceName', (done) => {
    // Given
    const app = express()
    const routes = new express.Router()

    herbarium.usecases
      .add(crudOperation('Other'), 'OtherCustomUsecaseResource')
      .metadata({
        group: 'Test', operation: herbarium.crud.other, entity: Test,
        REST: {
          resourceName: 'testresourcename',
        }
      })

    const controllers = generateControllers({ herbarium })

    // When
    generateRoutes(controllers, routes, true)

    // Then
    request(app.use(routes))
      .post('/testresourcename')
      .expect(200, done)
  })

  it('Should resolve and create a custom other route without a group', (done) => {
    // Given
    const app = express()
    const routes = new express.Router()

    herbarium.usecases
      .add(crudOperation('Other'), 'UsecaseWithoutGroup')
      .metadata({
        operation: herbarium.crud.other, entity: Test,
        REST: {
          path: '/usecasewithoutgroup',
        }
      })

    const controllers = generateControllers({ herbarium })

    // When
    generateRoutes(controllers, routes, true)

    // Then
    request(app.use(routes))
      .post('/usecasewithoutgroup')
      .expect(200, done)
  })
})
