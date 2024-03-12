import express from 'express';
import { addTickect,deleteTicket,updateTicket } from '../utils/ticket.js';
import  {PrismaClient} from '@prisma/client'
const prisma = new PrismaClient()
const router = express.Router();


router.post('/', async(req,res)=>{
    try{
        const getProject= await prisma.project.findMany({
            where:{
                name: req.body.project.name
            }
        })
     console.log (getProject)
        //if the project doesnt exist then return an error
        if(!getProject) {return res.status(400).send('The Project does not Exist')};

        const projectId  = getProject[0].id 
        const{title, description} = req.body;
        await addTickect(
            title,
            description,
            projectId 
        );
        
        res.status(201).send('Ticket added successfully');
    } catch (error) {
        console.error('Error adding ticket:', error);
        res.status(500).send('Internal server error');
    }
})

router.delete('/', async (req, res) => {
    const ticketId = parseInt(req.query.id);

    try {
        await deleteTicket(ticketId);
        res.status(200).send({message: "Ticket deleted successfully"});
    } catch (error) {
        console.error('Error deleting ticket:', error);
        res.status(500).send('Internal server error');
    }
});
router.patch('/' ,async(req,res)=>{
        try {
            const ticketId= parseInt(req.query.id)
            const newData = req.body
            await  updateTicket(ticketId,newData)
            
            res.status(200).send({message: 'Updated Successfully'})
        } catch (error) {
            console.log(' error updating ticket',error)
            res.status(500).send("Server Error")
        }
})

export default router;