import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';

const Index = () => {
  const [selectedChat, setSelectedChat] = useState(0);
  const [message, setMessage] = useState('');

  const chats = [
    {
      id: 1,
      name: 'Анна Иванова',
      lastMessage: 'Привет! Как дела?',
      time: '14:30',
      unread: 2,
      avatar: '/placeholder.svg',
      online: true,
      encrypted: true
    },
    {
      id: 2,
      name: 'Рабочий чат',
      lastMessage: 'Документы готовы',
      time: '13:45',
      unread: 0,
      avatar: '/placeholder.svg',
      online: false,
      encrypted: true
    },
    {
      id: 3,
      name: 'Мама',
      lastMessage: 'Не забудь покушать',
      time: '12:20',
      unread: 1,
      avatar: '/placeholder.svg',
      online: true,
      encrypted: false
    },
    {
      id: 4,
      name: 'Друзья',
      lastMessage: 'Встречаемся в 19:00',
      time: '11:15',
      unread: 0,
      avatar: '/placeholder.svg',
      online: false,
      encrypted: true
    }
  ];

  const messages = [
    {
      id: 1,
      text: 'Привет! Как дела?',
      sender: 'other',
      time: '14:28',
      encrypted: true
    },
    {
      id: 2,
      text: 'Всё отлично, спасибо! А у тебя как?',
      sender: 'me',
      time: '14:29',
      encrypted: true
    },
    {
      id: 3,
      text: 'Тоже хорошо! Планы на выходные есть?',
      sender: 'other',
      time: '14:30',
      encrypted: true
    }
  ];

  const handleSendMessage = () => {
    if (message.trim()) {
      console.log('Sending message:', message);
      setMessage('');
    }
  };

  return (
    <div className="min-h-screen bg-telegram-gray flex">
      {/* Sidebar with chats */}
      <div className="w-80 bg-white border-r border-gray-200 flex flex-col">
        {/* Header */}
        <div className="p-4 border-b border-gray-200 bg-telegram-blue text-white">
          <div className="flex items-center justify-between">
            <h1 className="text-xl font-semibold">Telegram</h1>
            <div className="flex items-center space-x-2">
              <Button variant="ghost" size="icon" className="text-white hover:bg-white/20">
                <Icon name="Search" size={20} />
              </Button>
              <Button variant="ghost" size="icon" className="text-white hover:bg-white/20">
                <Icon name="Settings" size={20} />
              </Button>
            </div>
          </div>
        </div>

        {/* Search bar */}
        <div className="p-4 border-b border-gray-200">
          <div className="relative">
            <Icon name="Search" size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <Input
              placeholder="Поиск"
              className="pl-10 bg-telegram-gray border-none"
            />
          </div>
        </div>

        {/* Chat list */}
        <ScrollArea className="flex-1">
          <div className="p-2">
            {chats.map((chat, index) => (
              <Card
                key={chat.id}
                className={`mb-2 p-3 cursor-pointer transition-all duration-200 hover:bg-telegram-gray border-none animate-fade-in ${
                  selectedChat === index ? 'bg-telegram-blue/10' : ''
                }`}
                onClick={() => setSelectedChat(index)}
              >
                <div className="flex items-center space-x-3">
                  <div className="relative">
                    <Avatar className="h-12 w-12">
                      <AvatarImage src={chat.avatar} />
                      <AvatarFallback className="bg-telegram-blue text-white">
                        {chat.name.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    {chat.online && (
                      <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-telegram-online rounded-full border-2 border-white"></div>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <h3 className="font-medium text-telegram-dark truncate">
                          {chat.name}
                        </h3>
                        {chat.encrypted && (
                          <Icon name="Lock" size={14} className="text-telegram-green" />
                        )}
                      </div>
                      <span className="text-sm text-gray-500">{chat.time}</span>
                    </div>
                    <div className="flex items-center justify-between mt-1">
                      <p className="text-sm text-gray-600 truncate">
                        {chat.lastMessage}
                      </p>
                      {chat.unread > 0 && (
                        <Badge className="bg-telegram-blue text-white text-xs">
                          {chat.unread}
                        </Badge>
                      )}
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </ScrollArea>
      </div>

      {/* Chat area */}
      <div className="flex-1 flex flex-col">
        {/* Chat header */}
        <div className="p-4 border-b border-gray-200 bg-white">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Avatar className="h-10 w-10">
                <AvatarImage src={chats[selectedChat]?.avatar} />
                <AvatarFallback className="bg-telegram-blue text-white">
                  {chats[selectedChat]?.name.charAt(0)}
                </AvatarFallback>
              </Avatar>
              <div>
                <div className="flex items-center space-x-2">
                  <h2 className="font-semibold text-telegram-dark">
                    {chats[selectedChat]?.name}
                  </h2>
                  {chats[selectedChat]?.encrypted && (
                    <div className="flex items-center space-x-1 text-telegram-green">
                      <Icon name="Shield" size={16} />
                      <span className="text-sm">Зашифровано</span>
                    </div>
                  )}
                </div>
                <p className="text-sm text-gray-500">
                  {chats[selectedChat]?.online ? 'в сети' : 'был(а) недавно'}
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Button variant="ghost" size="icon">
                <Icon name="Phone" size={20} />
              </Button>
              <Button variant="ghost" size="icon">
                <Icon name="Video" size={20} />
              </Button>
              <Button variant="ghost" size="icon">
                <Icon name="MoreVertical" size={20} />
              </Button>
            </div>
          </div>
        </div>

        {/* Messages */}
        <ScrollArea className="flex-1 bg-telegram-gray">
          <div className="p-4 space-y-4">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex animate-scale-in ${
                  msg.sender === 'me' ? 'justify-end' : 'justify-start'
                }`}
              >
                <Card
                  className={`max-w-xs lg:max-w-md p-3 border-none ${
                    msg.sender === 'me'
                      ? 'bg-telegram-blue text-white'
                      : 'bg-white text-telegram-dark'
                  }`}
                >
                  <p className="text-sm">{msg.text}</p>
                  <div className="flex items-center justify-between mt-2">
                    <span className={`text-xs ${
                      msg.sender === 'me' ? 'text-white/70' : 'text-gray-500'
                    }`}>
                      {msg.time}
                    </span>
                    {msg.encrypted && (
                      <Icon 
                        name="Lock" 
                        size={12} 
                        className={msg.sender === 'me' ? 'text-white/70' : 'text-telegram-green'} 
                      />
                    )}
                  </div>
                </Card>
              </div>
            ))}
          </div>
        </ScrollArea>

        {/* Message input */}
        <div className="p-4 border-t border-gray-200 bg-white">
          <div className="flex items-center space-x-2">
            <Button variant="ghost" size="icon">
              <Icon name="Paperclip" size={20} />
            </Button>
            <div className="flex-1 relative">
              <Input
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Написать сообщение..."
                className="pr-10 bg-telegram-gray border-none"
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
              />
              <Button
                variant="ghost"
                size="icon"
                className="absolute right-1 top-1/2 transform -translate-y-1/2"
              >
                <Icon name="Smile" size={16} />
              </Button>
            </div>
            <Button
              onClick={handleSendMessage}
              className="bg-telegram-blue hover:bg-telegram-blue/90 text-white"
              size="icon"
            >
              <Icon name="Send" size={16} />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;