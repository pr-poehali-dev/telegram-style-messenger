import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import Icon from '@/components/ui/icon';

const Index = () => {
  const [selectedChat, setSelectedChat] = useState(0);
  const [selectedTab, setSelectedTab] = useState('chats');
  const [message, setMessage] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [showAuth, setShowAuth] = useState(false);
  const [authStep, setAuthStep] = useState('phone');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [verificationCode, setVerificationCode] = useState('');

  const chats = [
    {
      id: 1,
      name: 'Анна Иванова',
      lastMessage: 'Привет! Как дела?',
      time: '14:30',
      unread: 2,
      avatar: '/placeholder.svg',
      online: true,
      encrypted: true,
      type: 'user'
    },
    {
      id: 2,
      name: 'Рабочий чат',
      lastMessage: 'Документы готовы',
      time: '13:45',
      unread: 0,
      avatar: '/placeholder.svg',
      online: false,
      encrypted: true,
      type: 'group'
    }
  ];

  const channels = [
    {
      id: 1,
      name: 'Новости IT',
      lastMessage: 'Новый релиз React 19',
      time: '16:20',
      subscribers: '15.2K',
      avatar: '/placeholder.svg',
      verified: true,
      type: 'channel'
    },
    {
      id: 2,
      name: 'Crypto News',
      lastMessage: 'Bitcoin достиг нового максимума',
      time: '15:45',
      subscribers: '8.7K',
      avatar: '/placeholder.svg',
      verified: false,
      type: 'channel'
    }
  ];

  const bots = [
    {
      id: 1,
      name: 'Telegram Bot',
      username: '@telegram_bot',
      lastMessage: 'Код подтверждения: 12345',
      time: '16:30',
      avatar: '/placeholder.svg',
      verified: true,
      type: 'bot'
    },
    {
      id: 2,
      name: 'Weather Bot',
      username: '@weather_bot',
      lastMessage: 'Погода в Москве: +15°C',
      time: '14:20',
      avatar: '/placeholder.svg',
      verified: false,
      type: 'bot'
    }
  ];

  const messages = [
    {
      id: 1,
      text: 'Привет! Как дела?',
      sender: 'other',
      time: '14:28',
      encrypted: true,
      type: 'text'
    },
    {
      id: 2,
      text: 'Всё отлично, спасибо! А у тебя как?',
      sender: 'me',
      time: '14:29',
      encrypted: true,
      type: 'text'
    },
    {
      id: 3,
      text: '',
      sender: 'other',
      time: '14:30',
      encrypted: true,
      type: 'video_message',
      duration: '0:15'
    },
    {
      id: 4,
      text: 'Код подтверждения для входа: 54321\n\nЕсли это не вы, проигнорируйте сообщение.',
      sender: 'bot',
      time: '14:31',
      encrypted: false,
      type: 'verification'
    }
  ];

  const handleSendMessage = () => {
    if (message.trim()) {
      console.log('Sending message:', message);
      setMessage('');
    }
  };

  const handleRecordVideoMessage = () => {
    setIsRecording(!isRecording);
    if (!isRecording) {
      setTimeout(() => {
        setIsRecording(false);
        console.log('Video message recorded');
      }, 3000);
    }
  };

  const handleAuth = () => {
    if (authStep === 'phone') {
      setAuthStep('code');
    } else if (authStep === 'code') {
      setAuthStep('success');
      setTimeout(() => {
        setShowAuth(false);
        setAuthStep('phone');
      }, 2000);
    }
  };

  const getCurrentList = () => {
    switch (selectedTab) {
      case 'chats':
        return chats;
      case 'channels':
        return channels;
      case 'bots':
        return bots;
      default:
        return chats;
    }
  };

  const renderMessage = (msg: any) => {
    if (msg.type === 'video_message') {
      return (
        <div className="flex items-center space-x-2">
          <div className="w-12 h-12 bg-telegram-blue rounded-full flex items-center justify-center cursor-pointer hover:bg-telegram-blue/80 transition-colors">
            <Icon name="Play" size={20} className="text-white ml-1" />
          </div>
          <span className="text-sm text-gray-500">{msg.duration}</span>
        </div>
      );
    }
    
    if (msg.type === 'verification') {
      return (
        <div className="bg-telegram-green/10 border border-telegram-green/20 rounded-lg p-3">
          <div className="flex items-center space-x-2 mb-2">
            <Icon name="Shield" size={16} className="text-telegram-green" />
            <span className="text-sm font-medium text-telegram-green">Код подтверждения</span>
          </div>
          <p className="text-sm text-telegram-dark whitespace-pre-line">{msg.text}</p>
        </div>
      );
    }
    
    return <p className="text-sm">{msg.text}</p>;
  };

  return (
    <div className="min-h-screen bg-telegram-gray flex">
      {/* Sidebar with chats */}
      <div className="w-80 bg-white border-r border-gray-200 flex flex-col">
        {/* Header */}
        <div className="p-4 border-b border-gray-200 text-white bg-[#000000]">
          <div className="flex items-center justify-between">
            <h1 className="text-xl font-semibold">nikmessenger</h1>
            <div className="flex items-center space-x-2">
              <Button variant="ghost" size="icon" className="text-white hover:bg-white/20">
                <Icon name="Search" size={20} />
              </Button>
              <Dialog open={showAuth} onOpenChange={setShowAuth}>
                <DialogTrigger asChild>
                  <Button variant="ghost" size="icon" className="text-white hover:bg-white/20">
                    <Icon name="User" size={20} />
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-md">
                  <DialogHeader>
                    <DialogTitle>
                      {authStep === 'phone' && 'Вход в аккаунт'}
                      {authStep === 'code' && 'Код подтверждения'}
                      {authStep === 'success' && 'Успешно!'}
                    </DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4">
                    {authStep === 'phone' && (
                      <>
                        <p className="text-sm text-gray-600">
                          Введите номер телефона для входа
                        </p>
                        <Input
                          placeholder="+7 (999) 123-45-67"
                          value={phoneNumber}
                          onChange={(e) => setPhoneNumber(e.target.value)}
                        />
                      </>
                    )}
                    {authStep === 'code' && (
                      <>
                        <p className="text-sm text-gray-600">
                          Код отправлен на номер {phoneNumber}
                        </p>
                        <Input
                          placeholder="Код из SMS"
                          value={verificationCode}
                          onChange={(e) => setVerificationCode(e.target.value)}
                          maxLength={5}
                        />
                        <div className="bg-telegram-green/10 border border-telegram-green/20 rounded-lg p-3">
                          <div className="flex items-center space-x-2">
                            <Icon name="Bot" size={16} className="text-telegram-green" />
                            <span className="text-sm font-medium">Telegram Bot</span>
                          </div>
                          <p className="text-sm text-gray-600 mt-1">
                            Код подтверждения: <strong>54321</strong>
                          </p>
                        </div>
                      </>
                    )}
                    {authStep === 'success' && (
                      <div className="text-center">
                        <Icon name="CheckCircle" size={48} className="text-telegram-green mx-auto mb-2" />
                        <p className="text-sm text-gray-600">Вход выполнен успешно!</p>
                      </div>
                    )}
                    {authStep !== 'success' && (
                      <Button onClick={handleAuth} className="w-full bg-telegram-blue hover:bg-telegram-blue/90">
                        {authStep === 'phone' ? 'Получить код' : 'Войти'}
                      </Button>
                    )}
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <Tabs value={selectedTab} onValueChange={setSelectedTab} className="flex-1 flex flex-col">
          <TabsList className="grid w-full grid-cols-3 bg-telegram-gray border-b border-gray-200">
            <TabsTrigger value="chats" className="data-[state=active]:bg-white">
              <Icon name="MessageCircle" size={16} className="mr-2" />
              Чаты
            </TabsTrigger>
            <TabsTrigger value="channels" className="data-[state=active]:bg-white">
              <Icon name="Radio" size={16} className="mr-2" />
              Каналы
            </TabsTrigger>
            <TabsTrigger value="bots" className="data-[state=active]:bg-white">
              <Icon name="Bot" size={16} className="mr-2" />
              Боты
            </TabsTrigger>
          </TabsList>

          <TabsContent value="chats" className="flex-1 m-0">
            <ScrollArea className="flex-1">
              <div className="p-2">
                {getCurrentList().map((item, index) => (
                  <Card
                    key={item.id}
                    className={`mb-2 p-3 cursor-pointer transition-all duration-200 hover:bg-telegram-gray border-none animate-fade-in ${
                      selectedChat === index ? 'bg-telegram-blue/10' : ''
                    }`}
                    onClick={() => setSelectedChat(index)}
                  >
                    <div className="flex items-center space-x-3">
                      <div className="relative">
                        <Avatar className="h-12 w-12">
                          <AvatarImage src={item.avatar} />
                          <AvatarFallback className="bg-telegram-blue text-white">
                            {item.name.charAt(0)}
                          </AvatarFallback>
                        </Avatar>
                        {item.online && (
                          <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-telegram-online rounded-full border-2 border-white"></div>
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-2">
                            <h3 className="font-medium text-telegram-dark truncate">
                              {item.name}
                            </h3>
                            {item.encrypted && (
                              <Icon name="Lock" size={14} className="text-telegram-green" />
                            )}
                          </div>
                          <span className="text-sm text-gray-500">{item.time}</span>
                        </div>
                        <div className="flex items-center justify-between mt-1">
                          <p className="text-sm text-gray-600 truncate">
                            {item.lastMessage}
                          </p>
                          {item.unread > 0 && (
                            <Badge className="bg-telegram-blue text-white text-xs">
                              {item.unread}
                            </Badge>
                          )}
                        </div>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </ScrollArea>
          </TabsContent>

          <TabsContent value="channels" className="flex-1 m-0">
            <ScrollArea className="flex-1">
              <div className="p-2">
                {channels.map((channel, index) => (
                  <Card
                    key={channel.id}
                    className="mb-2 p-3 cursor-pointer transition-all duration-200 hover:bg-telegram-gray border-none animate-fade-in"
                    onClick={() => setSelectedChat(index)}
                  >
                    <div className="flex items-center space-x-3">
                      <Avatar className="h-12 w-12">
                        <AvatarImage src={channel.avatar} />
                        <AvatarFallback className="bg-telegram-blue text-white">
                          {channel.name.charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-2">
                            <h3 className="font-medium text-telegram-dark truncate">
                              {channel.name}
                            </h3>
                            {channel.verified && (
                              <Icon name="BadgeCheck" size={14} className="text-telegram-blue" />
                            )}
                          </div>
                          <span className="text-sm text-gray-500">{channel.time}</span>
                        </div>
                        <div className="flex items-center justify-between mt-1">
                          <p className="text-sm text-gray-600 truncate">
                            {channel.lastMessage}
                          </p>
                          <span className="text-xs text-gray-500">{channel.subscribers}</span>
                        </div>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </ScrollArea>
          </TabsContent>

          <TabsContent value="bots" className="flex-1 m-0">
            <ScrollArea className="flex-1">
              <div className="p-2">
                {bots.map((bot, index) => (
                  <Card
                    key={bot.id}
                    className="mb-2 p-3 cursor-pointer transition-all duration-200 hover:bg-telegram-gray border-none animate-fade-in"
                    onClick={() => setSelectedChat(index)}
                  >
                    <div className="flex items-center space-x-3">
                      <Avatar className="h-12 w-12">
                        <AvatarImage src={bot.avatar} />
                        <AvatarFallback className="bg-telegram-green text-white">
                          <Icon name="Bot" size={20} />
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-2">
                            <h3 className="font-medium text-telegram-dark truncate">
                              {bot.name}
                            </h3>
                            {bot.verified && (
                              <Icon name="BadgeCheck" size={14} className="text-telegram-blue" />
                            )}
                          </div>
                          <span className="text-sm text-gray-500">{bot.time}</span>
                        </div>
                        <div className="flex items-center justify-between mt-1">
                          <p className="text-sm text-gray-600 truncate">
                            {bot.lastMessage}
                          </p>
                          <span className="text-xs text-telegram-green">{bot.username}</span>
                        </div>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </ScrollArea>
          </TabsContent>
        </Tabs>
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
                      : msg.sender === 'bot'
                      ? 'bg-telegram-green/10 border border-telegram-green/20'
                      : 'bg-white text-telegram-dark'
                  }`}
                >
                  {renderMessage(msg)}
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
            <Button
              variant="ghost"
              size="icon"
              onClick={handleRecordVideoMessage}
              className={`${isRecording ? 'bg-red-500 text-white' : ''}`}
            >
              <Icon name={isRecording ? 'Square' : 'Circle'} size={20} />
            </Button>
            <div className="flex-1 relative">
              <Input
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder={isRecording ? 'Запись видеосообщения...' : 'Написать сообщение...'}
                className="pr-10 bg-telegram-gray border-none"
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                disabled={isRecording}
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
              disabled={isRecording}
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