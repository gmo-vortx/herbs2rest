const assert = require('assert')
const request = require('supertest')

const { Ok, step, usecase } = require('@herbsjs/buchu')
const express = require('express')

const generateRoutes = require('../src/generateRoutes')

describe('Herbs2Rest - Generate Routes', () => {
  const usecaseTest = () =>
    usecase('Test usecase', {
      request: {},
      authorize: async _ => Ok(),
      'Test step': step(_ => Ok())
    })

  it('Should resolve and create a get all route', (done) => {
    // Given
    const app = express()
    const routes = new express.Router()

    const controllerList = [
      {
        name: 'lists',
        getAll: { usecase: usecaseTest }
      },
    ]

    // When
    generateRoutes(controllerList, routes)

    // Then
    request(app.use(routes))
      .get('/lists')
      .expect(200, done)
  })

  it('Should resolve and create a get by id route', (done) => {
    // Given
    const app = express()
    const routes = new express.Router()

    const controllerList = [
      {
        name: 'lists',
        getById: { usecase: usecaseTest }
      },
    ]

    // When
    generateRoutes(controllerList, routes)

    // Then
    request(app.use(routes))
      .get('/lists/1')
      .expect(200, done)
  }),

  it('Should resolve and create a post route', (done) => {
    // Given
    const app = express()
    const routes = new express.Router()

    const controllerList = [
      {
        name: 'lists',
        post: { usecase: usecaseTest }
      },
    ]

    // When
    generateRoutes(controllerList, routes)

    // Then
    request(app.use(routes))
      .post('/lists')
      .expect(200, done)
  }),

  it('Should resolve and create a put route', (done) => {
    // Given
    const app = express()
    const routes = new express.Router()

    const controllerList = [
      {
        name: 'lists',
        put: { usecase: usecaseTest }
      },
    ]

    // When
    generateRoutes(controllerList, routes)

    // Then
    request(app.use(routes))
      .put('/lists/1')
      .expect(200, done)
  }),

  it('Should resolve and create a delete route', (done) => {
    // Given
    const app = express()
    const routes = new express.Router()

    const controllerList = [
      {
        name: 'lists',
        delete: { usecase: usecaseTest }
      },
    ]

    // When
    generateRoutes(controllerList, routes)

    // Then
    request(app.use(routes))
      .del('/lists/1')
      .expect(200, done)
  })

  it('Should throw a JavascriptError if controllersList is null', () => {
    assert.rejects(() => generateRoutes(null, routes))
  })
})
