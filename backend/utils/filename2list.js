exports.filename2list = (data, list) => {
  let returnData = {};
  list.map((_item) => {
    if (data[_item]) {
      returnData[_item] = data[_item][0].location;
    }
  });
  return returnData;
};
