module.exports = (sequelize, type) => {
  return sequelize.define('performer', {
    id: {
      type: type.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: type.STRING,
      allowNull: false,
    },
    image: {
      type: type.STRING,
    },
    affiliation: {
      type: type.TEXT,
      allowNull: true,
    },
    achievement: {
      type: type.TEXT,
      allowNull: true,
    },
    details: {
      type: type.TEXT,
      allowNull: true,
    },
    isGroup: {
      type: type.BOOLEAN,
      allowNull: false,
    },
    members: {
      type: type.TEXT,
      allowNull: true,
    },
  });
};
