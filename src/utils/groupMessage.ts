export const groupMessagesByDay = (
  messages: IMessage[]
): Record<string, IMessage[]> => {
  return messages.reduce(
    (grouped, message) => {
      let date;
      if (message.isSented === 'NOT') {
        date = 'Sending...';
      } else {
        date = new Date(message.sentTime).toISOString().split('T')[0];
      }

      if (!grouped[date]) {
        grouped[date] = [];
      }

      if (message.isSented === 'NOT') {
        grouped[date].unshift(message);
      } else {
        grouped[date].push(message);
      }

      return grouped;
    },
    {} as Record<string, IMessage[]>
  );
};
