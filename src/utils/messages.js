import moment from 'moment';

export const formatMessages = (data) => {
  const { email, text } = data;
  return {
    email,
    text,
    time: moment().format('DD/MM/YYY hh:mm:ss'),
  };
};
