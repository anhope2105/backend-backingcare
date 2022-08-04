'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Users', [{
      email: 'admin@gmail.com',
    password: '123456',
    firstName: 'AnHope',
    lastName: 'Hope',
    address: 'HaNoi',
    gender: 1,
    roleId:'R1',
    phonenumber:'0985988794',
    position:'',
    image:'',
      createdAt: new Date(),
      updatedAt: new Date()
    }]);
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Users', null, {});
  }
};
