module.exports = function(sequelize, DataTypes) {
  const EventLocation = sequelize.define("EventLocation", {
    // place holder mysql string to hold address, can be expanded to hold lat and lon

    address: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "None"
    },
    latitude: {
      type: DataTypes.FLOAT(6),
      allowNull: false,
      defaultValue: 0.000000
    },
    longitude: {
      type: DataTypes.FLOAT(6),
      allowNull: false,
      defaultValue: 0.000000
    }
  });
  return EventLocation;
};
