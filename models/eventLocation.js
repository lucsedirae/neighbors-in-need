module.exports = function(sequelize, DataTypes) {
  const EventLocation = sequelize.define("eventLocation", {
    // place holder mysql string to hold address, can be expanded to hold lat and lon
    location: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "None"
    },
    address: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "None"
    },
    latitude: {
      type: DataTypes.DECIMAL(8, 6),
      allowNull: false,
      defaultValue: 0.000000
    },
    longitude: {
      type: DataTypes.DECIMAL(8, 6),
      allowNull: false,
      defaultValue: 0.000000
    }
  });
  return EventLocation;
};
