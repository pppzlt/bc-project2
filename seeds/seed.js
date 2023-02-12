const sequelize = require('../config/connection');
const { User, Items, Group, UserGroup } = require('../models');

const itemsData = require('./items-seed.json');
const userData = require('./user-seed.json');
const groupData = require('./group-seed.json')
const ugData = require('./ug-seed.json')

const seedDatabase = async () => {
  await sequelize.query('SET FOREIGN_KEY_CHECKS = 0')
  await sequelize.sync({ force: true });
  await sequelize.query('SET FOREIGN_KEY_CHECKS = 1')

  for (const item of userData) {
    await User.create({...item});
  };
  
  for (const item of groupData) {
    await Group.create({...item});
  };

  for (const item of ugData){
    await UserGroup.create({...item});
  }
  
  for (const item of itemsData) { 
    await Items.create({...item});
  };

  process.exit(0);
};

seedDatabase();