import {
  WebSocketGateway,
  SubscribeMessage,
  MessageBody,
  WebSocketServer,
} from '@nestjs/websockets';
import { ChatsService } from './chats.service';
import { CreateChatDto } from './dto/create-chat.dto';
import { UpdateChatDto } from './dto/update-chat.dto';
import { Server, Socket } from 'socket.io';

@WebSocketGateway({ cors: { origin: '*' } })
export class ChatsGateway {
  constructor(private readonly chatsService: ChatsService) {}
  @WebSocketServer() server: Server;

  @SubscribeMessage('connection')
  connection(client: Socket, body: any) {
    setTimeout(() => {
      this.server.emit('disconnection', body);
    }, 1000 * 60*5);
  }
  
  @SubscribeMessage('send-message')
  async createMsg(client: Socket, body: any) {
    const msg = await this.chatsService.createMgs(body);
    this.server.emit('msg-session/' + msg.sessionId, msg);
    const list = await this.chatsService.findAllUserBySessionId(body.sessionId);

    list
      .filter((elem) => elem.userId !== body.senderId)
      .forEach((elem) => {
        this.server.emit('msg-received/' + elem.userId, 'you have a msg');
      });
  }

  @SubscribeMessage('find-all-msgs')
  async findAll(client: Socket, body: any) {
    const msgs = await this.chatsService.findAllMgssBySessionId(body);
    this.server.emit('get-all-msgs/' + body, msgs);
  }
  

  // @SubscribeMessage('findOneChat')
  // findOne(@MessageBody() id: number) {
  //   return this.chatsService.findOne(id);
  // }

  // @SubscribeMessage('updateChat')
  // update(@MessageBody() updateChatDto: UpdateChatDto) {
  //   return this.chatsService.update(updateChatDto.id, updateChatDto);
  // }

  // @SubscribeMessage('removeChat')
  // remove(@MessageBody() id: number) {
  //   return this.chatsService.remove(id);
  // }
}
