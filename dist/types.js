export var CardValue;
(function (CardValue) {
    CardValue[CardValue["A"] = 14] = "A";
    CardValue[CardValue["K"] = 13] = "K";
    CardValue[CardValue["Q"] = 12] = "Q";
    CardValue[CardValue["J"] = 11] = "J";
    CardValue[CardValue["Ten"] = 10] = "Ten";
    CardValue[CardValue["Nine"] = 9] = "Nine";
    CardValue[CardValue["Eight"] = 8] = "Eight";
    CardValue[CardValue["Seven"] = 7] = "Seven";
    CardValue[CardValue["Six"] = 6] = "Six";
    CardValue[CardValue["Five"] = 5] = "Five";
    CardValue[CardValue["Four"] = 4] = "Four";
    CardValue[CardValue["Three"] = 3] = "Three";
    CardValue[CardValue["Two"] = 2] = "Two";
})(CardValue || (CardValue = {}));
export var Role;
(function (Role) {
    Role["DUMMY"] = "DUMMY";
    Role["DECLARER"] = "DECLARER";
    Role["DEFENCE"] = "DEFENCE";
})(Role || (Role = {}));
export var Position;
(function (Position) {
    Position[Position["SOUTH"] = 0] = "SOUTH";
    Position[Position["WEST"] = 1] = "WEST";
    Position[Position["NORTH"] = 2] = "NORTH";
    Position[Position["EAST"] = 3] = "EAST";
})(Position || (Position = {}));
export var bidPoints;
(function (bidPoints) {
    bidPoints[bidPoints["J"] = 1] = "J";
    bidPoints[bidPoints["Q"] = 2] = "Q";
    bidPoints[bidPoints["K"] = 3] = "K";
    bidPoints[bidPoints["A"] = 4] = "A";
})(bidPoints || (bidPoints = {}));
