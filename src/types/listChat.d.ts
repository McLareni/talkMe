interface IChat {
  idChat: number;
  chatName: string;
}

interface IMessage {
  id?: number;
  message?: string;
  idChat?: number;
  idUser: number;
  name: string
  sentTime: string;
  isSented?: 'NOT' | 'ERROR';
}
