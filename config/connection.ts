import { Sequelize } from "sequelize";


const sequelize = new Sequelize('nada', 'root', 'root', {
    host: 'localhost',
    dialect: 'mysql'
  });

export default sequelize;