import { Router } from 'express'

import healthCheck from './healthcheck.routes.js'
import cartRout from './cart.routes.js'
import productRout from './product.routes.js'
import userRout from './user.routes.js'
import orderRout from './orders.routes.js'
import subscribeRout from './subscribe.routes.js'

const route = Router()

route.use('/api/v1/healthCheck', healthCheck)
route.use('/api/v1/cart', cartRout)
route.use('/api/v1/products', productRout)
route.use('/api/v1/users', userRout)
route.use('/api/v1/orders', orderRout)
route.use('/api/v1/subscribe', subscribeRout)



export default route;