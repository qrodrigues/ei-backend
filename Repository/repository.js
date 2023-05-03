const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

async function main() {
}

async function getTickets() {
    const tickets = await prisma.ticket.findMany()
    return tickets
}

async function createTicket(body) {
  const ticket = await prisma.ticket.create({
    data: {
      ...body
    },
  })
  return ticket
}

async function updateTicket(id, body) {
  await prisma.ticket.update({
    where: {
      id
    },
    data: {
      ...body
    }
  })
}

async function deleteTicket(id) {
  const ticket = await prisma.ticket.findUnique({
    where: {
      id
    },
  })
  if (ticket && ticket.statut !== 'TERMINE') {
    await prisma.ticket.delete({
      where: {
        id
      },
    })
  } else {
    throw new Error('Ticket not found or ticket statut is TERMINE')
  }
}

module.exports = {
    getTickets,
    createTicket,
    updateTicket,
    deleteTicket
  }
  
  main()
    .then(async () => {
      await prisma.$disconnect()
    })
    .catch(async (e) => {
      console.error(e)
      await prisma.$disconnect()
      process.exit(1)
    })