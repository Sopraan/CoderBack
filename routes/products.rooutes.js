import { Router } from "express";   

const router = Router()

router.get('/',(req,res)=>{
res.send('Router Product')


})


router.get('/',(req,res)=>{
    res.send('Info Product')
    
    
    })


export default router