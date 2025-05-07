import { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { supabase } from '../services/supabase';
import { useWallet } from '../hooks/useWallet';
import type { Message, Profile } from '../services/supabase';
import styles from './Chat.module.css';

const Chat = () => {
  const { username } = useParams<{ username: string }>();
  const { profile: currentUserProfile } = useWallet();
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [chatPartner, setChatPartner] = useState<Profile | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (!currentUserProfile) {
      navigate('/login');
      return;
    }

    const fetchChatPartner = async () => {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('username', username)
        .single();

      if (error || !data) {
        navigate('/');
        return;
      }

      setChatPartner(data);
    };

    const fetchMessages = async () => {
      const { data, error } = await supabase
        .from('messages')
        .select('*')
        .or(`and(sender_id.eq.${currentUserProfile.id},receiver_id.eq.${chatPartner?.id}),and(sender_id.eq.${chatPartner?.id},receiver_id.eq.${currentUserProfile.id})`)
        .order('created_at', { ascending: true });

      if (!error && data) {
        setMessages(data);
      }
    };

    fetchChatPartner();
    if (chatPartner) {
      fetchMessages();
    }

    // Subscribe to new messages
    const subscription = supabase
      .channel('messages')
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'messages',
          filter: `or(and(sender_id.eq.${currentUserProfile.id},receiver_id.eq.${chatPartner?.id}),and(sender_id.eq.${chatPartner?.id},receiver_id.eq.${currentUserProfile.id}))`,
        },
        (payload) => {
          setMessages((current) => [...current, payload.new as Message]);
        }
      )
      .subscribe();

    return () => {
      subscription.unsubscribe();
    };
  }, [username, currentUserProfile, chatPartner?.id]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim() || !currentUserProfile || !chatPartner) return;

    const { error } = await supabase.from('messages').insert([
      {
        sender_id: currentUserProfile.id,
        receiver_id: chatPartner.id,
        content: newMessage.trim(),
      },
    ]);

    if (!error) {
      setNewMessage('');
    }
  };

  if (!chatPartner || !currentUserProfile) return null;

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1>Chat with {chatPartner.username}</h1>
      </div>

      <div className={styles.messages}>
        {messages.map((message) => (
          <div
            key={message.id}
            className={`${styles.message} ${
              message.sender_id === currentUserProfile.id
                ? styles.sent
                : styles.received
            }`}
          >
            <p>{message.content}</p>
            <small>{new Date(message.created_at).toLocaleTimeString()}</small>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      <form onSubmit={handleSubmit} className={styles.form}>
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Type a message..."
          className={styles.input}
        />
        <button type="submit" className={styles.button}>
          Send
        </button>
      </form>
    </div>
  );
};

export default Chat; 