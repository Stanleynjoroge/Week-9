import express from 'express';
import { addTickect,deleteTicket,updateTicket } from '../utils/ticket.js';
import  {PrismaClient} from '@prisma/client'
const prisma = new PrismaClient()
const router = express.Router();

router.get( '/', async (req, res) =>{
    const tickets= await prisma.ticket.findMany({})
    return res.status(200).json(tickets);
});

router.get('/:ticketId', async(req,res)=>{
    try {
        const ticketId = req.params.ticketId;
        if (ticketId) {
          const ticket = await prisma.ticket.findUnique({
            where: {
              id: ticketId
            }
          });
          
          if (!ticket) {
            return res.status(404).json({ message: 'Ticket not found' });
          }
    
          res.json(ticket);
        } else {
          // Handle if no projectId is provided
          res.status(400).json({ message: 'Please provide a ticket ID' });
        }
      } catch (error) {
        console.log(error);
        res.status(500).send("Internal server error: " + error);
      }
})
//@desc Add a ticket
router.post('/', async(req,res)=>{
    try{
    //     const getProject= await prisma.project.findMany({
    //         where:{
    //             name: req.body.project.name
    //         }
    //     })
    //  console.log (getProject)
    //     //if the project doesnt exist then return an error
    //     if(!getProject) {return res.status(400).send('The Project does not Exist')};

        // const projectId  = getProject[0].id 
        const{id,title, description,projectId} = req.body;
        await addTickect(
            id,
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
    const ticketId = req.query.id;

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
            const ticketId= req.query.id
            const newData = req.body
            await  updateTicket(ticketId,newData)
            
            res.status(200).send({message: 'Updated Successfully'})
        } catch (error) {
            console.log(' error updating ticket',error)
            res.status(500).send("Server Error")
        }
})

export default router;