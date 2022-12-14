module.exports = (sequelize, type) => {
  return sequelize.define('artistic', {
    id: {
      type: type.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    title: {
      type: type.STRING,
    },
    image: {
      type: type.STRING,
      allowNull: false,
    },
    date: {
      type: type.DATE,
      allowNull: false,
    },
    abstract: {
      type: type.TEXT,
      allowNull: false,
    },
    factsheet: {
      type: type.TEXT,
      allowNull: false,
    },
    price: {
      type: type.DOUBLE,
      allowNull: false,
    },
    categoryId: {
      type: type.INTEGER,
      allowNull: false,
    },
  });
};
