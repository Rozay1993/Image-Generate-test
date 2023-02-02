exports.string2date = (stringData, list) => {
  list.map((_item) => {
    stringData[_item] !== "" &&
      (stringData[_item] = new Date(stringData[_item]));
    return 0;
  });
  return stringData;
};
