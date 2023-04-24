# [4.1.0](https://github.com/herbsjs/herbs2rest/compare/v4.0.0...v4.1.0) (2023-04-24)


### Features

* **generateroutes.js:** verb and Path change ([303fdf5](https://github.com/herbsjs/herbs2rest/commit/303fdf5e6c10b0458b55b89cfee5b5d977ed9215))
* **generateroutes:** added default verb for usecases other ([01c4a6a](https://github.com/herbsjs/herbs2rest/commit/01c4a6ab23119e1a176d3498d3428fc2c65c7022))
* **generateroutes:** added support for custom resourceName ([61f3324](https://github.com/herbsjs/herbs2rest/commit/61f33248ba546614be9428a67ee6fc66363908c5))
* **generateroutes:** endpoint logic change and minor changes ([8cee0f7](https://github.com/herbsjs/herbs2rest/commit/8cee0f76bc91d60e346f5ce1ff6c9e08c8031db4))
* **generateroutes:** id field option should be passed by usecase in case of custom endpoint ([8c90860](https://github.com/herbsjs/herbs2rest/commit/8c908602e34af1cd77061b1bcb47e67f0037e2a0))
* **generateroutes:** others endpoints should have request ([4f20391](https://github.com/herbsjs/herbs2rest/commit/4f203913fc83a7a3f5e68cc5f20be3513238d04a))
* group custom endpoints and routes for crud.other ([dd1d20e](https://github.com/herbsjs/herbs2rest/commit/dd1d20ec356edb8fae1effa858b8a862f789597f))
* should customize REST endpoints ([61e8944](https://github.com/herbsjs/herbs2rest/commit/61e894431311084e33717e0ee53b8c9819ec6b96))

# [4.0.0](https://github.com/herbsjs/herbs2rest/compare/v3.2.4...v4.0.0) (2023-03-07)


### Documentation

* update docs ([4d2e0f2](https://github.com/herbsjs/herbs2rest/commit/4d2e0f2af3ad9cbb7ad781ba8e8090e15e08288a))


### BREAKING CHANGES

* upgrade buchu to 2.0

## [3.2.4](https://github.com/herbsjs/herbs2rest/compare/v3.2.3...v3.2.4) (2023-03-06)


### Bug Fixes

* **package.json:** up herbs in peerDependencies ([8fc22f0](https://github.com/herbsjs/herbs2rest/commit/8fc22f05d76a7b92cbafe67438acb5e591e566c9))

## [3.2.3](https://github.com/herbsjs/herbs2rest/compare/v3.2.2...v3.2.3) (2023-03-06)


### Bug Fixes

* **package.json:** up herbs version ([a3403aa](https://github.com/herbsjs/herbs2rest/commit/a3403aa5ea67eb3517fd7a1f4d32f75a27bcc37d))

## [3.2.2](https://github.com/herbsjs/herbs2rest/compare/v3.2.1...v3.2.2) (2022-10-11)


### Bug Fixes

* remove from controller list if a type of usecase is not registered inside herbarium ([d58ef7f](https://github.com/herbsjs/herbs2rest/commit/d58ef7fec98f2ee3092e628e6aa890739ed558e2)), closes [#45](https://github.com/herbsjs/herbs2rest/issues/45)

## [3.2.1](https://github.com/herbsjs/herbs2rest/compare/v3.2.0...v3.2.1) (2022-09-21)


### Bug Fixes

* 🐛 fixing the findUsecases function ([c335e8b](https://github.com/herbsjs/herbs2rest/commit/c335e8bb919e7045c8e2d564b26a00477a4b7bf3))

# [3.2.0](https://github.com/herbsjs/herbs2rest/compare/v3.1.1...v3.2.0) (2022-09-07)


### Bug Fixes

* **package-lock.json:** sync with package.json ([6492c1a](https://github.com/herbsjs/herbs2rest/commit/6492c1aaaf7546f604fa8aa488898497f144fe17))


### Features

* **controller:** evolve herbs2rest for new cli project structure ([a6fdfb6](https://github.com/herbsjs/herbs2rest/commit/a6fdfb64befe9186223aaa89ff098e83e7bcb075))

## [3.1.1](https://github.com/herbsjs/herbs2rest/compare/v3.1.0...v3.1.1) (2022-08-21)


### Bug Fixes

* fix generation route without entity or entity without id ([a4de657](https://github.com/herbsjs/herbs2rest/commit/a4de6577bfcaacfb6c8c489a4eb3bb0ca8a83066))

# [3.1.0](https://github.com/herbsjs/herbs2rest/compare/v3.0.2...v3.1.0) (2022-08-16)


### Bug Fixes

* **herbs:** update herbarium version ([f31373c](https://github.com/herbsjs/herbs2rest/commit/f31373c40778b0950c746b430acb52f5eb9660b5))


### Features

* **herbs2rest:** using Herbarium to create REST endpoints ([c97fa52](https://github.com/herbsjs/herbs2rest/commit/c97fa52a1728078a8175e75b17fa91d912606183)), closes [#22](https://github.com/herbsjs/herbs2rest/issues/22)

## [3.0.2](https://github.com/herbsjs/herbs2rest/compare/v3.0.1...v3.0.2) (2022-07-11)


### Bug Fixes

* **req2request:** fix cast for Boolean and Date ([c4d0388](https://github.com/herbsjs/herbs2rest/commit/c4d0388b839bf05741b528a760ca2f5b149d184e))

## [3.0.1](https://github.com/herbsjs/herbs2rest/compare/v3.0.0...v3.0.1) (2022-06-29)


### Bug Fixes

* **route:** fix generate route based on a entity ([19b3fce](https://github.com/herbsjs/herbs2rest/commit/19b3fce876b2621f4154dd85c4eee51ccc3b568a))

# [3.0.0](https://github.com/herbsjs/herbs2rest/compare/v2.0.2...v3.0.0) (2022-06-27)


### Features

* **generateroutes.js (test):** update generate routes test ([ea44229](https://github.com/herbsjs/herbs2rest/commit/ea4422901efcdd074e4bc9cdec7ad60825052cef))
* **generateroutes.js:** generate route param name dinamically with entity's id field name ([8f35fa4](https://github.com/herbsjs/herbs2rest/commit/8f35fa4124299b5a60df6408972886ecd867c3f3))


### BREAKING CHANGES

* **generateroutes.js:** We need a route's property entity to be passed as a parameter

## [2.0.2](https://github.com/herbsjs/herbs2rest/compare/v2.0.1...v2.0.2) (2022-06-08)


### Bug Fixes

* add peerDependencies and update dependencies ([2cfcda9](https://github.com/herbsjs/herbs2rest/commit/2cfcda998766765ed284b9fc7a3b45ec566498af))

## [2.0.1](https://github.com/herbsjs/herbs2rest/compare/v2.0.0...v2.0.1) (2022-01-15)


### Bug Fixes

* update herbs dependencie ([fa75a88](https://github.com/herbsjs/herbs2rest/commit/fa75a88f1953570d7b0d0227d95bff8caa43f92b))

# [2.0.0](https://github.com/herbsjs/herbs2rest/compare/v1.0.0...v2.0.0) (2021-12-04)


### Bug Fixes

* **default controller:** lint fix ([e14beb8](https://github.com/herbsjs/herbs2rest/commit/e14beb875627f3721becab379c4cbd0357cc1822))


### Features

* **default controller:** better HTTP Status Code using Herbs Known Errors ([d87d59b](https://github.com/herbsjs/herbs2rest/commit/d87d59b331170a8f1da3e0bc1f4edfb0f35c25ea)), closes [#17](https://github.com/herbsjs/herbs2rest/issues/17)


### BREAKING CHANGES

* **default controller:** Step code using generic Err should work just fine. However, steps core that are
already returning Known Errors will change the behavior of the default controller and should expect
to see a different HTTP status returned.

# 1.0.0 (2021-06-23)


### Features

* change library to herbs organization ([f185c26](https://github.com/herbsjs/herbs2rest/commit/f185c2660e7ff7be0f1b0b88a0c280a391c32448))
