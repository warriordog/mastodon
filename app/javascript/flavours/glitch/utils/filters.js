export const toServerSideType = columnType => {
  if (columnType.indexOf('list:') > -1) {
    return 'lists';
  }

  switch (columnType) {
  case 'home':
    return 'home_feed';
  case 'notifications':
  case 'public':
  case 'thread':
  case 'account':
    return columnType;
  default:
    return 'public'; // community, account, hashtag
  }
};
