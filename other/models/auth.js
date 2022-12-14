module.exports = (sequelize, type) => {
  return sequelize.define('auth', {
    id: {
      type: type.INTEGER,
      primaryKey: true,
      allowNull: false,
    },
    token: {
      type: type.STRING,
      allowNull: false,
    },
  });
};
