import { OrganizingCommittee, Role } from '../models/index.js'
import sequelize from './config.js';

async function initializeDB() {
  await sequelize.sync({ force: true }).then(async () => {
    // dummy dataset for testing
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
    ]);

    }).catch((error) => {
      console.error('Exception occurred inside initializeDB!\n', error);
    });
}

export default initializeDB