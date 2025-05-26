import dotenv from 'dotenv'
import { OrganizingCommittee, Role } from '../models/index.js'
import sequelize from './config.js'

dotenv.config()

// dummy dataset for testing
async function initializeDB() {
  if (process.env.DB_FORCE_SYNC === 'true') {
    await sequelize.sync({ force: true }).then(async () => {
      await Role.bulkCreate([
        { role: "admin" }, 
        { role: "user" } 
      ])
      
      await OrganizingCommittee.bulkCreate([
        { name: "Kolkata University" },
        { name: "MAKAUT" },
        { name: "IIT Kharagpur" },
        { name: "NIT Durgapur" },
        { name: "AIIMS Delhi" },
      ])
  
      })
      .catch((error) => {
        console.error('Exception occurred inside initializeDB!\n', error)
      })

      console.log('\n:::: Database synced with force! :::: \n')
  }
  else {
    await sequelize.sync().then(async () => {
      // Seed Roles
      const roleCount = await Role.count()
      if (roleCount === 0) {
        await Role.bulkCreate([
          { role: "admin" }, 
          { role: "user" }
        ])

        console.log("Roles seeded!\n")
      }

      // Seed Organizing Committees
      const committeeCount = await OrganizingCommittee.count()
      if (committeeCount === 0) {
        await OrganizingCommittee.bulkCreate([
          { name: "Kolkata University" },
          { name: "MAKAUT" },
          { name: "IIT Kharagpur" },
          { name: "NIT Durgapur" },
          { name: "AIIMS Delhi" },
        ])

        console.log("Organizing Committees seeded!\n")
      }
  
      })
      .catch((error) => {
        console.error('Exception occurred inside initializeDB!\n', error)
      })

    console.log('\n:::: Database synced without force! :::: \n')
  }
}

export default initializeDB