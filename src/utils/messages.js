import moment from 'moment';

export const formatMessages = (data) => {
  const { username, text } = data;
  return {
    username,
    text,
    time: moment().format('DD/MM/YYY hh:mm:ss'),
  };
};
