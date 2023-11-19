import { Router } from "express";

import * as controller from "../controllers/log.controller.js"

const route = Router()

route.get('/',controller.getAllLogs)

route.post('/',controller.addLog)

export default route