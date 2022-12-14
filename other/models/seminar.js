module.exports = (sequelize, type) => {
  return sequelize.define('seminar', {
    id: {
      type: type.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    title: {
      type: type.STRING,
      allowNull: false,
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
    location: {
      type: type.TEXT,
      allowNull: false,
    },
  });
};
