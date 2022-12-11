import { Router } from "express";   

const router = Router()

router.get('/',(req,res)=>{
res.send('Router Cart')


})


router.get('/',(req,res)=>{
    res.send('Info Cart')
    
    
    })


export default router