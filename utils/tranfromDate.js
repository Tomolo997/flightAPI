function TranfromDateToSuitableLink(date) {
  const slice = date.slice(2, 10).split('-').join('');

  return slice;
}

module.exports = TranfromDateToSuitableLink;
