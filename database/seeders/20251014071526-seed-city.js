'use strict';

export const up = async (queryInterface, Sequelize) => {
  await queryInterface.bulkInsert('Cities', [
    { id: 1, name: 'Hyderabad', stateId: 1, createdAt: new Date(), updatedAt: new Date() },
    { id: 2, name: 'Vijayawada', stateId: 1, createdAt: new Date(), updatedAt: new Date() },
    { id: 3, name: 'Itanagar', stateId: 2, createdAt: new Date(), updatedAt: new Date() },
    { id: 4, name: 'Naharlagun', stateId: 2, createdAt: new Date(), updatedAt: new Date() },
    { id: 5, name: 'Guwahati', stateId: 3, createdAt: new Date(), updatedAt: new Date() },
    { id: 6, name: 'Silchar', stateId: 3, createdAt: new Date(), updatedAt: new Date() },
    { id: 7, name: 'Patna', stateId: 4, createdAt: new Date(), updatedAt: new Date() },
    { id: 8, name: 'Gaya', stateId: 4, createdAt: new Date(), updatedAt: new Date() },
    { id: 9, name: 'Bhopal', stateId: 5, createdAt: new Date(), updatedAt: new Date() },
    { id: 10, name: 'Indore', stateId: 5, createdAt: new Date(), updatedAt: new Date() },
    { id: 11, name: 'Mumbai', stateId: 6, createdAt: new Date(), updatedAt: new Date() },
    { id: 12, name: 'Pune', stateId: 6, createdAt: new Date(), updatedAt: new Date() },
    { id: 13, name: 'Chennai', stateId: 7, createdAt: new Date(), updatedAt: new Date() },
    { id: 14, name: 'Coimbatore', stateId: 7, createdAt: new Date(), updatedAt: new Date() },
    { id: 15, name: 'Kolkata', stateId: 8, createdAt: new Date(), updatedAt: new Date() },
    { id: 16, name: 'Siliguri', stateId: 8, createdAt: new Date(), updatedAt: new Date() },
    { id: 17, name: 'Jaipur', stateId: 9, createdAt: new Date(), updatedAt: new Date() },
    { id: 18, name: 'Udaipur', stateId: 9, createdAt: new Date(), updatedAt: new Date() },
    { id: 19, name: 'Bengaluru', stateId: 10, createdAt: new Date(), updatedAt: new Date() },
    { id: 20, name: 'Mysuru', stateId: 10, createdAt: new Date(), updatedAt: new Date() },
  ]);
};

export const down = async (queryInterface, Sequelize) => {
  await queryInterface.bulkDelete('Cities', null, {});
};
