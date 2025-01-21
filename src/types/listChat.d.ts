interface IChat {
  idChat: number;
  chatName: string;
}

interface IMessage {
  id?: number;
  message?: string;
  idChat?: number;
  idUser: number;
  sentTime: string;
  isSented?: 'NOT' | 'ERROR';
}
