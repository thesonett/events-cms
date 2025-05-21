import {OrganizingCommittee, Role} from '../models/index.js'
import sequelize from './config.js';

async function initializeDB() {
  await sequelize.sync({ force: true }).then(async () => {

    await Role.bulkCreate([ { role: "admin" }, { role: "user" } ])
    
    await OrganizingCommittee.bulkCreate([
      { id: 1, name: "TechFest Committee" },
      { id: 2, name: "Cultural Committee" },
      { id: 3, name: "Sports Committee" },
      { id: 4, name: "Literary Club" },
      { id: 5, name: "Photography Club" },
    ]);

    })
    .catch((error) => {
      console.error(error);
    });
}

export default initializeDB