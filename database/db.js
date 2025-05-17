import {Category, Events, Images, OrganizingCommittee, Posts, Role, Users} from '../models/index.js'
import sequelize from './config.js';

// initializing relationships
Category.hasMany(Events, { foreignKey: "category_id" });
Posts.belongsTo(Events, { foreignKey: "event_id" });

Events.hasMany(Posts, { foreignKey: "event_id" });
Events.belongsTo(OrganizingCommittee, { foreignKey: "organizing_committee_id", });
Events.belongsTo(Category, { foreignKey: "category_id" });
Events.belongsTo(Role, { foreignKey: "role_id" });

Users.belongsTo(OrganizingCommittee, { foreignKey: "organizing_committee_id" });
Users.hasMany(Role, { foreignKey: "users_id" });
Users.hasMany(Role, { foreignKey: "users_organizing_committee_id" });

OrganizingCommittee.hasMany(Users, { foreignKey: "organizing_committee_id" });
OrganizingCommittee.hasMany(Events, { foreignKey: "organizing_committee_id" });

Role.hasMany(Events, { foreignKey: "role_id" });
Role.belongsTo(Users, { foreignKey: "users_id" });
Role.belongsTo(Users, { foreignKey: "users_organizing_committee_id" });

// initialize database tables
async function initializeDB() {
  await sequelize.sync({ force: true }).then(async () => {

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