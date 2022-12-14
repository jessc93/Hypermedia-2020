module.exports = (sequelize, type) => {
  return sequelize.define(
    'category',
    {
      id: {
        type: type.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      type: {
        type: type.ENUM('music', 'opera', 'theater', 'dance', 'seminar'),
        allowNull: false,
      },
    },
    {
      timestamps: false,
    },
  );
};
