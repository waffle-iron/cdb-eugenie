"use strict";
// app/models/dancer.js
// grab the mongoose module
var mongoose = require("mongoose");
var heroSchema = new mongoose.Schema({
    name: String
});
var Hero = mongoose.model("Hero", heroSchema);
module.exports = Hero;
//# sourceMappingURL=dancer.js.map